import { useState } from "react";
import "../../css/edit-profile.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProfile } from "../../redux/profileSlice";
const EditProfile = ({setProfileEdit, setUser}) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const host = useSelector(state => state.host)
    const [selectedImage, setSelectedImage] = useState(null);
    const [firstName, setFirstName] = useState(profile.name.split(" ")[0])
    const [lastName, setLastName] = useState(profile.name.split(" ")[1])
        const handleImageChange = (event) => {
            const file = event.target.files[0];
            setSelectedImage(file);
        };
    const onSaveProfile = (e) => {
        console.log(selectedImage);
        e.preventDefault()
        const formData = new FormData();
        formData.append("image_url", selectedImage);
        formData.append("id", profile._id);

        fetch(`${host}/users/image/edit`, {
            method:"PUT",
            body: formData
        }).then(
            response => {
                if (response.ok) {
                    setProfileEdit(false);
                }
            }
        )
    }
    const onDelete = () => {
        fetch(`${host}/users`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id}),
        }).then (
            response => {
                if (response.ok) {
                    setUser(null)
                    localStorage.setItem("userData", null);
                    navigate("/login")
                    dispatch(updateProfile(null));
                }
            }
        )
    }
    const onSaveName = (e) => {
        e.preventDefault();
        fetch(`${host}/users/name/edit`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id: profile._id, name: firstName+ " "+lastName})
        }).then(
            response => {
                if (response.ok) {
                    setProfileEdit(false);
                }
            }
        )
    }
    return (
        <div className="edit-profile-background" onClick={() => setProfileEdit(false)}>
            <div className="edit-profile-modal" onClick={(e) => e.stopPropagation()}>
                <form className="profile-picture-container" onSubmit={(e) => onSaveProfile(e)}>
                    <h2>Edit Profile Picture</h2>
                    <input
                        type="file"
                        name="image_url"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    {selectedImage && (
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected Profile"
                            className="selected-profile-image"
                            
                        />
                        )}
                    <button className="save-image" >Save Profile Picture</button>
                </form>
                <form className="name-change-container" onSubmit={(e) => onSaveName(e)}>
                    <h2>Edit Name</h2>
                    <div className="edit-name-container">
                        <input type="text" className="first-name" placeholder="First Name" name="first" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} required/>
                        <input type="text" className="last-name" placeholder="Last Name" name="last" value={lastName} onChange={(e) => {setLastName(e.target.value)}} required/>
                    </div>
                    <button className="save-name" >Save Name</button>
                </form>
                <div className="delete-button">
                    <p style={{fontSize:"1.3em"}}>The delete button action is final it will remove all your posts and comments. You have been warned!!!</p>
                    {id === "650201f3955191ac6efd8935" ?
                    <button className="save-name" style ={{backgroundColor:"lightgrey"}} disabled>Can't delete demo Account</button>
                    :<button className="save-name" style ={{backgroundColor:"red"}} onClick={() => onDelete()}>Delete Account</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditProfile