import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../FirebaseAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { auth } from "../../FirebaseAuth/firebase";
import { GenericHandlerType } from "../../ObjectInterface";
import GenericHandler from "../../Handlers/GenericHandler";
import { toast } from "react-toastify";

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const psdRef = useRef<HTMLInputElement>(null);
  const [errorText, setErrorText] = useState('');
  let errorFlag = false
  const { signUpUser } = useAuthContext();
  const navigate = useNavigate();

  const registerUserProfile = async (uid: string) => {
    const handlerObject: GenericHandlerType = {
      data: JSON.stringify({
        uid: uid,
        firstName: firstNameRef.current?.value!,
        lastName: lastNameRef.current?.value!,
        // userfirstName: '',
        email: emailRef.current?.value!,
        // isPublisher: true,
        // userProfileID: 0
      }),
      methodType: "POST",
      path: "create",
    };

    try {
      let answer = await GenericHandler(handlerObject);
      if (answer.error.length > 0) {
        toast.error("Failed to create profile");
        return;
      }
      toast.success("Profile created");
    } catch (e: any) {
      console.error("Frontend Error: " + e);
      toast.error("Failed to create experience");
    }
  };

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:3000",
    // This must be true.
    handleCodeInApp: true,
  };

  console.log("anything random")

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const password = psdRef.current?.value;

    console.log("enter 1")
    if (email && password && firstName && lastName) {
      
      const res = await signUpUser(email, password)
      console.log(res)
      switch (res){
        case "auth/email-already-in-use":
          setErrorText('Email is already in use.')
          errorFlag = true;
          break;
      case "auth/invalid-email":
          setErrorText('Email is not valid.')
          errorFlag = true;
          break;
      case "auth/weak-password":
          setErrorText('Password is too weak.')
          errorFlag = true;
          break;
      default:
          break;
      }
      console.log("after switch")
      
      if(!errorFlag){
        console.log("in if statement")

        registerUserProfile(res);
        sendSignInLinkToEmail(auth, email, actionCodeSettings);
        
        navigate("/email-sent", {
          state: {
            email: email,
            firstName: firstName,
            lastName: lastName,
          },
        });
      }

    }else{
      console.log("empty fields")
      setErrorText("Error: Some field(s) are empty");
    }
  };

  return (
    <>
      <div className="form-container sign-up-container">
        <form className="registration" onSubmit={(e) => {handleSubmit(e);return false}}>
          <h1 className="registration">Create Account</h1>
          <input
            className="registration"
            type="text"
            placeholder="First Name"
            ref={firstNameRef}
          />
          <input
            className="registration"
            type="text"
            placeholder="Last Name"
            ref={lastNameRef}
          />
          <input
            className="registration"
            type="email"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            id="password"
            className="registration"
            type="password"
            placeholder="Password"
            ref={psdRef}
          />
          <button className="registration">Sign Up</button>
          <p className="registration-error pink-text center-align" >{errorText}</p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
