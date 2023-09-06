import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/postSlice";

const Post = () => {
    const user = useSelector(state => state.user)
    const firstName = user.name.split(" ")[0];
    const dispatch = useDispatch()
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
                </div>
            </div>
        </>
    )
}

export default Post