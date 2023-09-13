import { useDispatch, useSelector } from "react-redux";
import Icon from '@mdi/react';
import { mdiBriefcase, mdiHome, mdiSchool } from '@mdi/js';
import { useEffect, useState } from "react";
import { updateProfile } from "../../redux/profileSlice";
const ProfileInfo = () => {
    const user = useSelector(state => state.user);
    const host = useSelector(state => state.host);
    const profile = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [bioOpen,setBioOpen] = useState(false);
    const [bio, setBio] = useState("");
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [numRemaining, setNumRemaining] = useState(101);
    const [studiesAt, setStudiesAt] = useState("");
    const [livesAt, setLivesAt] = useState("");
    const [job, setJob] = useState("")
    const handleBioCancel = () => {
        setBioOpen(false)
    }
    //set original bio to current bio
    useEffect(() => {
        setBio(profile.bio);
        setStudiesAt(profile.studies_at);
        setLivesAt(profile.lives);
        setJob(profile.job);
    },[])
    useEffect(() => {
        setNumRemaining(101 - bio.length);
    }, [bio]);
    const handleBioEdit =  () => {
        const body = {
            id: profile._id,
            bio:bio
        }
        fetch(`${host}/users/edit/bio`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(
            response => {
                if(response.ok) {
                    const newProfile = {
                        ...profile,
                        bio
                      };
                    dispatch(updateProfile(newProfile))
                    setBioOpen(false);
                }
                else{
                    console.log("Bio didn't work")
                }
            }
        )
    }
    const handleDetailsEdit = () => {
        const body = {
            id: profile._id,
            studies_at: studiesAt,
            lives: livesAt,
            job: job
        }
        fetch(`${host}/users/edit/details`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(
            response => {
                if(response.ok) {
                    const newProfile = {
                        ...profile, 
                        lives: livesAt, 
                        studies_at: studiesAt,
                        job: job,
                    };
                    dispatch(updateProfile(newProfile))
                    setDetailsOpen(false);
                }
                else{
                    console.log("Details didn't work")
                }
            }
        )
    }
    const handleChange = (e, type) => {
        if(type === "bio"){
            setBio(e.target.value)
        }
        else if (type === "lives"){
            setLivesAt(e.target.value);
        }
        else if (type === "studies"){
            setStudiesAt(e.target.value);
        }
        else if (type === "job"){
            setJob(e.target.value);
        }
    }
    return (
        <div className="info-section">
            <h3>Intro</h3>
            { profile && profile.bio && profile.bio.length !== 0 ? 
            !bioOpen &&
            <>
             <div className="profile-bio">{profile.bio}</div>
             {user._id === profile._id &&
                <button className="edit-bio" onClick={() => setBioOpen(true)}>
                        <div className="edit">
                            Edit Bio
                        </div>
                </button>
            }
             </>
             :
             user._id === profile._id &&
             !bioOpen &&
            <button className="add-bio" onClick={() => setBioOpen(true)}>
                <div className="edit">
                    Add Bio
                </div>
            </button>
            }
            {bioOpen &&
                <div className="write-bio">
                <textarea name="" className="bio-input"
                cols="30" rows="5"
                placeholder="Tell us who you are!"
                onChange={(e) => {handleChange(e,"bio")}}
                value={bio}
                ></textarea>
                <div className="remaining-characters">{numRemaining} characters remaining</div>
                <div className="bio-save-cancel">
                    {numRemaining >= 0 ?
                    <button className="bio-save" onClick={() => handleBioEdit()}>Save</button>:
                    <button className="bio-save" disabled>Save</button>
                    }
                    <button className="bio-cancel" onClick={() => handleBioCancel()}>Cancel</button>
                </div>
            </div>
            }{
            !detailsOpen ?
            <>
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
                    </div>}
                
                {profile.job &&
                    <div className="lives">
                        <Icon path={mdiBriefcase} size={1} color={"rgb(140,147,157)"}/>
                        <div className="live-info">
                            Works at {profile.job}
                        </div>
                    </div>
                }
                {
                    ((user._id === profile._id) && (profile.job || profile.lives || profile.studies_at)) ?
                    <button className="edit-details" onClick={() => {setDetailsOpen(true)}}>
                        <div className="edit">
                            Edit Details
                        </div>
                    </button>:
                    user._id === profile._id &&
                    <button className="edit-details" onClick={() => {setDetailsOpen(true)}}>
                        <div className="edit">
                            Add Details
                        </div>
                    </button>
                    
                }
                </>:
                <>
                <div className="studies-at">
                    <div className="write">Studies At:</div>
                    <div className="write-bio">
                        <textarea name="" className="bio-input"
                        cols="30" rows="1"
                        placeholder="Where do you study?"
                        onChange={(e) => {handleChange(e, "studies")}}
                        value={studiesAt}
                        ></textarea>
                    </div>
                </div>
                <div className="studies-at">
                    <div className="write">Lives at:</div>
                    <div className="write-bio">
                        <textarea name="" className="bio-input"
                        cols="30" rows="1"
                        placeholder="Where do you work?"
                        onChange={(e) => {handleChange(e, "lives")}}
                        value={livesAt}
                        ></textarea>
                    </div>
                </div>
                <div className="studies-at">
                    <div className="write">Job:</div>
                    <div className="write-bio">
                        <textarea name="" className="bio-input"
                        cols="30" rows="1"
                        placeholder="What do you do for a living?"
                        onChange={(e) => {handleChange(e, "job")}}
                        value={job}
                        ></textarea>
                    </div>
                </div>
                <div className="bio-save-cancel">
                    <button className="bio-save" onClick={() => handleDetailsEdit()}>Save</button>
                    <button className="bio-cancel" onClick={() => setDetailsOpen(false)}>Cancel</button>
                </div>
                </>
            }
        </div>
    )
}
export default ProfileInfo