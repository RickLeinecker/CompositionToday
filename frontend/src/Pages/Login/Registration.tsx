import SignIn from "./SignIn";
import Signup from "./Signup";
import './RegistrationStyle.scss';
import { useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../FirebaseAuth/firebase'
import SignUp from "./Signup";

export default function Registration() {
    const [currentUser, setCurrentUser] = useState({});
    const container = useRef<HTMLDivElement>(null);

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser != null)
            setCurrentUser(currentUser);
    })
    const handleSignUp = () => {
        container?.current?.classList.add("right-panel-active");
    }

    const handleSignIn = () => {
        container?.current?.classList.remove("right-panel-active");
    }


    return (
        <>
            <main className="registration">
                <div className="container registration" ref={container}>
                    <SignIn />
                    <SignUp />
                    <div className="overlay-container registration">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="registration">Welcome Back!</h1>
                                <p className="registration">To keep connected with us please login with your personal info</p>
                                <button className="ghost registration" id="signIn" onClick={handleSignIn}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="registration">Hello, Friend!</h1>
                                <p className="registration">Enter your personal details and start journey with us</p>
                                <button className="ghost registration" id="signUp" onClick={handleSignUp}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}