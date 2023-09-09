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
                <motion.img whileHover={{ rotate: 360 }} transition={{ duration: 1, }}src={user.image_url} alt={user.name} className="medium-profile-pic"/>
                <motion.div className="profile-name">{user.name}</motion.div>
                
                        <Link to ={`/profile/${user._id}`} className="link">
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}}className="view-profile">
                            View Profile
                            </motion.button>
                        </Link>
                
                        <Link to ={`/friends`} className="link" onClick={() =>dispatch(updateFriendSelection("All Friends"))}>
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}} className="view-friends">
                                View Friends
                            </motion.button>
                        </Link>
               
            </div>
        </div>
    )
}
export default SmallProfile