import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const SmallProfile = () => {
    const user = useSelector((state) => state.user);
    return (
        <div className="profile-third">
            <div className="small-profile">
                <motion.img whileHover={{ rotate: 360 }} transition={{ duration: 1, }}src={user.image_url} alt={user.name} className="medium-profile-pic"/>
                <motion.div className="profile-name">{user.name}</motion.div>
                <motion.button whileHover={{scale:1.1}} transition= {{duration:.5}} className="view-profile">View Profile</motion.button>
                <motion.button whileHover={{scale:1.1}} transition= {{duration:.5}} className="view-friends">View Friends</motion.button>
            </div>
        </div>
    )
}
export default SmallProfile