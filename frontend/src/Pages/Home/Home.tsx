import useLogout from '../../Helper/CustomHooks/useLogout';
import { Button } from 'react-bootstrap';
import TopNavBar from '../TopNavBar';

export default function Home() {
    const { handleLogout } = useLogout();

    return (
        <>
            <TopNavBar />
            <div>
                Homepage
                <Button variant="link" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </>
    )
}
