import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { updateCommentModal } from "../../redux/commentModalSlice"
import { updateComment } from "../../redux/editCommentSlice"
import { updateEditPost } from "../../redux/editPostSlice"
const EditModal = ({setLoading, setNotification}) => {
    const commentModal = useSelector(state => state.commentModal);
    const host = useSelector(state => state.host);
    const comment =  useSelector(state => state.editComment)
    const postId = useSelector(state => state.editPost)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user) 
    const [postContent, setPostContent] = useState("")
    const characterLimit = 60;
    const [mouseDown, setMouseDown] = useState(false)
    const [postMouseDown, setPostMouseDown] = useState(false);
    useEffect(() => {
        if(postId !== "") {
            fetch(`${host}/posts/single/${postId}`)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
            })
            .then((data) => {setPostContent(data.text)});
        } 
    },[postId])
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
        if(comment !== ""){
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
                dispatch(updateComment(""))
                dispatch(updateEditPost(""))
                dispatch(updateCommentModal(""));
                setLoading(true)
                const current = {
                    status: true,
                    content: "Comment Edited Successfully"
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
        })}
        if(postId !== ""){
            const body = {
                id: postId,
                text: postContent,
            }
            fetch(`${host}/posts/edit`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(response => {
                if(response.ok){
                    console.log("hi")
                    dispatch(updateComment(""))
                    dispatch(updateEditPost(""))
                    dispatch(updateCommentModal(""));
                    setLoading(true)
                const current = {
                        status: true,
                        content: "Post Edited Successfully"
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
        }
    }
    const handleCancelDelete = () => {
        dispatch(updateCommentModal(""));
        dispatch(updateComment(""));
        dispatch(updateEditPost(""))
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
                const current = {
                    status: true,
                    content: "Comment Deleted Successfully"
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
        dispatch(updateCommentModal(""));
        dispatch(updateComment(""))
        setLoading(true)
    }
    const handlePostDelete = () => {
        const body = {
            id: postId,
            text: postContent,
        }
            fetch(`${host}/posts/delete`, {
            method:"DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => {
            if(response.ok){
                setLoading(true)
                const current = {
                    status: true,
                    content: "Post Deleted Successfully"
                };
                setNotification(current);
                    setTimeout(() => {
                    const newStatus = {
                        status: false,
                        content: ""
                    };
                    setNotification(newStatus);
                }, 3000);
                return response.json();
            }
            else {
                console.log(response.status)
            }
        }).catch(err => {
            console.log(err)
        })
        dispatch(updateCommentModal(""));
        dispatch(updateComment(""))
        dispatch(updateEditPost(""))
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
                dispatch(updateEditPost(""))
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
                    {commentModal==="edit-post" && 
                    <>
                    <div className="create-post-header" >
                        Edit Post
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
                        <input type = "submit" className="post-submit-disabled" value={"Edit Post"} disabled/>:
                        <motion.input type="submit" className="post-submit" value={"Edit Post"} />}
                        
                    </form>
                    </>
                    }
                    {commentModal === "delete-comment" &&
                        <>
                        <div className="create-post-header" >
                            Are you sure you want to delete this comment? This change is permanent!
                        </div>
                        <div className="delete-content">{postContent}</div>
                        <div className="choices">
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}}className="confirm-comment-delete" onClick={() => handleCommentDelete()}>
                                Yes
                            </motion.button>
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}}
                            className="cancel-comment-delete" onClick={() => handleCancelDelete()}
                            >No
                            </motion.button>
                        </div>
                      </>}
                      {commentModal === "delete-post" &&
                        <>
                        <div className="create-post-header" >
                            Are you sure you want to delete this post? This change is permanent!
                        </div>
                        <div className="delete-content">{postContent}</div>
                        <div className="choices">
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}}className="confirm-comment-delete" onClick={() => handlePostDelete()}>
                                Yes
                            </motion.button>
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale:.9}}
                            className="cancel-comment-delete" onClick={() => handleCancelDelete()}
                            >No
                            </motion.button>
                        </div>
                      </>}

                </div>
            </div>}
        </>
    )
}

export default EditModal