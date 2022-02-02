import TopNavBar from '../TopNavBar';
import '../Showcase/ShowcaseStyle.scss';
import { Button } from 'react-bootstrap'
import MusicCard from '../Profile/Music/MusicCard';
import { useAuthContext } from '../../FirebaseAuth/AuthContext';

export default function Home() {
    const { logoutUser} = useAuthContext();
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

                <Button className='testbutton' style={{backgroundColor: 'red'}} variant="link" onClick={logoutUser}>
                    Logout
                </Button>
            </div>
        </>
    )
}
