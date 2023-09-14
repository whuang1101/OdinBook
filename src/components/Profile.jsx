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
import Notification from "./Notification";
import EditProfile from "./profile-components/EditProfile";
import { updateUser } from "../redux/userSlice";
const Profile = ({setUser}) => {
    const {id} = useParams()
    const user = useSelector(state => state.user);
    const host = useSelector(state => state.host);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [profileEdit, setProfileEdit] = useState(false);
    const post = useSelector(state => state.post);
    const [newInfo, setNewInfo] = useState(false);
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
            dispatch(updateProfile(data))
            if(user._id === id ){
            dispatch(updateUser(data))}
        }
            
            )
        .catch(err => console.error(err));
            dispatch(updatePage("profile"))
    },[id, profileEdit,newInfo,post])
    const [loading, setLoading] =useState(true)
    const [notification, setNotification] = useState({
        status: false,
        content: ""
    });


    return(
        <>
            {profileEdit &&
            <EditProfile setProfileEdit={setProfileEdit} setUser={setUser}/>
            }
            <Header setUser={setUser}/>
            {profile && 
                <div className="profile-screen">
                {notification.status &&
                <Notification content={notification.content}/>
                }
                    <EditModal setLoading={setLoading} setNotification={setNotification}/>
                    <PostModal newInfo={newInfo} setNewInfo={setNewInfo} setLoading={setLoading} setNotification={setNotification}/>
                    <ProfileHeader setProfileEdit={setProfileEdit}/>
                    <div className="info-bottom">
                        <div className="info-container">
                            <div className="info-post">
                                <ProfileInfo/>
                                <ProfilePosts  setLoading = {setLoading} loading={loading} newInfo={newInfo} setNotification={setNotification} profileEdit={profileEdit}/>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </>
    )
}

export default Profile