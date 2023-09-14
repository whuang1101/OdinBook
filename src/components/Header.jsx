import "../css/header.css"
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountGroup, mdiAccountGroupOutline, mdiAccountOutline, mdiDoor, mdiDoorOpen, mdiHome, mdiHomeOutline } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../redux/pageSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { updateFriendSelection } from "../redux/friendSelectSlice";
import { useState } from "react";
import { updateProfile } from "../redux/profileSlice";
const Header = ({setUser}) => {
    const user = useSelector((state) => state.user);
    const page = useSelector((state) => state.page);
    const host = useSelector((state) => state.host);
    const [dropDown, setDropDown] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleDropDown = (e) => {
        if(e.key === "Enter"){
        setDropDown(!dropDown);
    }
    }
    const handleClick = (page) => {
        dispatch(updateFriendSelection("Friend Requests"))
        dispatch(updatePage(page))
    }
    const handleLogout = () => {
        fetch(`${host}/auth/logout`,{
            method:"POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            }
        })
        setUser(null)
        localStorage.setItem("userData", null);
        navigate("/login")
        dispatch(updateProfile(null));
    }
    const handleEnterLogout = (e) => {
        if(e.key === "Enter"){
            fetch(`${host}/auth/logout`,{
                method:"POST",
                credentials: "include",
                headers: {
                    "Content-type": "application/json"
                }
            })
            setUser(null)
            localStorage.setItem("userData", null);
            navigate("/login")
            dispatch(updateProfile(null));
        }
    }
    return (
        <div className="header">
            <div className="odin-header">
                <div className="odin-book-icon">OB</div>
                <h2 className="odin-book-title">Odin Book</h2>
            </div>
            <div className="pages">
            {page === "home" ? (
                <motion.div className="home">
                    <Icon path={mdiHome} size={1.3} color="rgb(17,108,221)" />
                    <motion.div
                        key="home"
                        className="border"
                        initial={{ height: "0" }}
                        animate={{ height: ".2em" }}
                        exit={{ opacity: "0", height: "0" }}
                        transition={{ duration: 0.25 }}>
                    </motion.div>
                </motion.div>
            ) : (
                <Link to="/" className="home" onClick={() => handleClick("home")}>
                    <Icon path={mdiHomeOutline} size={1.3} />
                </Link>
            )}
            {page === "friends" ? (
                <motion.div className="friends">
                    <Icon path={mdiAccountGroup} size={1.3} color="rgb(17,108,221)"/>
                    <motion.div
                        key="friends"
                        className="border"
                        initial={{ height: "0" }}
                        animate={{ height: ".2em" }}
                        exit={{ opacity: "0", height: "0" }}
                        transition={{ duration: 0.25 }}>
                    </motion.div>
                </motion.div>
                ):(
                <Link to="/friends" className="friends" onClick={() => handleClick("friends")} aria-label="Navigate to friends" >
                    <Icon path={mdiAccountGroupOutline} size={1.3} />
                </Link>)
                
            }
                {page === "profile" ?
                <motion.div className="profile">
                    <Icon path={mdiAccount} size={1.3} color="rgb(17,108,221)"/>
                    <motion.div
                        key="profile"
                        className="border"
                        initial={{ height: "0" }}
                        animate={{ height: ".2em" }}
                        exit={{ opacity: "0", height: "0" }}
                        transition={{ duration: 0.25 }}>
                    </motion.div>
                </motion.div>:
                <Link to={`/profile/${user._id}`} className="profile" onClick={() => handleClick("profile")} aria-label="Navigate to profile" >
                    <Icon path={mdiAccountOutline} size={1.3} />
                </Link>
                }
            </div>
            <div className="profile-image">
                <motion.img
                whileHover={{scale: 1.3}}
                whileTap={{scale: .8}} src={user.image_url} alt={user.name} style={{height:"2em", width:"2em", borderRadius:"1em"}} onClick={() =>setDropDown(!dropDown)} onKeyDown={(e) =>handleDropDown(e)}
                aria-label="Drop down menu that displays view profile and logout"/>
                {dropDown &&
                    <div className="profile-drop-down">
                        <Link to={`/profile/${user._id}`} className="view-profile-image"  aria-label="Navigate to profile">
                            <Icon path={mdiAccountOutline} size={1} color={"rgb(57,115,234)"}/>
                            <div >
                                View Profile
                            </div>
                            </Link>
                        <div className="logout" onClick={() => handleLogout()} tabIndex={0} onKeyDown={(e) => handleEnterLogout(e)} aria-label="Logout">
                            <Icon path={mdiDoorOpen} size={1} color={"rgb(57,115,234)"}/>
                        <div>
                            Logout
                        </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
export default Header