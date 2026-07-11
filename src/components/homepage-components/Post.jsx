import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiCalendarBlankOutline,
  mdiChevronDown,
  mdiCommentOutline,
  mdiDotsHorizontal,
  mdiImageOutline,
  mdiMapMarkerOutline,
  mdiReplyOutline,
  mdiSend,
  mdiShareVariantOutline,
  mdiThumbUp,
  mdiThumbUpOutline,
} from "@mdi/js";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import timeCalculator from "../../js/timeCalculator";
import compareMongo from "../../js/compareMongoId";
import { updateAllPosts } from "../../redux/allPostsSlice";
import { updatePost } from "../../redux/postSlice";
import { updateCommentModal } from "../../redux/commentModalSlice";
import { updateComment } from "../../redux/editCommentSlice";
import { updateEditPost } from "../../redux/editPostSlice";
import { apiRequest } from "../../lib/apiClient";

function ThreadedComment({
  comment,
  user,
  depth = 0,
  expandedReplies,
  setExpandedReplies,
  openReply,
  setOpenReply,
  replyText,
  setReplyText,
  submitting,
  submitComment,
  openMenu,
  setOpenMenu,
  onEdit,
  onDelete,
}) {
  const replies = comment.comments || [];
  const expanded = expandedReplies[comment._id] !== false;
  const author = comment.author || { _id: "", name: "OdinBook member", image_url: "" };

  return (
    <div className={`thread-node depth-${Math.min(depth, 3)}`}>
      <article className="comment-container">
        <Link to={`/profile/${author._id}`} className="comment-avatar-link">
          <img src={author.image_url} alt="" className="comment-picture" />
        </Link>
        <div className="comment-main">
          <div className="name-comment">
            <div className="comment-meta">
              <Link to={`/profile/${author._id}`} className="comment-name">{author.name}</Link>
              <span>{timeCalculator(comment.date)}</span>
              {comment.edited && <span>edited</span>}
            </div>
            <div className="user-comment">{comment.text}</div>
          </div>
          <div className="comment-actions">
            <button type="button" onClick={() => setOpenReply(openReply === comment._id ? "" : comment._id)}>
              <Icon path={mdiReplyOutline} size={0.62}/> Reply
            </button>
            {replies.length > 0 && (
              <button type="button" onClick={() => setExpandedReplies((current) => ({ ...current, [comment._id]: !expanded }))}>
                <Icon path={mdiChevronDown} size={0.6} className={expanded ? "chevron-open" : ""}/>
                {expanded ? "Hide" : "Show"} {replies.length} {replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>
        </div>
        {author._id === user._id && (
          <div className="comment-menu-wrap">
            <button type="button" className="icon-button" onClick={() => setOpenMenu(openMenu === comment._id ? "" : comment._id)} aria-label="Comment options">
              <Icon path={mdiDotsHorizontal} size={0.8}/>
            </button>
            {openMenu === comment._id && (
              <div className="edit-dropdown">
                <button type="button" onClick={() => onEdit(comment._id)}>Edit</button>
                <button type="button" onClick={() => onDelete(comment._id)}>Delete thread</button>
              </div>
            )}
          </div>
        )}
      </article>

      {openReply === comment._id && (
        <form className="reply-composer" onSubmit={(event) => {
          event.preventDefault();
          submitComment(comment.post, replyText[comment._id], comment._id);
        }}>
          <img src={user.image_url} alt="" className="comment-picture" />
          <input
            autoFocus
            value={replyText[comment._id] || ""}
            onChange={(event) => setReplyText((current) => ({ ...current, [comment._id]: event.target.value }))}
            placeholder={`Reply to ${author.name}`}
            maxLength={2000}
          />
          <button type="submit" disabled={!replyText[comment._id]?.trim() || submitting === comment._id} aria-label="Send reply">
            <Icon path={mdiSend} size={0.72}/>
          </button>
        </form>
      )}

      {expanded && replies.length > 0 && (
        <div className="thread-children">
          {replies.map((reply) => (
            <ThreadedComment
              key={reply._id}
              comment={reply}
              user={user}
              depth={depth + 1}
              expandedReplies={expandedReplies}
              setExpandedReplies={setExpandedReplies}
              openReply={openReply}
              setOpenReply={setOpenReply}
              replyText={replyText}
              setReplyText={setReplyText}
              submitting={submitting}
              submitComment={submitComment}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const Post = ({ setLoading, loading, newInfo, setNotification }) => {
  const user = useSelector((state) => state.user);
  const commentModal = useSelector((state) => state.commentModal);
  const host = useSelector((state) => state.host);
  const allPosts = useSelector((state) => state.allPosts);
  const dispatch = useDispatch();
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const [replyText, setReplyText] = useState({});
  const [submitting, setSubmitting] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [postDropdown, setPostDropdown] = useState("");
  const [commentDropdown, setCommentDropdown] = useState("");
  const [openReply, setOpenReply] = useState("");
  const [expandedReplies, setExpandedReplies] = useState({});

  useEffect(() => {
    let active = true;
    apiRequest(`${host}/posts/${user._id}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Feed failed: ${response.status}`)))
      .then((data) => {
        if (!active) return;
        setLikedPosts(data.filter((post) => compareMongo(user._id, post.likes)).map((post) => post._id));
        dispatch(updateAllPosts(data.map((post) => ({ ...post, likeCount: post.likes.length }))));
      })
      .catch((error) => console.error(error))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [host, user._id, reloadKey, commentModal, newInfo, dispatch, setLoading]);

  const notify = (content) => {
    setNotification({ status: true, content });
    window.setTimeout(() => setNotification({ status: false, content: "" }), 2600);
  };

  const updateLike = async (postId, liked) => {
    const response = await apiRequest(`${host}/posts/like/${liked ? "add" : "remove"}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, postId }),
    });
    if (!response.ok) return;
    setLikedPosts((current) => liked ? [...current, postId] : current.filter((id) => id !== postId));
    dispatch(updateAllPosts(allPosts.map((post) => post._id === postId
      ? { ...post, likeCount: post.likeCount + (liked ? 1 : -1) }
      : post)));
  };

  const submitComment = async (postId, text, parentCommentId = null) => {
    if (!text?.trim()) return;
    const submitKey = parentCommentId || postId;
    setSubmitting(submitKey);
    const response = await apiRequest(`${host}/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, text: text.trim(), userId: user._id, parentCommentId }),
    });
    setSubmitting("");
    if (!response.ok) return notify("We could not add that comment.");
    if (parentCommentId) {
      setReplyText((current) => ({ ...current, [parentCommentId]: "" }));
      setOpenReply("");
    } else {
      setCommentText((current) => ({ ...current, [postId]: "" }));
    }
    setReloadKey((value) => value + 1);
    notify(parentCommentId ? "Reply added to the thread" : "Comment added");
  };

  const handleEditComment = (commentId) => {
    dispatch(updateCommentModal("edit-comment"));
    dispatch(updateComment(commentId));
  };
  const handleDeleteComment = (commentId) => {
    dispatch(updateCommentModal("delete-comment"));
    dispatch(updateComment(commentId));
  };
  const handleEditPost = (postId) => {
    dispatch(updateCommentModal("edit-post"));
    dispatch(updateEditPost(postId));
  };
  const handleDeletePost = (postId) => {
    dispatch(updateCommentModal("delete-post"));
    dispatch(updateEditPost(postId));
  };

  const firstName = user.name.split(" ")[0];
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(new Date());

  return (
    <main className="post-third">
      <div className="posts">
        <header className="feed-welcome">
          <div><span className="eyebrow">{today}</span><h1>Good to see you, {firstName}.</h1><p>Here&apos;s what your people are talking about.</p></div>
          <div className="daily-pulse"><span>Circle pulse</span><strong>08</strong><small>updates today</small></div>
        </header>

        <section className="add-post">
          <img src={user.image_url} alt="" className="smallest-profile-pic"/>
          <button className="post-button" onClick={() => dispatch(updatePost(true))}>Share something with your circle…</button>
          <div className="compose-actions">
            <button type="button" onClick={() => dispatch(updatePost(true))}><Icon path={mdiImageOutline} size={0.75}/>Photo</button>
            <button type="button" onClick={() => dispatch(updatePost(true))}><Icon path={mdiMapMarkerOutline} size={0.75}/>Location</button>
            <button type="button" onClick={() => dispatch(updatePost(true))}><Icon path={mdiCalendarBlankOutline} size={0.75}/>Event</button>
          </div>
          <button type="button" className="compose-submit" onClick={() => dispatch(updatePost(true))}><Icon path={mdiSend} size={0.7}/>Post</button>
        </section>

        {!loading ? allPosts.map((post) => (
          <article className="post" key={post._id}>
            <div className="post-header">
              <div className="post-header-right">
                <Link to={`/profile/${post.author._id}`}><img src={post.author.image_url} alt="" className="smallest-profile-pic"/></Link>
                <div className="name-time">
                  <Link to={`/profile/${post.author._id}`} className="name">{post.author.name}</Link>
                  <span>{post.author.job || "OdinBook member"} · {timeCalculator(post.date)}{post.edited ? " · edited" : ""}</span>
                </div>
              </div>
              {post.author._id === user._id && (
                <div className="post-menu-wrap">
                  <button type="button" className="icon-button" onClick={() => setPostDropdown(postDropdown === post._id ? "" : post._id)} aria-label="Post options"><Icon path={mdiDotsHorizontal} size={0.9}/></button>
                  {postDropdown === post._id && <div className="edit-dropdown"><button type="button" onClick={() => handleEditPost(post._id)}>Edit post</button><button type="button" onClick={() => handleDeletePost(post._id)}>Delete post</button></div>}
                </div>
              )}
            </div>
            <div className="post-content">{post.text}</div>

            {post.author.name === "Maya Chen" && (
              <div className="post-feature-art"><span>Design systems</span><strong>Ideas become clearer<br/>when we make them together.</strong><i/><b/></div>
            )}

            <div className="post-stats"><span>{post.likeCount} appreciations</span><span>{post.comment_count ?? 0} comments</span></div>
            <div className="likes-comments">
              <button type="button" className={likedPosts.includes(post._id) ? "likes active" : "likes"} onClick={() => updateLike(post._id, !likedPosts.includes(post._id))}>
                <Icon path={likedPosts.includes(post._id) ? mdiThumbUp : mdiThumbUpOutline} size={0.8}/>Appreciate
              </button>
              <button type="button" className="comments" onClick={() => document.getElementById(`comment-${post._id}`)?.focus()}><Icon path={mdiCommentOutline} size={0.8}/>Comment</button>
              <button type="button" className="share-action"><Icon path={mdiShareVariantOutline} size={0.8}/>Share</button>
            </div>

            <form className="post-comments" onSubmit={(event) => { event.preventDefault(); submitComment(post._id, commentText[post._id]); }}>
              <img src={user.image_url} alt="" className="comment-picture"/>
              <input id={`comment-${post._id}`} className="comment-entry" placeholder="Join the conversation…" maxLength={2000} value={commentText[post._id] || ""} onChange={(event) => setCommentText((current) => ({ ...current, [post._id]: event.target.value }))}/>
              <button type="submit" className="comment-send" disabled={!commentText[post._id]?.trim() || submitting === post._id} aria-label="Send comment"><Icon path={mdiSend} size={0.75}/></button>
            </form>

            {post.comments.length > 0 && (
              <div className="all-comments">
                {post.comments.map((comment) => (
                  <ThreadedComment
                    key={comment._id}
                    comment={comment}
                    user={user}
                    expandedReplies={expandedReplies}
                    setExpandedReplies={setExpandedReplies}
                    openReply={openReply}
                    setOpenReply={setOpenReply}
                    replyText={replyText}
                    setReplyText={setReplyText}
                    submitting={submitting}
                    submitComment={submitComment}
                    openMenu={commentDropdown}
                    setOpenMenu={setCommentDropdown}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                  />
                ))}
              </div>
            )}
          </article>
        )) : Array.from({ length: 3 }).map((_, index) => (
          <div className="post post-skeleton" key={index}><Skeleton height={44}/><Skeleton height={90}/><Skeleton height={38}/></div>
        ))}
      </div>
    </main>
  );
};

export default Post;
