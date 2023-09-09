import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/postSlice"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { updateAllPosts } from "../../redux/allPostsSlice"
import { useNavigate } from "react-router-dom"
import { updateCommentModal } from "../../redux/commentModalSlice"
import { updateComment } from "../../redux/editCommentSlice"
const EditModal = ({setLoading}) => {
    const commentModal = useSelector(state => state.commentModal);
    const host = useSelector(state => state.host);
    const comment =  useSelector(state => state.editComment)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) 
    const [postContent, setPostContent] = useState("")
    const characterLimit = 60;
    const [mouseDown, setMouseDown] = useState(false)
    const [postMouseDown, setPostMouseDown] = useState(false);
    
    useEffect(() =>{
        if(comment !== ""){
        fetch(`${host}/comments/${comment}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then((data) => setPostContent(data.text));
    }
    },[comment])
    // fetching from post api to add to backend
    const handlePostSubmit = (e) =>
        {
        e.preventDefault()
        const body = {
            id: comment,
            text: postContent,
        }
            fetch(`${host}/comments/edit`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.ok){
                console.log("hi")
            }
            else {
                console.log(response)
            }
        }).catch(err => {
            console.log(err)
        })
        dispatch(updateCommentModal(""));
        dispatch(updateComment(""))
        setLoading(true)
    }
    const handleCancelDelete = () => {
        dispatch(updateCommentModal(""));
        dispatch(updateComment(""));
    }
    const handleCommentDelete = () => {
        const body = {
            id: comment,
            text: postContent,
        }
            fetch(`${host}/comments/delete`, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.ok){
                console.log("Successfully Delete Comment")
            }
            else {
                console.log(response)
            }
        }).catch(err => {
            console.log(err)
        })
        dispatch(updateCommentModal(""));
        dispatch(updateComment(""))
        setLoading(true)
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
                setPostContent("")
                dispatch(updateCommentModal(""));
                dispatch(updateComment(""))
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
        {commentModal !== "" && 
            <div className="post-background" onMouseDown={() => backgroundDown()} onMouseUp={() => backgroundUp()}>
                <div className="post-modal" onMouseDown={() =>modalDown()} onMouseUp={() =>modalUp()} onClick={(e) => e.stopPropagation()}>
                    {commentModal==="edit-comment" && 
                    <>
                    <div className="create-post-header" >
                        Edit Comment
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
                        onChange={(e) => handlePostContent(e)}
                        value={postContent}></textarea>
                        
                        { postContent.length === 0 ?
                        <input type = "submit" className="post-submit-disabled" value={"Edit Comment"} disabled/>:
                        <motion.input type="submit" className="post-submit" value={"Edit Comment"} />}
                        
                    </form>
                    </>}
                    {commentModal === "delete-comment" &&
                        <>
                        <div className="create-post-header" >
                            Are you sure you want to delete this comment?
                        </div>
                        <div className="delete-content">{postContent}</div>
                        <div className="choices">
                            <button className="confirm-comment-delete" onClick={() => handleCommentDelete()}>
                                Yes
                            </button>
                            <button className="cancel-comment-delete" onClick={() => handleCancelDelete()}>No</button>
                        </div>
                      </>}

                </div>
            </div>}
        </>
    )
}

export default EditModal