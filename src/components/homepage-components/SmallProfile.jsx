import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { updateFriendSelection } from "../../redux/friendSelectSlice";
import Icon from "@mdi/react";
import { mdiAccountGroupOutline, mdiAccountOutline, mdiBookmarkOutline, mdiCalendarBlankOutline, mdiHomeVariantOutline } from "@mdi/js";
const SmallProfile = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    return (
        <aside className="profile-third" aria-label="Primary navigation">
            <div className="small-profile">
                <div className="sidebar-person">
                    <motion.img whileHover={{scale: 1.04}} src={user.image_url} alt={user.name} className="medium-profile-pic"/>
                    <div><strong>{user.name}</strong><span>{user.job || "OdinBook member"}</span></div>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/" className="sidebar-link active"><Icon path={mdiHomeVariantOutline} size={0.9}/>Home<span/></Link>
                    <Link to="/friends" className="sidebar-link" onClick={() =>dispatch(updateFriendSelection("All Friends"))}><Icon path={mdiAccountGroupOutline} size={0.9}/>Connections</Link>
                    <Link to={`/profile/${user._id}`} className="sidebar-link"><Icon path={mdiAccountOutline} size={0.9}/>My profile</Link>
                    <button type="button" className="sidebar-link"><Icon path={mdiBookmarkOutline} size={0.9}/>Saved</button>
                    <button type="button" className="sidebar-link"><Icon path={mdiCalendarBlankOutline} size={0.9}/>Events</button>
                </nav>
                <div className="sidebar-note">
                    <span className="eyebrow">A quieter feed</span>
                    <strong>Thoughtful updates from people you know.</strong>
                    <span>Make space for the good stuff.</span>
                </div>
            </div>
        </aside>
    )
}
export default SmallProfile
