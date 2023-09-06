import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/postSlice";
import { useEffect } from "react";
import { updateAllPosts } from "../../redux/allPostsSlice";
import Icon from '@mdi/react';
import { mdiCommentOutline, mdiThumbUpOutline } from '@mdi/js';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Post = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const host = useSelector(state => state.host);
    const allPosts = useSelector(state => state.allPosts)
    const dateCalculator = (date) => {
        const inputDate = new Date(date)
        const currentDate = new Date();
        console.log(currentDate)
        const timeDifference = (currentDate-inputDate)/1000;
        console.log(timeDifference)
    }
    useEffect(()=> {
        fetch(`${host}/posts/${user._id}`).then( response =>
           { if(response.ok){
            console.log("ok")
                return response.json()
            }
            else{
                console.log(response.status)
            }
        }
        ).then(data =>  dispatch(updateAllPosts(data)))
    },[])
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
                        allPosts.length!==0 ? allPosts.map((post) => (
                            <div className="post" key={post._id}>
                                <div className="post-header">
                                    <img src={post.author.image_url} alt={post.author.name} className="smallest-profile-pic" />
                                    <div className="actual-post-name">{user.name}</div>
                                    {dateCalculator(post.date)}
                                </div>
                                <div className="post-content">
                                    {post.text}
                                </div>
                                <div className="likes-comments">
                                    <div className="likes">
                                        <Icon path={mdiThumbUpOutline} size={1} />
                                        <div className="like">
                                            {post.likes.length}
                                        </div>
                                    </div>
                                    <div className="comments">
                                        <Icon path={mdiCommentOutline} size={1} />
                                        <div>
                                            {post.likes.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )):
                        (
                            Array.from({ length: 5 }).map((_, index) => (
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