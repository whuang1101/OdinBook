import { useState, useEffect } from "react";
import "../css/sign-up.css"
import { useSelector } from "react-redux";
const SignUp = ({setSignUpModal, setNotification}) => {
    const [newUser, setNewUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        live: "",
        job: "",
        studies: "",
        image_url: null,
      });
    const [password, setPassword] = useState(false);
    const [emailFound, setEmailFound] = useState(false);
    const [capital, setCapital] = useState(false);
    const [anyError, setAnyError] = useState(true);

    const host = useSelector(state => state.host)
    const handleOnChange = (e) => {
        if(e.target.name === "image_url"){
            const newestUser = { ...newUser, image_url: e.target.files[0] };
            setNewUser(newestUser);
        }
        else if(e.target.name === "first"){
            const newestUser = { ...newUser, first_name: e.target.value };
            setNewUser(newestUser);
        }
        else if(e.target.name === "last"){
            const newestUser = { ...newUser, last_name: e.target.value };
            setNewUser(newestUser);
        }
        else if(e.target.name === "email"){
            const newestUser = { ...newUser, email: e.target.value };
            setNewUser(newestUser);
        }
        else if(e.target.name === "job"){
            const newestUser = { ...newUser, job: e.target.value };
            setNewUser(newestUser);
        }
        else if(e.target.name === "live"){
            const newestUser = { ...newUser, live: e.target.value };
            setNewUser(newestUser);
                }
        else if(e.target.name === "studies"){
            const newestUser = { ...newUser, studies: e.target.value };
            setNewUser(newestUser);
        }
        else if(e.target.name === "password"){
            const newestUser = { ...newUser, password: e.target.value };
            if(newestUser.password === newestUser.confirm_password){
                setPassword(true);
                if(capital) {
                    setAnyError(false);
                }
            }
            else{
                setPassword(false);
                setAnyError(true)
            }
            if(newestUser.password.length > 0)
                {if(newestUser.password[0] === newestUser.password[0].toUpperCase()){
                    setCapital(true)
                    if(password) {
                        setAnyError(false);
                    }
                }
                else{
                    setAnyError(true);
                    setCapital(false)
                }}
                
            setNewUser(newestUser);
        }
        else if(e.target.name === "confirm-password"){
            const newestUser = { ...newUser, confirm_password: e.target.value };
            if(newestUser.password === newestUser.confirm_password){
                setPassword(true);
                if(capital) {
                    setAnyError(false);
                }
            }
            else{
                setPassword(false);
                setAnyError(true);
            }
            setNewUser(newestUser);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("image_url", newUser.image_url);
        formData.append("first_name", newUser.first_name);
        formData.append("last_name", newUser.last_name);
        formData.append("email", newUser.email);
        formData.append("password", newUser.password);
        formData.append("confirm_password", newUser.confirm_password);
        formData.append("live", newUser.live);
        formData.append("job", newUser.job);
        formData.append("studies", newUser.studies);
      
        try {
          const response = await fetch(`${host}/users/newUser`, {
            method: "POST",
            body: formData, 
          });
      
          if (response.ok) {
            setSignUpModal(false);
            const current = {
                status: true,
                content: "User Created use credentials to log in."
            };
    
            setNotification(current);
                setTimeout(() => {
                const newStatus = {
                    status: false,
                    content: ""
                };
                setNotification(newStatus);
            }, 3000);   
        } else {
            console.log("no")
          }
        } catch (error) {
            console.log(error)
        }
    };
    const onEmailBlur = () => {
        fetch(`${host}/users/email/${newUser.email.toLowerCase()}`)
        .then(response => {
            if(response.ok){
                return response.json()
            }
        }).then(data => {setEmailFound(data), console.log(data)})
    }
    return (
        <div className="sign-up-background" onClick={() => setSignUpModal(false)}>
            <div className="sign-up-modal" onClick={(e) => e.stopPropagation()}>
                <div className="sign-up-title-container">
                    <h1 className="sign-up-title">Sign Up</h1>
                    <p className="easy">It’s quick and easy.</p>
                    <p className="easy">* are required fields</p>
                </div>
                <form className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="name-container">
                        {newUser.first_name ?
                        <input type="text" className="first-name" placeholder="First Name *" name="first" onChange={(e) => {handleOnChange(e)}} required/>
                        :  <input type="text" className="first-name" placeholder="First Name *" name="first" onChange={(e) => {handleOnChange(e)}} style={{border:"1px solid red"}} required/>
                         }
                         {newUser.last_name ?<input type="text" className="last-name" placeholder="Last Name *" name="last" onChange={(e) => {handleOnChange(e)}} required/>:
                         <input type="text" className="last-name" placeholder="Last Name *" name="last" onChange={(e) => {handleOnChange(e)}} style={{border:"1px solid red"}} required/>
                        }
                    </div>
                    <div className="email-container">
                        <input type="email" className="sign-up-email" placeholder="Email *" name="email" onChange={(e) => {handleOnChange(e)}} onBlur={() =>onEmailBlur()} required/>
                    </div>
                    {emailFound &&<p className="error">Email already exists</p>}
                    <div className="password-container">
                        {(anyError) ?
                        <>
                        <input type="password" className="password" placeholder="Password *" name="password"onChange={(e) => {handleOnChange(e)}} style={{border: "1px solid red"}} required/>
                        <input type="password" className="confirm-password" placeholder="Confirm Password *" name="confirm-password" onChange={(e) => {handleOnChange(e)}} style={{border: "1px solid red"}} required/>
                        </>
                        : <><input type="password" className="password" placeholder="Password *" name="password"onChange={(e) => {handleOnChange(e)}}  required/>
                        <input type="password" className="confirm-password" placeholder="Confirm Password *" name="confirm-password" onChange={(e) => {handleOnChange(e)}} required/>
                        </>
                        }</div>
                    {!password && <>
                        <p className="error">Passwords don't match</p>
                    </>
                    }
                    {!capital && <>
                    <p className="error">Password isn't capitalized</p>
                     </>}
                    
                    <div className="live-job-container">
                        <input type="text" className="live" placeholder="Where do you live?" name="live" onChange={(e) => {handleOnChange(e)}}/>
                        <input type="text" className="job" placeholder="What do you do for work?" name="job" onChange={(e) => {handleOnChange(e)}}/>
                    </div>
                    <div className="study-image-container">
                        <input type="text" className="study-sign-up" placeholder="Where do you study?" name="studies" onChange={(e) => {handleOnChange(e)}}/>
                    </div>
                    <div className="profile-picture">
                            <label htmlFor="image_url">Profile Picture</label>
                            <div className="image">
                            <input
                                type="file"
                                name="image_url"
                                accept="image/*"
                                onChange={(e) => {handleOnChange(e)}}
                            />
                            </div>
                        </div>
                        <div className="submit-container">
                            <input type="submit" className="sign-up-button"/>
                        </div>
                </form>
            </div>
        </div>
    )
}
export default SignUp