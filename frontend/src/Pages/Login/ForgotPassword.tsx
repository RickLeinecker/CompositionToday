import { sendPasswordResetEmail } from 'firebase/auth';
import { useRef } from 'react';
import './RegistrationStyle.scss';
import {auth} from '../../FirebaseAuth/firebase';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

    const email = emailRef.current?.value;
    if (email){

          console.log(email)
          sendPasswordResetEmail(auth, email).then(() => {
                  if(emailRef.current)
                    emailRef.current.value = "";
            })
            navigate('/email-sent', { state:{
                email: email,
                name: 'friend',
                type: 'forgot-pass'
            }})
        }
    }
    return (
        <>
            <main className="registration">
                <section className="forgot" role="main">
                    <div className="title">
                        <h5>Can't log in?</h5>
                    </div>
                    <form className="registration" id="form-reset-password-email">
                        <label className="forgot-form-label">We'll send a recovery link to</label>
                        <input name="email"  type="email" placeholder="Enter email" className="registration" ref={emailRef}/>
                    </form>
                    <button className="resend" type="button" onClick={handleSubmit}>
                        <span id="resend">Send recovery link</span>
                    </button>
                    {/* onsubmit ^ resend new verification, have to set timer for no spam */}
                </section>
            </main>
        </>
    )
}