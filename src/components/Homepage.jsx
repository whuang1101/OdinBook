import "../css/homepage.css"
import Header from "../components/Header"
import "../css/small-profile.css"
import "../css/post.css"
import SmallProfile from "./homepage-components/SmallProfile"
import Post from "./homepage-components/Post"
import PostModal from "./PostModal"
import EditModal from "./homepage-components/EditModal"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { updatePage } from "../redux/pageSlice"
import Notification from "./Notification"
import Game1 from "../assets/game1.png"
import KeepInTouch from "../assets/KeepInTouch.png"
import "../css/sponsored.css"
import { Link } from "react-router-dom"

const Homepage = ({setUser}) => {
    const [loading, setLoading] = useState(true);
    const [newInfo, setNewInfo] = useState(false);
    const [notification, setNotification] = useState({
        status: false,
        content: ""
    });
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(updatePage("home"))
        setNotification({
            status: false,
            content: ""
        })
    },[])
    return(
        <div className="home-background">
            {notification.status &&
                <Notification content={notification.content}/>}
            <EditModal setLoading={setLoading} setNotification={setNotification}/>
            <PostModal newInfo={newInfo} setNewInfo={setNewInfo} setLoading={setLoading} setNotification={setNotification}/>
            <Header setUser={setUser}/>
            <div className="bottom-screen">
                <SmallProfile/>
                <Post setLoading = {setLoading} loading={loading} newInfo={newInfo} setNotification={setNotification}/>
                <div className="sponsored-third">
                    <div className="main-sponsors">
                        <h3 className="sponsored-title">Sponsored By <a href="https://github.com/whuang1101/"style={{display:"inline"}} >@whuang1101:</a></h3>
                        <div className="sponsored-content">
                            <div className="game1">
                                <a href={"https://incandescent-froyo-150a8b.netlify.app/"} className="sponsored-title">Pixel Finder</a>
                                <p>The best where's waldo game in the world! </p>
                                <img src={Game1} alt="Pixel Finder Game Image" style={{maxWidth:"100%", borderRadius:".5em"}}/>
                            </div>
                            <div className="game2">
                                <a href={"https://mellow-sfogliatella-52d786.netlify.app/login"} className="sponsored-title">KeepInTouch (A messenger clone)</a>
                                <p>Allows real time communication with socket.io</p>
                                <img src={KeepInTouch} alt="Keep In Touch in action image" style={{maxWidth:"100%", borderRadius:".5em"}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage