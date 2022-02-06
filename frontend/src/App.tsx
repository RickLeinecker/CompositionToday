import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthContext } from './FirebaseAuth/AuthContext';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Blog from './Pages/Blog/Blog';
import RelatedProjects from './Pages/RelatedProjects/RelatedProjects';
import Showcase from './Pages/Showcase/Showcase';
import { ToastContainer } from 'react-toastify';
import Registration from './Pages/Registration/Registration';
import EmailSent from './Pages/Registration/EmailSent';
import ForgotPassword from "./Pages/Registration/ForgotPassword";
import PrivateRoute from "./FirebaseAuth/PrivateRoute";
import Profile from "./Pages/Profile/Profile";
import TopNavBar from "./Pages/TopNavBar";

function App(this: any) {
    const { currentUser } = useAuthContext();

    return (
        <>  
            <TopNavBar></TopNavBar>
            <Routes>
                <Route element={<PrivateRoute isLogged={currentUser} />}>
                    <Route path='/' element={<Home />} />
                </Route>

                <Route path="/registration" element={<Registration />} />
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

                <Route element={<PrivateRoute isLogged={currentUser} />}>
                    <Route path='/profile/:username' element={<Profile />} />
                </Route>
                <Route path="*" element={<Registration />} />
            </Routes>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
export default App;