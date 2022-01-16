import { Button } from 'react-bootstrap';
import TopNavBar from '../TopNavBar';
import useLogout from '../../Helper/CustomHooks/useLogout';
import { useAuthContext } from '../../FirebaseAuth/AuthContext';

export default function Home() {
    const { logoutUser} = useAuthContext();
    return (
        <>
            <TopNavBar />
            <div>
                Homepage
                <Button variant="link" onClick={logoutUser}>
                    Logout
                </Button>
            </div>
        </>
    )
}
