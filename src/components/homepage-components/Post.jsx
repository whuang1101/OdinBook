import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/postSlice";
import { useEffect, useRef, useState } from "react";
import { updateAllPosts } from "../../redux/allPostsSlice";
import Icon from '@mdi/react';
import { mdiCommentOutline, mdiSend, mdiThumbUp, mdiThumbUpOutline } from '@mdi/js';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import timeCalculator from "../../js/timeCalculator"; "../../js/timeCalculator"
import compareMongo from "../../js/compareMongoId";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Post = () => {
    const commentRef = useRef(null)
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const host = useSelector(state => state.host);
    const allPosts = useSelector(state => state.allPosts)
    const [likedPosts, setLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState({});
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
            dispatch(updateAllPosts(updatedPosts))
            const likedPostIds = data.filter(post => compareMongo(user._id, post.likes))
            .map(post => post._id);
            //
            setLikedPosts(likedPostIds);
            setLoading(false)
        })
    },[])

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
            {if (response.ok){
                console.log("nice")
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
            {if (response.ok){
                console.log("nice")
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
      console.log(commentText[postId])

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
                                    <Link to= {`/profile/${post.author._id}`}>
                                        <img src={post.author.image_url} alt={post.author.name} className="smallest-profile-pic" />
                                    </Link>
                                    <div className="name-time">
                                        <Link to= {`/profile/${post.author._id}`} className="name">
                                            {post.author.name}
                                        </Link>
                                        <div className="long-ago">
                                            {timeCalculator(post.date)}
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                    {post.text}
                                </div>
                                <div className="likes-comments">
                                        {/*If userid is in likes show blue icon*/}
                                        {likedPosts.includes(post._id) ?
                                            <div className="likes" onClick={() => handleRemoveLike(post._id)}>
                                                <Icon path={mdiThumbUp} size={1} color={"rgb(57,115,234)"}/>
                                                <div className="like">
                                                    {post.likes}
                                                </div>
                                            </div>:
                                            <div className="likes" onClick={() => {handleAddLike(post._id)}}>
                                                <Icon path={mdiThumbUpOutline} size={1} color={"rgb(126,131,139)"} />
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
                                {post.comments.length === 0 &&
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
                                        <Icon path={mdiSend} size={1} className="comment-send" color={"rgb(57,115,234)"}/>}


                                </div>
                                }
                                
                            </div>
                        )):
                        (
                            Array.from({ length: 3 }).map((_, index) => (
                                <div className="post" key={index}>
                                <div className="post-header">
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