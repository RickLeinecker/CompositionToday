import React, { useRef, useState } from 'react'
import { useAuthContext } from '../../FirebaseAuth/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const psdRef = useRef<HTMLInputElement>(null);
    const { signUpUser } = useAuthContext();
    const navigate = useNavigate();
        
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const name = nameRef.current?.value;
        const password = psdRef.current?.value;
        console.log(email)
        console.log(name)
        if (email && password && name) {
            // try here        
            signUpUser(email, password, name);
            navigate('/email-sent', { state:{
                email: email,
                name: name
            }})
            // catch
        }
            
      };


    return (
        <>
            <div className="form-container sign-up-container">
                <form className="registration" onSubmit={handleSubmit}>
                    <h1 className="registration">Create Account</h1>
                    <input className="registration" type="text" placeholder="Name" ref={nameRef}/>
                    <input className="registration" type="email" placeholder="Email" ref={emailRef} />
                    <input id="password" className="registration" type="password" placeholder="Password" ref={psdRef} />
                    <button className="registration" >Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp;