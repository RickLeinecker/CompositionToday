import './RegistrationStyle.scss';

export default function EmailSent() {

    return (
        <>
            <body className="registration">
                <section className="email" role="main">
                    <div className="title">
                        <h5>Check your inbox to sign in</h5>
                    </div>
                    <div id="email-sent-page">
                        <div className="image"></div>
                        <div className="setup-text">
                            <p>To complete setup and log in, click the verification link in the email we've sent to:</p>
                        </div>
                        <p className="confirm-email">uwu888@gmail.com</p> 
                        {/* ^ change to be current user's email */}
                    </div>
                        <div className="">
                            <button className="resend" type="button" >
                                <span id="resend">Resend verification email</span>
                            </button>
                            {/* onsubmit ^ resend new verification, have to set timer for no spam */}
                        </div>
                </section>
            </body>
        </>
    )
}