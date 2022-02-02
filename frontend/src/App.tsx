import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from 'react-bootstrap';
import { AuthProvider, useAuthContext } from './FirebaseAuth/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Blog from './Pages/Blog/Blog';
import RelatedProjects from './Pages/RelatedProjects/RelatedProjects';
import Showcase from './Pages/Showcase/Showcase';
import MyProfile from './Pages/Profile/MyProfile';
import { ToastContainer } from 'react-toastify';
import Registration from './Pages/Registration/Registration';
import EmailSent from './Pages/Registration/EmailSent';
import ForgotPassword from "./Pages/Registration/ForgotPassword";
import { useState } from "react";
import PrivateRoute from "./FirebaseAuth/PrivateRoute";

function App(this: any) {
    
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');

    const { currentUser } = useAuthContext();

    return (
        <>
            <Routes>
                <Route element={<PrivateRoute isLogged={currentUser} />}>
                    <Route path = '/' element={<Home/>}/>
                </Route>

                <Route path="/registration" element={<Registration/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/email-sent" element={<EmailSent/>} />

                <Route element={<PrivateRoute isLogged={currentUser} />}>
                    <Route path ='/blog' element={<Blog/>} />
                </Route>

                <Route element={<PrivateRoute isLogged={currentUser} />}>
                    <Route path ='/showcase' element={<Showcase/>}/>
                </Route>

                <Route element={<PrivateRoute isLogged={currentUser} />}>
                    <Route path ='/related-projects' element={<RelatedProjects/>}/>
                </Route>

                <Route element={<PrivateRoute isLogged={currentUser} />}>
                    <Route path ='/my-profile/:username' element={<MyProfile/>}/>
                </Route>
                <Route path="*" element={<Registration/>} />
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