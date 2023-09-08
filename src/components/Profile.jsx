import Header from "./Header"
import "../css/profile.css"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';
const Profile = ({setUser}) => {
    const {id} = useParams()
    const host = useSelector(state => state.host);
    const [profile, setProfile] = useState(null);
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
    },[])

    return(
        <>
            <Header setUser={setUser}/>
            {profile && 
            <div className="profile-screen">
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
                            <div className="profile-edit">
                                <button className="edit-profile"> <Icon path={mdiPencil} size={1} />
Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
            
        </>
    )
}

export default Profile