import "../css/homepage.css"
import Header from "../components/Header"
import "../css/post-screen.css"
import SmallProfile from "./homepage-components/SmallProfile"
const Homepage = () => {

    return(
        <div className="home-background">
            <Header/>
            <div className="bottom-screen">
                <SmallProfile/>
                <div className="post-third">

                </div>
                <div className="friends-third">
                    
                </div>
            </div>
        </div>
    )
}

export default Homepage