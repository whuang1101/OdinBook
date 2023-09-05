import "../css/login.css"
import GithubLogo from "../assets/GithubLogo"
import FacebookLogo from "../assets/FacebookLogo"
const Login = () => {
    return(
        <>
        <div className="login-page-background">
            <div className="login-screen">
                <div className="left-side">
                    <h1 className="title">fakebook</h1>
                </div>
                <div className="right-side">
                    <div className="login">
                        <form className="login-form">
                            <input type="email" name="email" aria-label="email" className="email-login" placeholder="Email"/>
                            <input type="password" name="password" aria-label="password" className="password-login" placeholder="Password"/>
                            <input type="submit"  className="login-submit" value={"Log In"}/>
                            <div className="facebook-login">
                                <span>Or Login with</span>
                                <FacebookLogo/>
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