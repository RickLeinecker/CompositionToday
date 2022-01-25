import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../../FirebaseAuth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../../FirebaseAuth/firebase';
import { GenericHandlerType } from '../../ObjectInterface';
import GenericHandler from '../../Handlers/GenericHandler';
import { toast } from 'react-toastify';

const SignUp = () => {

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const psdRef = useRef<HTMLInputElement>(null);
    const { signUpUser } = useAuthContext();
    const navigate = useNavigate();
    const [uid, setUid] = useState<string|undefined>('');

    const registerUserProfile = useCallback(async () => {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: uid,
                firstName: nameRef.current?.value!,
                // lastName: '',
                // username: '',
                email: emailRef.current?.value!,
                // isPublisher: true,
                // userProfileID: 0
            }),
            methodType: "POST",
            path: "createUser",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create profile');
                return;
            }
            toast.success('Profile created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create experience');
        }
    },[uid])

    useEffect(() => {
        registerUserProfile()
        sendPasswordResetEmail(auth, emailRef.current?.value!)
    },[uid, registerUserProfile])

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const email = emailRef.current?.value;
        const name = nameRef.current?.value;
        const password = psdRef.current?.value;
        if (email && password && name) {
            // try here 
            setUid(signUpUser(email, password, name ))
            // signUpUser(email, password, name).then(registerUserProfile()).then(sendPasswordResetEmail(auth, email))
            // .catch((e: any) => {console.log(e)})

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