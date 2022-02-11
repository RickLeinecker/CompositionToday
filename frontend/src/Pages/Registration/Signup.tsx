import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../FirebaseAuth/AuthContext";
import { useNavigate } from "react-router-dom";
import { sendSignInLinkToEmail, sendEmailVerification } from "firebase/auth";
import { auth } from "../../FirebaseAuth/firebase";
import { GenericHandlerType } from "../../ObjectInterface";
import GenericHandler from "../../Handlers/GenericHandler";
import { toast } from "react-toastify";

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const psdRef = useRef<HTMLInputElement>(null);
  const [errorText, setErrorText] = useState("");
  let errorFlag = false;
  const { signUpUser } = useAuthContext();
  const navigate = useNavigate();

  // TODO: url needs to change when in production
  const actionCodeSettings = {
    url: "http://localhost:3000/registration",
    // This must be true.
    handleCodeInApp: true,
  };

  // checks if username is already in use
  const checkUsername = async (username: string) => {
    const handlerObject: GenericHandlerType = {
      data: JSON.stringify({
        username: username,
      }),
      methodType: "POST",
      path: "readUserByUsername",
    };

    try {
      let answer = await GenericHandler(handlerObject);
      if (answer.error.length > 0) {
        toast.success("Username is valid");
        return answer;
      }
      toast.error("User with this name already exists");
      return answer;
    } catch (e: any) {
      console.error("Frontend Error: " + e);
      toast.error("Failed to create user.");
    }
  };

  // makes API call to backend and creates a new User
  const registerUserProfile = async (uid: string) => {
    const handlerObject: GenericHandlerType = {
      data: JSON.stringify({
        uid: uid,
        username: usernameRef.current?.value!,
        email: emailRef.current?.value!,
      }),
      methodType: "POST",
      path: "createUser",
    };

    try {
      let answer = await GenericHandler(handlerObject);
      if (answer.error.length > 0) {
        toast.error("Failed to create user.");
        return answer;
      }
      toast.success("User created");
      return answer;
    } catch (e: any) {
      console.error("Frontend Error: " + e);
      toast.error("Failed to create user.");
    }
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorText(() => "");

    const email = emailRef.current?.value;
    const username = usernameRef.current?.value;
    const password = psdRef.current?.value;

    if (email && password && username) {

      const answer = await checkUsername(username);
      const res = "";

      if (answer.error.length == 0) {
        setErrorText(() => "Username is already in use.");
        errorFlag = true;
        return;
      }


      if (!errorFlag) {
        const res = await signUpUser(email, password);

        switch (res as any) {
          case "Username is already in use.":
            setErrorText(() => "Username is already in use.");
            errorFlag = true;
            return;
          case "auth/email-already-in-use":
            setErrorText(() => "Email is already in use.");
            errorFlag = true;
            return;
          case "auth/invalid-email":
            setErrorText(() => "Email is not valid.");
            errorFlag = true;
            return;
          case "auth/weak-password":
            setErrorText(() => "Password is too weak.");
            errorFlag = true;
            return;
          default:
            break;
        }

        if (!errorFlag) {
          await sendEmailVerification(auth.currentUser!, actionCodeSettings);

          const answer = await registerUserProfile(res.user.uid);
          if (answer.error.length > 0) {
            setErrorText(() => "Failed to create user.");
            errorFlag = true;
          }
        }
      }

      if (!errorFlag) {
        // auth will get a user from signUpUser iff correct
        navigate("/email-sent", {
          state: {
            email: email,
            username: username,
            type: "sign-up",
          },
        });
      }
    } else {
      setErrorText("Some field(s) are empty");
    }
  };

  return (
    <>
      <div className="form-container sign-up-container">
        <form className="registration" onSubmit={handleSubmit}>
          <h1 className="registration">Create Account</h1>
          <input
            className="registration"
            type="text"
            placeholder="Username"
            ref={usernameRef}
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
          <p className="registration-error pink-text center-align">
            {errorText}
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
