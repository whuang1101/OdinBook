import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/postSlice";
import { useEffect, useRef, useState } from "react";
import { updateAllPosts } from "../../redux/allPostsSlice";
import Icon from '@mdi/react';
import { mdiCommentOutline, mdiDotsHorizontal, mdiLoading, mdiSend, mdiThumbUp, mdiThumbUpOutline } from '@mdi/js';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import timeCalculator from "../../js/timeCalculator"; "../../js/timeCalculator"
import compareMongo from "../../js/compareMongoId";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { updateCommentModal } from "../../redux/commentModalSlice";
import { updateComment } from "../../redux/editCommentSlice";
import { updateEditPost } from "../../redux/editPostSlice";
const Post = ({setLoading,loading, newInfo, setNotification}) => {
    const user = useSelector(state => state.user)
    const commentModal = useSelector(state => state.commentModal);
    const dispatch = useDispatch()
    const host = useSelector(state => state.host);
    const allPosts = useSelector(state => state.allPosts)
    const [likedPosts, setLikedPosts] = useState([]);
    const [commentText, setCommentText] = useState({});
    const [commentLoading, setCommentLoading] = useState({}); 
    const [actualLoading,setActualLoading] = useState(false);
    const [editDropDown,setEditDropDown] =  useState(false);
    const [postDropdown, setPostDropDown] = useState({});
    useEffect(()=> {
        fetch(`${host}/posts/${user._id}`).then( response =>
           { if(response.ok){
                return response.json()
            }
            else{
                console.log(response.status)
            }
        }
        ).then(data =>  {
            const updatedPosts = data.map(post => ({
                ...post,
                likes: post.likes.length // Initialize likes property with the current like count
            }));
            const userIDs = data.map(post => post.author._id);
            for(let i =0; i <userIDs.length; i ++) {
                setPostDropDown((previous) => ({
                    ...previous,
                    [userIDs[i]]: false
                }))
            }
            dispatch(updateAllPosts(updatedPosts))
            const likedPostIds = data.filter(post => compareMongo(user._id, post.likes))
            .map(post => post._id);
            //
            setLikedPosts(likedPostIds);
                setTimeout(() => {
                setLoading(false)
            }, 1000);
            const updatedCommentLoading = { ...commentLoading };
            for (const postId in updatedCommentLoading) {
            updatedCommentLoading[postId] = false;
            }
            // Set the commentLoading state to the updated object with all values set to false.
            setCommentLoading(updatedCommentLoading);
        })
    },[actualLoading,commentModal, newInfo])
    const handlePostDropDown = (postId) => {
        setPostDropDown((previous) => ({
            ...previous,
            [postId]: !previous[postId]
          }));
    }
    const handleAddLike = (postId) => {
        const body = {
            userId: user._id,
            postId: postId
        }
        fetch(`${host}/posts/like/add`,{
            method:"PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => 
            {if (!response.ok){
                console.log("bad")
            }}
        )
        setLikedPosts(prevLikedPosts => [...prevLikedPosts, postId]);
        const updatedPosts = allPosts.map(post => {
            if (post._id === postId) {
                return {
                    ...post,
                    likes: post.likes + 1 
                };
            }
            return post;
        });
        dispatch(updateAllPosts(updatedPosts))

    }
    const handleRemoveLike = (postId) => {
        const body = {
            userId: user._id,
            postId: postId
        }
        fetch(`${host}/posts/like/remove`,{
            method:"PUT",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => 
            {if (!response.ok){
                console.log("bad")
            }}
        )
        setLikedPosts(likedPosts.filter(id => id !== postId));
        const updatedPosts = allPosts.map(post => {
            if (post._id === postId) {
                return {
                    ...post,
                    likes: post.likes - 1
                };
            }
            return post;
        });
        dispatch(updateAllPosts(updatedPosts))
    }
    const handleCommentChange = (event, postId) => {
        setCommentText((prevCommentText) => ({
        ...prevCommentText,
        [postId]: event.target.value,
      }));
      if(commentLoading[postId] === undefined)
      { 
        setCommentLoading((prevCommentLoading) => ({
        ...prevCommentLoading,
        [postId]: false,
      }));
    }
    }
    const postComment = (event,postId,userId) => {
        setCommentLoading((prevCommentLoading) => ({
            ...prevCommentLoading,
            [postId]: true,
          }));
        const body  = {
            postId:postId,
            text: commentText[postId],
            userId:userId,
        }
        fetch(`${host}/comments/add`, {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)
        }).then(
            response => {
                if(response.ok){
                      setCommentText((prevCommentText) => ({
                        ...prevCommentText,
                        [postId]: "",
                      }));
                      setActualLoading(!actualLoading);
                        const current = {
                            status: true,
                            content: "Comment Created Successfully"
                        };
                        setNotification(current);
                            setTimeout(() => {
                            const newStatus = {
                                status: false,
                                content: ""
                            };
                            setNotification(newStatus);
                        }, 3000);
                }
                else{
                    console.log(response.status);
                }
            }
        )
    }
    const handleEditComment = (commentId) => {
        dispatch(updateCommentModal("edit-comment"))
        dispatch(updateComment(commentId))
    }
    const handleDeleteComment = (commentId) => {
        dispatch(updateCommentModal("delete-comment"))
        dispatch(updateComment(commentId))
    }
    const handleEditPost = (postId) => {
        dispatch(updateCommentModal("edit-post"))
        dispatch(updateEditPost(postId))
    }
    const handleDeletePost = (postId) => {
        dispatch(updateCommentModal("delete-post"))
        dispatch(updateEditPost(postId))
    }
    const firstName = user.name.split(" ")[0];
    return (
        <>
            <div className="post-third">
                <div className="posts">
                    <div className="add-post">
                        <div className="image-container">
                            <img src={user.image_url} alt={`${user.name} profile pic`} className="smallest-profile-pic"/>
                        </div>
                        <button className="post-button" onClick={() => dispatch(updatePost(true))}>What's on your mind {firstName}?</button>
                        {/* Post modal/ background is on PostModal.jsx */}
                    </div>
                    {
                        !loading ? allPosts.map((post) => (
                            <div className="post" key={post._id}>
                                <div className="post-header">
                                    <div className="post-header-right">
                                    <Link to= {`/profile/${post.author._id}`}>
                                        <img src={post.author.image_url} alt={post.author.name} className="smallest-profile-pic" />
                                    </Link>
                                    <div className="name-time">
                                        <Link to= {`/profile/${post.author._id}`} className="name">
                                            {post.author.name}
                                        </Link>
                                        <div className="long-ago" tabIndex={0}>
                                            {timeCalculator(post.date)}
                                        </div>
                                    </div>
                                    </div>
                                    {post.author._id === user._id &&
                                        <>
                                            <div className="edit-post-icon" onClick={() => handlePostDropDown(post._id)} tabIndex={0}   
                                                    onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                    handlePostDropDown(post._id);
                                                    }
                                                }}>
                                                <Icon path={mdiDotsHorizontal} size={1} color={"rgb(57,115,234)"}/>
                                                {postDropdown[post._id] &&
                                                 <div className="edit-dropdown">
                                                    <div className="edit-comment" onClick={() => handleEditPost(post._id)} tabIndex={0}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                        handleEditPost(post._id);
                                                        }
                                                    }}>Edit</div>
                                                    <div className="delete-comment" onClick={(() => handleDeletePost(post._id))} tabIndex={0}
                                                     onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                        handleDeletePost(post._id);
                                                        }
                                                    }}>Delete</div>
                                             </div>
                                             }
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="post-content" tabIndex={0}>
                                    {post.text}
                                </div>
                                <div className="likes-comments">
                                        {/*If userid is in likes show blue icon*/}
                                        {likedPosts.includes(post._id) ?
                                            <div className="likes" onClick={() => handleRemoveLike(post._id)}>
                                                <Icon path={mdiThumbUp} size={1} color={"rgb(57,115,234)"}   
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                    handleRemoveLike(post._id);
                                                    }
                                                }}
                                                tabIndex={0} />
                                                <div className="like">
                                                    {post.likes}
                                                </div>
                                            </div>:
                                            <div className="likes" onClick={() => {handleAddLike(post._id)}}>
                                                <Icon path={mdiThumbUpOutline} size={1} color={"rgb(126,131,139)"} 
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                        handleAddLike(post._id);
                                                        }
                                                    }}
                                                    tabIndex={0} />
                                                    <div className="like">
                                                {post.likes}
                                                </div>
                                            </div>
                                        }
                                    
                                    <div className="comments">
                                        <Icon path={mdiCommentOutline} size={1} color={"rgb(126,131,139)"} />
                                        <div>
                                            {post.comments.length}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="post-comments">
                                    <div className="image-container">
                                    <Link to= {`/profile/${user._id}`}>
                                        <img src={user.image_url} alt={`${user.name} profile pic`} className="comment-picture"/>
                                        </Link>
                                    </div>
                                    
                                        <motion.textarea 
                                        className="comment-entry"
                                        initial={{height:"2.2em"}} 
                                        whileFocus={{height:"7em"}} 
                                        placeholder="Write a comment"
                                        value={commentText[post._id]}
                                        onChange={(e) => {handleCommentChange(e,post._id)}}>
                                        

                                        </motion.textarea>
                                        {commentText[post._id] &&
                                        <Icon path={mdiSend} size={1} className="comment-send" color={"rgb(57,115,234)"} onClick={(e) => {postComment(e, post._id, user._id)}}/>}
                                </div>
                                    <div className="all-comments">
                                        {post.comments.map((comment) =>(
                                            <div className="comment-container" key={comment._id}>
                                                <div className="image-container">
                                                    <Link to= {`/profile/${comment.author._id}`}>
                                                        <img src={comment.author.image_url} alt={`${comment.author.name} profile pic`} className="comment-picture"/>
                                                    </Link>
                                                </div>
                                                <div className="name-comment">
                                                    {comment.edited && <div className="edited" tabIndex={0}>edited</div>}
                                                    <div className="comment-name" tabIndex={0}>{comment.author.name}</div>
                                                    <div className="user-comment" tabIndex={0}  >{comment.text}</div>
                                                </div>
                                                {comment.author._id === user._id &&
                                                <>
                                                    <div className="edit-delete-container" onClick={() => setEditDropDown(!editDropDown)}>
                                                        <div className="edit-delete-icon">
                                                            <Icon path={mdiDotsHorizontal} size={1} color={"rgb(57,115,234)"}/>
                                                        </div>
                                                        {editDropDown &&
                                                            <div className="edit-dropdown">
                                                                <div className="edit-comment" onClick={() =>handleEditComment(comment._id)}>Edit</div>
                                                                <div className="delete-comment" onClick={() =>handleDeleteComment(comment._id)}>Delete</div>
                                                            </div>
                                                        }
                                                    </div>
                                                </>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                
                                 {commentLoading[post._id] &&     
                                    <div className="comment-container">
                                        <div className="image-container">
                                            {/* Use Skeleton component for loading image */}
                                            <Skeleton circle={true} height={40} width={40} className="comment-picture"/>
                                        </div>
                                        <div className="name-comment">
                                            <div className="comment-name">
                                            {/* Use Skeleton component for loading name */}
                                            <Skeleton width={80} />
                                            </div>
                                            <div className="user-comment">
                                            {/* Use Skeleton component for loading comment text */}
                                            <Skeleton count={3} />
                                            </div>
                                        </div>
                                    </div>}

                                
                            </div>
                        )):
                        (
                            Array.from({ length: 3 }).map((_, index) => (
                                <div className="post" key={index}>
                                <div className="post-header-right">
                                    <Skeleton width={40} height={40} circle={true} />
                                    <div className="actual-post-name">
                                        <Skeleton width={100} />
                                    </div>
                                </div>
                                <Skeleton height={80} />
                                <div className="likes-comments">
                                    <div className="likes">
                                        <Skeleton width={30} />
                                    </div>
                                    <div className="comments">
                                        <Skeleton width={30} />
                                    </div>
                                </div>
                                </div>
                              ))
                          
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Post