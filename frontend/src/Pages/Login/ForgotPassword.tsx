import { useRef, useState } from "react";
import "./RegistrationStyle.scss";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../FirebaseAuth/AuthContext";

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  let errorFlag = false;
  const { resetPassword } = useAuthContext();

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:3000",
    // This must be true.
    handleCodeInApp: true,
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    if (email) {
      console.log(email);
      const res:any = await resetPassword(email, actionCodeSettings);
      console.log(res);

      switch (res) {
        case "auth/invalid-email":
          setErrorText(() => "Email is invalid.");
          errorFlag = true;
          break;
        case "auth/user-not-found":
          setErrorText(() => "User with this email was not found.");
          errorFlag = true;
          break;
        default:
          break;
      }

      if (!errorFlag) {
        if (emailRef.current) emailRef.current.value = "";

        navigate("/email-sent", {
          state: {
            email: email,
            name: "friend",
            type: "forgot-pass",
          },
        });
      }
    } else {
      setErrorText("Please enter an email.");
    }
  };
  return (
    <>
      <main className="registration">
        <section className="forgot" role="main">
          <div className="title">
            <h5>Can't log in?</h5>
          </div>
          <form className="registration" id="form-reset-password-email">
            <label className="forgot-form-label">
              We'll send a recovery link to
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              className="registration"
              ref={emailRef}
            />
          </form>
          <button className="resend" type="button" onClick={handleSubmit}>
            <span id="resend">Send recovery link</span>
          </button>
          <p className="registration pink-text center-align">{errorText}</p>
          {/* onsubmit ^ resend new verification, have to set timer for no spam */}
        </section>
      </main>
    </>
  );
}