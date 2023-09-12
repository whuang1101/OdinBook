import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../redux/postSlice"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Notification from "./Notification"
const PostModal = ({newInfo, setNewInfo, setLoading, setNotification}) => {
    const post = useSelector(state => state.post);
    const host = useSelector(state => state.host);
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) 
    const [postContent, setPostContent] = useState("")
    const characterLimit = 60;
    const [mouseDown, setMouseDown] = useState(false)
    const [postMouseDown, setPostMouseDown] = useState(false);
    
    // fetching from post api to add to backend
    const handlePostSubmit = (e) =>
        {
        e.preventDefault()
        const body = {
            content: postContent,
            userId: user._id
        }
            fetch(`${host}/posts`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.ok){
                dispatch(updatePost(false));
                setPostContent("")
                setLoading(true); 
                setNewInfo(!newInfo);    
                const current = {
                    status: true,
                    content: "Post Created"
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
            else {
                console.log(response)
            }
        }).catch(err => {
            console.log(err)
        })
        dispatch(updatePost(false));
        setPostContent("")
        setLoading(true); 
        setNewInfo(!newInfo);    
    }
    const handlePostContent = (e) => {
        setPostContent(e.target.value)
    }
    const backgroundDown = () => {
        setMouseDown(true);
    }
    const backgroundUp = () => {
        if (postMouseDown){
            setPostMouseDown(false);
        }
        else{
            if(mouseDown)
            {
                dispatch(updatePost(false));
                setMouseDown(false);
            }
        }
    }
    const modalUp = () => {
        setMouseDown(false);
        setPostMouseDown(false);
    }
    const modalDown = () => {
        setPostMouseDown(true);
    }
    return (
        <>
        {post && 
            <div className="post-background" onMouseDown={() => backgroundDown()} onMouseUp={() => backgroundUp()}>
                <div className="post-modal" onMouseDown={() =>modalDown()} onMouseUp={() =>modalUp()} onClick={(e) => e.stopPropagation()}>
                    <div className="create-post-header" >
                        Create post
                    </div>
                    <form className="post-form" onSubmit={(e) => handlePostSubmit(e)}>
                        <div className="post-profile">
                            <img src={user.image_url} alt={user.name} className="smallest-profile-pic" />
                            <div className="post-name">{user.name}</div>
                        </div>
                        <textarea name="post-content" 
                        id="post-content"
                        style={{resize:"none"}}
                        placeholder="What's on your mind?" 
                        className={postContent.length < characterLimit ? "large-font": "small-font"}
                        onChange={(e) => handlePostContent(e)}></textarea>
                       { postContent.length === 0 ?
                        <input type = "submit" className="post-submit-disabled" value={"Post"} disabled/>:
                        <motion.input type="submit" className="post-submit" value={"Post"} />}
                        
                    </form>

                </div>
            </div>}
        </>
    )
}

export default PostModal