import React, { useRef } from 'react'
import { useAuthContext } from '../../FirebaseAuth/AuthContext';

const SignIn = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const psdRef = useRef<HTMLInputElement>(null);
    const { signInUser, resetPassword } = useAuthContext();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      const email = emailRef.current?.value;
      const password = psdRef.current?.value;
      if (email && password) signInUser(email, password);
  };

  // const forgotPasswordHandler = () => {
  //   const email = emailRef.current?.value;
  //   if (email)
  //     console.log(email)
  //     resetPassword(email).then(() => {
  //         if(emailRef.current)
  //           emailRef.current.value = "";
  //     });
  // };

    return (
        <>
            <div className="form-container sign-in-container">
                <form className="registration" onSubmit={handleSubmit}>
                    <h1 className="registration">Sign in</h1>
                    <input className="registration" type="email" placeholder="Email" ref={emailRef} />
                    <input className="registration" type="password" placeholder="Password"  ref={psdRef}/>
                    <a className="registration" href="/forgot-password">Forgot your password?</a>
                    <button className="registration" >Sign In</button>
                </form>
            </div>
        </>
    )
}
export default SignIn;