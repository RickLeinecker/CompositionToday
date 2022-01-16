import SignIn from "./SignIn";
import Signup from "./Signup";
import './RegistrationStyle.scss';
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../FirebaseAuth/firebase'

export default function Registration() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    const [currentUser, setCurrentUser] = useState({});
    onAuthStateChanged(auth,(currentUser) =>{
        if(currentUser != null)
            setCurrentUser(currentUser);
    })

    signUpButton?.addEventListener('click', () => {
        container?.classList.add("right-panel-active");
        console.log("first")
    });

    signInButton?.addEventListener('click', () => {
        container?.classList.remove("right-panel-active");
        console.log("second")
    });

    return(
        <>
            <main className="registration">
                <div className="container registration" >
                    <SignIn/>
                    <Signup/>
                    <div className="overlay-container registration">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="registration">Welcome Back!</h1>
                                <p className="registration">To keep connected with us please login with your personal info</p>
                                <button className="ghost registration" id="signIn">Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="registration">Hello, Friend!</h1>
                                <p className="registration">Enter your personal details and start journey with us</p>
                                <button className="ghost registration" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )

}