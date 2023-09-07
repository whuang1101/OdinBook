import "../css/homepage.css"
import Header from "../components/Header"
import "../css/small-profile.css"
import "../css/post.css"
import SmallProfile from "./homepage-components/SmallProfile"
import Post from "./homepage-components/Post"
import PostModal from "./PostModal"


const Homepage = ({setUser}) => {
    return(
        <div className="home-background">
            <PostModal/>
            <Header setUser={setUser}/>
            <div className="bottom-screen">
                <SmallProfile/>
                <Post/>
                <div className="friends-third">
                </div>
            </div>
        </div>
    )
}

export default Homepage