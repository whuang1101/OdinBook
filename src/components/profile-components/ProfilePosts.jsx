import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/postSlice"
import { useEffect, useState } from "react";
import { updateAllPosts } from "../../redux/allPostsSlice";
import compareMongo from "../../js/compareMongoId";
import Icon from '@mdi/react';
import { mdiCommentOutline, mdiThumbUp, mdiThumbUpOutline } from '@mdi/js';
import timeCalculator from "../../js/timeCalculator";
import { useParams } from "react-router-dom";

const ProfilePosts = () => {
    const {id} = useParams();
    const [likedPosts, setLikedPosts] = useState(false)
    const [loading, setLoading] =useState(true)
    const allPosts = useSelector(state => state.allPosts)
    const host = useSelector(state => state.host)
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const firstName = user.name.split(" ")[0];
    useEffect(()=> {
        fetch(`${host}/posts/self/${id}`).then( response =>
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
            setLikedPosts(likedPostIds);
            setLoading(false)
            console.log(updatedPosts)
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

    return (
        <div className="post-section">
                {user._id === id ?
                <>
                    <div className="add-post">
                        <div className="image-container">
                            <img src={user.image_url} alt={`${user.name} profile pic`} className="smallest-profile-pic"/>
                        </div>
                        <button className="post-button" onClick={() => dispatch(updatePost(true))}>What's on your mind {firstName}?</button>
                    </div>
                </>:
                <h2>Recent Posts</h2>
                }
                
                {/* Post modal/ background is on PostModal.jsx */}
            {
                !loading && allPosts.map((post) => (
                    <div className="post" key={post._id}>
                        <div className="post-header">
                            <img src={post.author.image_url} alt={post.author.name} className="smallest-profile-pic" />
                            <div className="name-time">
                                <div className="name">
                                    {user.name}
                                </div>
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
                    </div>
                ))
            }
        </div>
    )
}

export default ProfilePosts