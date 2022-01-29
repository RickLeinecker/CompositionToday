import { Button } from 'react-bootstrap';
import TopNavBar from '../TopNavBar';
import { useAuthContext } from '../../FirebaseAuth/AuthContext';

export default function Home() {
    const { logoutUser} = useAuthContext();
    return (
        <>
            <TopNavBar />
            <div>
                Homepage
                <Button className='testbutton' style={{backgroundColor: 'red'}} variant="link" onClick={logoutUser}>
                    Logout
                </Button>
            </div>
        </>
    )
}
