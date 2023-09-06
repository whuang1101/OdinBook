import "../css/login.css"
import GithubLogo from "../assets/GithubLogo"
import FacebookLogo from "../assets/FacebookLogo"
import { motion } from "framer-motion"
import { useContext } from "react"
import { hostContext } from "./hostContext"
const Login = () => {
    const msg = useContext(hostContext);
    console.log(msg)
    return(
        <>
        <div className="login-page-background">
            <div className="login-screen">
                <div className="left-side">
                    <h1 className="title">OdinBook</h1>
                </div>
                <div className="right-side">
                    <div className="login">
                        <form className="login-form">
                            <input type="email" name="email" aria-label="email" className="email-login" placeholder="Email"/>
                            <input type="password" name="password" aria-label="password" className="password-login" placeholder="Password"/>
                            <input type="submit"  className="login-submit" value={"Log In"}/>
                            <div className="facebook-login">
                                <span>Or Login with</span>
                                <motion.span whileHover={{scale:1.2}}><FacebookLogo/></motion.span>
                            </div>
                        </form>
                        <div className="sign-up">
                            <button className="sign-up-button">Create an Account</button>
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