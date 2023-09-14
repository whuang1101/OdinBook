import "../css/login.css"
import GithubLogo from "../assets/GithubLogo"
import FacebookLogo from "../assets/FacebookLogo"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../redux/userSlice"
import SignUp from "./SignUp"
import { useState } from "react"
import Notification from "./Notification";
const Login = ({setUser}) => {
    const [loginCredentials, setLoginCredentials] = useState({email: "",
    password: ""})
    const [notification, setNotification] = useState({
        status: false,
        content: ""
    });
    const host = useSelector(state => state.host)
    const dispatch = useDispatch();
    const [signUpModal, setSignUpModal] = useState(false);
    const [error, setError] = useState(false)
    const handleFacebookEnter = (e) => {
        if(e.key === "Enter"){
            window.open(`${host}/auth/facebook/callback`,"_self")
        }
    }
    const login = (e) => {
        e.preventDefault();
        fetch(`${host}/auth/local`,{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username:loginCredentials.email.toLowerCase(), password: loginCredentials.password})
        }).then(
            response => {
                if(response.ok) {
                    return response.json();
                }
            }
        ).then (
            data => {
                if(data !== undefined){
                dispatch(updateUser(data));
                setUser(true);
                localStorage.setItem("userData", JSON.stringify(data));
            }
            else{
                setError(true);
            }
              }
        )
    }
    const demoLogin = (e) => {
        e.preventDefault();
        fetch(`${host}/auth/local`,{
            method:"POST",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username:"joebob1@gmail.com", password: "Abcd1234"})
        }).then(
            response => {
                if(response.ok) {
                    return response.json();
                }
            }
        ).then (
            data => {
                if(data !== undefined){
                dispatch(updateUser(data));
                setUser(true);
                localStorage.setItem("userData", JSON.stringify(data));
            }
            else{
                setError(true);
            }
              }
        )
    }
    const handleLoginCredentials = (e, name) => {
        if(name === "email"){
            const credentials = {...loginCredentials, 
            email: e.target.value}
            setLoginCredentials(credentials)
        }
        else{
            const credentials = {...loginCredentials, 
            password: e.target.value}
            setLoginCredentials(credentials)
        }
    }
    return(
        <>
        <div className="login-page-background">
            {notification.status &&
                <Notification content={notification.content}/>
                }
            {signUpModal &&
            <SignUp setSignUpModal={setSignUpModal} setNotification={setNotification}/>}
            <div className="login-screen">
                <div className="left-side">
                    <h1 className="title">OdinBook</h1>
                </div>
                <div className="right-side">
                    <div className="login">
                        <form className="login-form" onSubmit={(e) => login(e)}>
                            <input type="email" name="email" aria-label="Enter Email:" className="email-login" placeholder="Email" onChange={(e) => handleLoginCredentials(e, "email")} value={loginCredentials.email}/>
                            <input type="password" name="password" aria-label="Enter Password:" className="password-login" placeholder="Password" onChange={(e) => handleLoginCredentials(e, "password")}value={loginCredentials.password} />
                            <input type="submit"  className="login-submit" value={"Log In"}/>
                            {error && <div className="error">Either Email or Password is wrong!</div>}
                            <div className="facebook-login">
                                <span>Or Login with</span>
                                <motion.span whileHover={{scale:1.1}}  whileTap={{scale: .9}} onKeyDown={(e) => handleFacebookEnter(e)}><FacebookLogo/></motion.span>
                            </div>
                        </form>
                        <div className="sign-up">
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}} className="sign-up-button"
                            onClick={() => setSignUpModal(true)}>Create an Account</motion.button>
                            <motion.button whileHover={{scale:1.1}} whileTap={{scale: .9}} className="sign-up-button"
                            onClick={(e) => demoLogin(e)}>Try a Demo Account</motion.button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="github-mention">
                <GithubLogo style={{width: "1em"}}/>
                <div className="Creator">Created by @whuang1101</div>
            </div>
        </div></>
    )
}

export default Login