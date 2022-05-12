import { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from './FirebaseAuth/AuthContext';
import Home from './Pages/Home/Home';
import Blog from './Pages/Blog/Blog';
import RelatedProjects from './Pages/RelatedProjects/RelatedProjects';
import Showcase from './Pages/Showcase/Showcase';
import Registration from './Pages/Registration/Registration';
import EmailSent from './Pages/Registration/EmailSent';
import ForgotPassword from "./Pages/Registration/ForgotPassword";
import PrivateRoute from "./FirebaseAuth/PrivateRoute";
import Profile from "./Pages/Profile/Profile";
import TopNavBar from "./Pages/TopNavBar";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import ToAdmin from "./Pages/Admin/ToAdmin";
import GenericHandler from './Handlers/GenericHandler';
import { GenericHandlerType } from './ObjectInterface';
import LandingPage from "./Pages/LandingPage/LandingPage";

function PageRouter() {
	const { currentUser } = useAuthContext();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			const handlerObject: GenericHandlerType = {
				data: JSON.stringify({ uid: currentUser?.uid }),
				methodType: "POST",
				path: "isAdmin",
			}

			try {
				let answer = (await GenericHandler(handlerObject));
				if (answer.error.length > 0) {
					return;
				}

				return await answer.result;
			} catch (e: any) {
				console.error("Frontend Error: " + e);
			}

			return false;
		}

		async function checkIfAdmin() {
			setIsAdmin(await fetchData());
			// setIsAdmin(true);
		}

		checkIfAdmin();
	}, [currentUser])

	const location = useLocation();
	console.log("current user:", currentUser)
	console.log("location:", location.pathname)

	return (
		<>
			{
				location.pathname !== "/landing-page" &&
				location.pathname !== "/forgot-password" &&
				location.pathname !== "/email-sent" &&
				<TopNavBar isAdmin={isAdmin} currentUser={currentUser} />
			}
			<Routes>
				{
					isAdmin &&
					<Route element={<PrivateRoute isLogged={currentUser} />}>
						<Route path='/dashboard' element={<AdminDashboard />} />
					</Route>
				}

				<Route element={<PrivateRoute isLogged={currentUser} />}>
					<Route path='/' element={<Home />} />
				</Route>

				<Route path="/landing-page" element={currentUser ? <Navigate to="/" /> : <LandingPage/>} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/email-sent" element={<EmailSent />} />

				<Route element={<PrivateRoute isLogged={currentUser} />}>
					<Route path='/blog' element={<Blog />} />
				</Route>

				<Route element={<PrivateRoute isLogged={currentUser} />}>
					<Route path='/showcase' element={<Showcase />} />
				</Route>

				<Route element={<PrivateRoute isLogged={currentUser} />}>
					<Route path='/related-projects' element={<RelatedProjects />} />
				</Route>

				{/* Fail-safe */}
				{/* <Route path="/profile/" element={<Home />} />  */}

				<Route element={<PrivateRoute isLogged={currentUser} />}>
					<Route path='/profile/:username' element={<Profile />} />
				</Route>
				{
					isAdmin
						? <Route path='*' element={<ToAdmin />} />
						: (!currentUser || currentUser.isAnonymous)
							? <Route path='*' element={<LandingPage />} />
							: <Route element={<PrivateRoute isLogged={currentUser} />}>
								<Route path='*' element={<Home />} />
							</Route>
				}
			</Routes>
		</>
	);
}

export default PageRouter;