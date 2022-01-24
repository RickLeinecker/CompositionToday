import useLogout from '../../Helper/CustomHooks/useLogout';
// import { Button } from 'react-bootstrap';

import TopNavBar from '../TopNavBar';
import '../Showcase/ShowcaseStyle.scss';
import { Button } from '@mui/material';

export default function Home() {
    const { handleLogout } = useLogout();

    return (
        <>
            <TopNavBar />
            <div>
                Homepage
                <Button className='testbutton' style={{backgroundColor: 'red'}} onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </>
    )
}
