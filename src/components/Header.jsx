import "../css/header.css"
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountGroup, mdiAccountGroupOutline, mdiAccountOutline, mdiHome, mdiHomeOutline } from '@mdi/js';
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../redux/pageSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Header = ({setUser}) => {
    const user = useSelector((state) => state.user);
    const page = useSelector((state) => state.page);
    const host = useSelector((state) => state.host);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = (page) => {
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
    }
    return (
        <div className="header">
            <div className="odin-header">
                <div className="odin-book-icon">OB</div>
                <div className="odin-book-title">Odin Book</div>
            </div>
            <div className="pages">
            {page === "home" ? (
                <motion.div className="home">
                    <Icon path={mdiHome} size={1} color="rgb(17,108,221)" />
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
                <div className="home" onClick={() => handleClick("home")} >
                    <Icon path={mdiHomeOutline} size={1} />
                </div>
            )}
            {page === "friends" ? (
                <motion.div className="friends">
                    <Icon path={mdiAccountGroup} size={1} color="rgb(17,108,221)"/>
                    <motion.div
                        key="friends"
                        className="border"
                        initial={{ height: "0" }}
                        animate={{ height: ".2em" }}
                        exit={{ opacity: "0", height: "0" }}
                        transition={{ duration: 0.25 }}>
                    </motion.div>
                </motion.div>):(
                <div className="friends" onClick={() => handleClick("friends")}>
                    <Icon path={mdiAccountGroupOutline} size={1} />
                </div>)
            }
                {page === "profile" ?
                <motion.div className="profile">
                    <Icon path={mdiAccount} size={1} color="rgb(17,108,221)"/>
                    <motion.div
                        key="profile"
                        className="border"
                        initial={{ height: "0" }}
                        animate={{ height: ".2em" }}
                        exit={{ opacity: "0", height: "0" }}
                        transition={{ duration: 0.25 }}>
                    </motion.div>
                </motion.div>:
                <div className="profile" onClick={() => handleClick("profile")}>
                    <Icon path={mdiAccountOutline} size={1} />
                </div>
                }
            </div>
            <div className="profile-image" onClick={() => handleLogout()}>
                <img src={user.image_url} alt={user.name} style={{height:"2em", width:"2em", borderRadius:"1em"}}/>
            </div>
        </div>
    )
}
export default Header