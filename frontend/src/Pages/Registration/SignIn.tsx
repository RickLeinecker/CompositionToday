import { useRef, useState } from "react";
import { useAuthContext } from "../../FirebaseAuth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { GenericHandlerType } from "../../ObjectInterface";
import GenericHandler from '../../Handlers/GenericHandler'


const SignIn = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const psdRef = useRef<HTMLInputElement>(null);
	const { signInUser } = useAuthContext();
	const navigate = useNavigate();
	const { signInGuest } = useAuthContext();
	const [errorText, setErrorText] = useState("");
	let errorFlag = false;

	async function fetchUser(currentUid: string) {
		const handlerObject: GenericHandlerType = {
			data: JSON.stringify({ uid: currentUid }),
			methodType: "POST",
			path: "getLoggedInUser",
		}

		try {
			let answer = (await GenericHandler(handlerObject));
			if (answer.error.length > 0) {
				return;
			}

			const result = await answer.result;
			window.localStorage.setItem('username', result.username);

		} catch (e: any) {
			console.error("Frontend Error: " + e);
		}

	}
	
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const email = emailRef.current?.value;
		const password = psdRef.current?.value;
		if (email && password) {
			const res = await signInUser(email, password);
			console.log(res);

			switch (res) {
				case "auth/invalid-email":
					setErrorText(() => "This email is invalid.");
					errorFlag = true;
					break;
				case "auth/user-not-found":
					setErrorText(() => "User with this email was not found.");
					errorFlag = true;
					break;
				case "auth/wrong-password":
					setErrorText(() => "Password is incorrect.");
					errorFlag = true;
					break;
				case "auth/user-disabled":
					setErrorText(() => "User account with this email was disabled.");
					errorFlag = true;
					break;
				// custom auth error code
				case "auth/email-not-verified":
					setErrorText(() => "The email for this account is not yet verified.");
					errorFlag = true;
					break;
				default:
					break;
			}

			if (!errorFlag) {
				await fetchUser(res.user.uid);
				navigate("/");
			}
		} else {
			console.log("empty fields");
			setErrorText("Some field(s) are empty");
		}
	};

	const handleClick = async (e : any) => {
		await signInGuest();
		navigate("/")
	}

	return (
		<>
			<div className="form-container sign-in-container">
				<form className="registration" onSubmit={handleSubmit}>
					<h1 className="registration">Sign in</h1>
					<input
						className="registration"
						type="email"
						placeholder="Email"
						ref={emailRef}
					/>
					<input
						className="registration"
						type="password"
						placeholder="Password"
						ref={psdRef}
					/>
					<Link className="registration" to="/forgot-password">
						Forgot your password?
					</Link>
					<button className="registration sign-in-button">Sign In</button>
					<div className="link-container">
						<Link className="registration" to="#" onClick={handleClick}>
							Guest sign in
						</Link>
					</div>
					<p className="registration-error pink-text center-align">
						{errorText}
					</p>
				</form>
			</div>
		</>
	);
};
export default SignIn;

