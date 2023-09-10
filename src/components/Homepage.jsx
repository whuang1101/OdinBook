import "../css/homepage.css"
import Header from "../components/Header"
import "../css/small-profile.css"
import "../css/post.css"
import SmallProfile from "./homepage-components/SmallProfile"
import Post from "./homepage-components/Post"
import PostModal from "./PostModal"
import EditModal from "./homepage-components/EditModal"
import { useState } from "react"

const Homepage = ({setUser}) => {
    const [loading, setLoading] = useState(true);
    const [newInfo, setNewInfo] = useState(false);
    return(
        <div className="home-background">
            <EditModal setLoading={setLoading}/>
            <PostModal newInfo={newInfo} setNewInfo={setNewInfo} setLoading={setLoading}/>
            <Header setUser={setUser}/>
            <div className="bottom-screen">
                <SmallProfile/>
                <Post setLoading = {setLoading} loading={loading} newInfo={newInfo}/>
                <div className="friends-third">
                </div>
            </div>
        </div>
    )
}

export default Homepage