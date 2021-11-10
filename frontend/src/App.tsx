import Signup from './Signup'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home';
import PrivateRoute from './PrivateRoute'
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Blog from './Blog';
import RelatedProjects from './RelatedProjects';
import Showcase from './Showcase';
import MyProfile from './MyProfile';

function App() {
  return(    
    <Container className="d-flex align-items-center 
    justify-content-center" style = {{minHeight:"100vh"}}>
      <div className="w-100" style={{maxWidth:"400px"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Home}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/forgot-password" component={ForgotPassword}/>
              <PrivateRoute exact path="/blog" component={Blog}/>
              <PrivateRoute exact path="/showcase" component={Showcase}/>
              <PrivateRoute exact path="/related-projects" component={RelatedProjects}/>
              <PrivateRoute exact path="/my-profile" component={MyProfile}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container> 
  )
}

export default App
