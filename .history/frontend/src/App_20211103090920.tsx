import Signup from './Signup'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';

function App() {
  return(
    <Container className="d-flex align-items-center
    justify-content-center" style = {{minHeight:"100vh"}}>
      <Signup/>
    </Container> 
  )
}

export default App
