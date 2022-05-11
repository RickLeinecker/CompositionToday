import SignIn from "./SignIn";
import SignUp from "./Signup";
import './RegistrationStyle.scss';
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../FirebaseAuth/firebase'
import AnimatedBackground from "./AnimatedBackground";

export default function Registration() {
    const [currentUser, setCurrentUser] = useState({});
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return () => { };
    }, [])

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
            <div style={{position: "absolute", width: "2000px", height: "1000px"}}>
                <AnimatedBackground
                    name="ptsCanvasStyle"
                    background="#123"
                    play={true}
                />
            </div>
            <main className="registration">
                <div className="container registration" ref={container}>
                    <SignIn />
                    <SignUp />
                    <div className="overlayer-container registration">
                        <div className="overlayer">
                            <div className="overlayer-panel overlayer-left">
                                <h1 className="registration">Welcome Back!</h1>
                                <p className="registration">To keep connected with us please login with your personal info</p>
                                <button className="ghost registration" id="signIn" onClick={handleSignIn}>Sign In</button>
                            </div>
                            <div className="overlayer-panel overlayer-right">
                                <h1 className="registration">Hello, Friend!</h1>
                                <p className="registration">Enter your personal details and start your journey with us</p>
                                <button className="ghost registration" id="signUp" onClick={handleSignUp}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}