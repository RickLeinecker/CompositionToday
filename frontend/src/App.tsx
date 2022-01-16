
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from 'react-bootstrap';
import { AuthProvider } from './FirebaseAuth/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import PrivateRoute from './FirebaseAuth/PrivateRoute'
import Blog from './Pages/Blog/Blog';
import RelatedProjects from './Pages/RelatedProjects/RelatedProjects';
import Showcase from './Pages/Showcase/Showcase';
import MyProfile from './Pages/Profile/MyProfile';
import { ToastContainer } from 'react-toastify';
import Registration from './Pages/Login/Registration';
import EmailSent from './Pages/Login/EmailSent';
import ForgotPassword from "./Pages/Login/ForgotPassword";

function App() {
    
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/registration" component={Registration} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <Route path="/email-sent" component={EmailSent} />
                        <PrivateRoute exact path="/blog" component={Blog} />
                        <PrivateRoute exact path="/showcase" component={Showcase} />
                        <PrivateRoute exact path="/related-projects" component={RelatedProjects} />
                        <PrivateRoute exact path="/my-profile" component={MyProfile} props={{userID: 0}}/>
                    </Switch>
                </AuthProvider>
            </Router>

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

export default App
