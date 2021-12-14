import Signup from './Pages/Login/Signup'
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container } from 'react-bootstrap';
import { AuthProvider } from './FirebaseAuth/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import PrivateRoute from './FirebaseAuth/PrivateRoute'
import Login from './Pages/Login/Login';
import ForgotPassword from './Pages/Login/ForgotPassword';
import Blog from './Pages/Blog/Blog';
import RelatedProjects from './Pages/RelatedProjects/RelatedProjects';
import Showcase from './Pages/Showcase/Showcase';
import MyProfile from './Pages/Profile/MyProfile';

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <PrivateRoute exact path="/blog" component={Blog} />
                        <PrivateRoute exact path="/showcase" component={Showcase} />
                        <PrivateRoute exact path="/related-projects" component={RelatedProjects} />
                        <PrivateRoute exact path="/my-profile" component={MyProfile}/>
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    )
}

export default App
