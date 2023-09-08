import Header from "./Header"
import "../css/profile.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Icon from '@mdi/react';
import { mdiBriefcase, mdiHome, mdiPencil, mdiSchool } from '@mdi/js';
import { updatePage } from "../redux/pageSlice"
const Profile = ({setUser}) => {
    const {id} = useParams()
    const host = useSelector(state => state.host);
    const user = useSelector(state => state.user);
    const [profile, setProfile] = useState(null);
    const dispatch = useDispatch();
    useEffect(()=> {
        fetch(`${host}/users/${id}`).then(
            response => {
                if(response.ok){
                    console.log("User retrieved")
                    return response.json()
                }
                else {
                    console.log("Failed to retrieve")
                }
            }
        ).then(data => setProfile(data)).catch(err => console.error(err));
        dispatch(updatePage("profile"))
    },[])

    return(
        <>
            <Header setUser={setUser}/>
            {profile && 
            <div className="profile-screen">
                <div className="profile-box-shadow">
                    <div className="profile-container">
                        <div className="background-image">
                        </div>
                        <div className="profile-display-container">
                            <div className="profile-header">
                                <div className="image-profile">
                                    <img src={profile.image_url} alt={profile.name} className="medium-size"/>
                                </div>
                                <div className="profile-page-name">
                                    <div className="user-name">
                                        {profile.name}
                                    </div>
                                    <div className="num-friends">
                                        {profile.friends_list.length} friends
                                    </div>
                                </div>
                                {user._id === profile._id &&
                                    <div className="profile-edit">
                                        <button className="edit-profile"> 
                                        <Icon path={mdiPencil} size={1} />
                                        Edit Profile</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info-bottom">
                    <div className="info-container">
                        <div className="info-post">
                            <div className="info-section">
                                <h3>Info</h3>

                                {profile.studies_at &&
                                    <div className="university">
                                        <Icon path={mdiSchool} size={1} color={"rgb(140,147,157)"}/>
                                        <div className="university-info">
                                            Studied at {profile.studies_at}
                                        </div>
                                    </div>
                                }
                                {profile.lives &&
                                    <div className="lives">
                                        <Icon path={mdiHome} size={1} color={"rgb(140,147,157)"}/>
                                        <div className="live-info">
                                            Lives in {profile.lives}
                                        </div>
                                    </div>
                                }
                                {profile.job &&
                                    <div className="lives">
                                        <Icon path={mdiBriefcase} size={1} color={"rgb(140,147,157)"}/>
                                        <div className="live-info">
                                            Works at {profile.job}
                                        </div>
                                    </div>
                                }
                                {
                                ((user._id === profile._id) &&(profile.job || profile.lives || profile.studies_at)) &&
                                <button className="edit-details">
                                    <div className="edit">
                                        Edit Details
                                    </div>
                                </button>
                                }
                            </div>
                            <div className="post-section">
   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            
        </>
    )
}

export default Profile