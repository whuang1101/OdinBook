import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../redux/postSlice"
import { useState } from "react"
import { motion } from "framer-motion"

const PostModal = () => {
    const post = useSelector(state => state.post)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [postContent, setPostContent] = useState("")
    const characterLimit = 60;
    const [mouseDown, setMouseDown] = useState(false)
    const [postMouseDown, setPostMouseDown] = useState(false);
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
                    <form className="post-form">
                        <div className="post-profile">
                            <img src={user.image_url} alt={user.image} className="smallest-profile-pic" />
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