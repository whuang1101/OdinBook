import { useSelector } from "react-redux"
import Icon from '@mdi/react';
import { mdiPencil } from "@mdi/js";
const ProfileHeader = ({setProfileEdit}) => {
    const profile = useSelector(state => state.profile)
    const user = useSelector(state => state.user);
    return (
        <div className="profile-box-shadow">
            <div className="profile-container">
                <div className="background-image">
                </div>
                <div className="profile-display-container">
                    <div className="profile-header">
                        <div className="image-profile">
                            <img src={profile.image_url} alt={profile.name} className="medium-size" tabIndex={0}/>
                        </div>
                        <div className="profile-page-name">
                            <div className="user-name" tabIndex={0}>
                                {profile.name}
                            </div>
                            <div className="num-friends" tabIndex={0}>
                                {profile.friends_list.length} friends
                            </div>
                        </div>
                        {user._id === profile._id &&
                            <div className="profile-edit">
                                <button className="edit-profile" onClick={() => {setProfileEdit(true)}}> 
                                <Icon path={mdiPencil} size={1} />
                                Edit Profile</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfileHeader