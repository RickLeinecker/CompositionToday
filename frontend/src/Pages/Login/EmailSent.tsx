import { useLocation } from 'react-router-dom';
import './RegistrationStyle.scss';
import { sendPasswordResetEmail, sendSignInLinkToEmail } from 'firebase/auth';
import {auth} from '../../FirebaseAuth/firebase';

export default function EmailSent(props:any){
    const location:any = useLocation();
    const email = location.state.email;
    const name = location.state.username;
    const type = location.state.type;

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: "http://localhost:3000",
        // This must be true.
        handleCodeInApp: true,
      };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        if(type === "sign-up")
            sendSignInLinkToEmail(auth, email, actionCodeSettings);
        if(type === 'forgot-pass')
            sendPasswordResetEmail(auth, email)
    }
    return (
        <>
            <main className="registration">
                <section className="email" role="main">
                    <div className="title">
                        <h5>Hello {name}! Check your inbox to sign in</h5>
                    </div>
                    <div id="email-sent-page">
                        <div className="image"></div>
                        <div className="setup-text">
                            <p>To complete setup and log in, click the verification link in the email we've sent to:</p>
                        </div>
                        <p className="confirm-email"> {email} </p> 
                        {/* ^ change to be current user's email */}
                    </div>
                        <div className="">
                            <button className="resend" type="button" onClick={handleSubmit}>
                                <span id="resend">Resend verification email</span>
                            </button>
                            {/* onsubmit ^ resend new verification, have to set timer for no spam */}
                        </div>
                </section>
            </main>
        </>
    )
}