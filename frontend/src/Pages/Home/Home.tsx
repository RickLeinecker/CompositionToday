import TopNavBar from '../TopNavBar';
import '../Showcase/ShowcaseStyle.scss';
import { Button } from 'react-bootstrap'
import MusicCard from '../Profile/Music/MusicCard';
import { useAuthContext } from '../../FirebaseAuth/AuthContext';
import { ProfileContext } from '../Profile/ProfileContext';
import { useContext } from 'react';

export default function Home() {
    const { logoutUser} = useAuthContext();
    const { isMyProfile } = useContext(ProfileContext); 
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
                    username: 'neo',
                    profilePicPath: '',
                    displayName: ''
                }} isMyProfile={isMyProfile} notifyChange={() => null}/>

                <Button className='testbutton' style={{backgroundColor: 'red'}} variant="link" onClick={logoutUser}>
                    Logout
                </Button>
            </div>
        </>
    )
}
