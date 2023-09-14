import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { updateFriendSelection } from "../../redux/friendSelectSlice";
const SmallProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    return (
        <div className="profile-third">
            <div className="small-profile">
                <motion.img whileHover={{ rotate: 360 }} transition={{ duration: 1, }}src={user.image_url} alt={user.name} className="medium-profile-pic" tabIndex={0}
                aria-label={`${user.name} profile pic`}/>
                <motion.div className="profile-name" tabIndex={0}>{user.name}</motion.div>
                
                        <Link to ={`/profile/${user._id}`} className="link" aria-label="Navigate to Profile">
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}}className="view-profile" tabIndex={-1}>
                            View Profile
                            </motion.button>
                        </Link>
                
                        <Link to ={`/friends`} className="link" onClick={() =>dispatch(updateFriendSelection("All Friends"))} aria-label="Navigate to Profile">
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}} className="view-friends" tabIndex={-1}>
                                View Friends
                            </motion.button>
                        </Link>
               
            </div>
        </div>
    )
}
export default SmallProfile