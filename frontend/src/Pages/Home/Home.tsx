import useLogout from '../../Helper/CustomHooks/useLogout';
// import { Button } from 'react-bootstrap';

import TopNavBar from '../TopNavBar';
import '../Showcase/ShowcaseStyle.scss';
import { Button } from '@mui/material';
import MusicCard from '../Profile/Music/MusicCard';

export default function Home() {
    const { handleLogout } = useLogout();

    return (
        <>
            <TopNavBar />
            <div>
                Homepage
                <MusicCard music={{
                    id: 0,
                    userID: 0,
                    contentText: '',
                    contentName: '',
                    timestamp: undefined,
                    audioFilepath: undefined,
                    audioFilename: undefined,
                    sheetMusicFilepath: undefined,
                    sheetMusicFilename: undefined,
                    description: undefined,
                    username: '',
                    profilePicPath: '',
                    displayName: ''
                }} isMyProfile={false} notifyChange={() => null}/>

            </div>
        </>
    )
}
