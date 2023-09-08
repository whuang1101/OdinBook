import { useSelector } from "react-redux";
import Icon from '@mdi/react';
import { mdiBriefcase, mdiHome, mdiSchool } from '@mdi/js';
const ProfileInfo = () => {
    const user = useSelector(state => state.user);
    const profile = useSelector(state => state.profile)
    return (
        <div className="info-section">
            <h3>Intro</h3>
            {!profile.bio &&
            ((user._id === profile._id) &&(profile.job || profile.lives || profile.studies_at)) &&
            <button className="add-bio">
                <div className="edit">
                    Add Bio
                </div>
            </button>
            }
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
    )
}
export default ProfileInfo