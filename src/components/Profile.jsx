import Header from "./Header"
import "../css/profile.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { updatePage } from "../redux/pageSlice";
import { updateProfile } from "../redux/profileSlice";
import ProfileHeader from "./profile-components/ProfileHeader";
import ProfileInfo from "./profile-components/ProfileInfo";
import ProfilePosts from "./profile-components/ProfilePosts";
import PostModal from "./PostModal";
import EditModal from "./homepage-components/EditModal";
const Profile = ({setUser}) => {
    const {id} = useParams()
    const host = useSelector(state => state.host);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    useEffect(()=> {
        fetch(`${host}/users/${id}`).then(
            response => {
                if(response.ok){
                    return response.json()
                }
                else {
                    console.log("Failed to retrieve")
                }
            }
        ).then(data => {
            dispatch(updateProfile(data))})
        .catch(err => console.error(err));
            dispatch(updatePage("profile"))
    },[])
    const [loading, setLoading] =useState(true)
    const [newInfo, setNewInfo] = useState(false);


    return(
        <>
            <Header setUser={setUser}/>
            {profile && 
            <div className="profile-screen">
            <EditModal setLoading={setLoading}/>
                <PostModal newInfo={newInfo} setNewInfo={setNewInfo} setLoading={setLoading}/>
                <ProfileHeader/>
                <div className="info-bottom">
                    <div className="info-container">
                        <div className="info-post">
                            <ProfileInfo/>
                            <ProfilePosts  setLoading = {setLoading} loading={loading} newInfo={newInfo}/>
                        </div>
                    </div>
                </div>
            </div>
            }
            
        </>
    )
}

export default Profile