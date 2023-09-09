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
    return(
        <div className="home-background">
            <EditModal setLoading={setLoading}/>
            <PostModal/>
            <Header setUser={setUser}/>
            <div className="bottom-screen">
                <SmallProfile/>
                <Post setLoading = {setLoading} loading={loading}/>
                <div className="friends-third">
                </div>
            </div>
        </div>
    )
}

export default Homepage