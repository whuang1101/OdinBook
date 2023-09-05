import "../css/login.css"

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
                        </form>
                        <div className="sign-up"></div>
                    </div>
                    
                </div>
            </div>
            <div className="github-mention">
            </div>
        </div></>
    )
}

export default Login