import { useRef } from 'react';
import './RegistrationStyle.scss';



export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
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