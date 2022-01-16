import './RegistrationStyle.scss';

type Props = {
    registerEmail:string;
}

export default function ForgotPassword({registerEmail}: Props) {

    return (
        <>
            <main className="registration">
                <section className="forgot" role="main">
                    <div className="title">
                        <h5>Can't log in?</h5>
                    </div>
                    <form className="registration" id="form-reset-password-email">
                    <label className="forgot-form-label">We'll send a recovery link to</label>
                    <input name="email" id="email" type="email" placeholder="Enter email" className="registration" value=""/>
                    </form>
                    <button className="resend" type="button" >
                        <span id="resend">Send recovery link</span>
                    </button>
                    {/* onsubmit ^ resend new verification, have to set timer for no spam */}
                </section>
            </main>
        </>
    )
}