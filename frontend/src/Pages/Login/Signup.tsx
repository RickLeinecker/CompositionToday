import { Link, useHistory } from 'react-router-dom'
import { auth } from '../../FirebaseAuth/firebase'
import { createUserWithEmailAndPassword, sendSignInLinkToEmail } from "firebase/auth";
import React from 'react'

export default function Signup() {
    
    const [registerEmail, setRegisterEmail] = React.useState('');
    const [registerPassword, setRegisterPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const history = useHistory()

    const signUp = async () => {
        try{

            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword 
                );
            console.log(user)
        }catch(error:unknown)
        {
            if(error instanceof Error)
                console.log(error.message);
        }

    };

    return (
        <>
            <div className="form-container sign-up-container">
                <form className="registration">
                    <h1 className="registration">Create Account</h1>
                    <input className="registration" onChange={(e) => setName(e.target.value)} value = {name} 
                    type="text" placeholder="Name"/>
                    <input className="registration" onChange={(e) => setRegisterEmail(e.target.value)} value = {registerEmail} 
                    type="email" placeholder="Email" />

                    <input id="password" className="registration" onChange={(e) => setRegisterPassword(e.target.value)} value = {registerPassword} 
                    type="password" placeholder="Password" />
                    <button className="registration" onClick={signUp}>Sign Up</button>
                </form>
            </div>
        </>
    )
}