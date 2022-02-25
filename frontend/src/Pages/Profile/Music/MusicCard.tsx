import { MusicType } from '../../../ObjectInterface';
import ReactAudioPlayer from 'react-audio-player';
import { Divider } from '@mui/material';
import CardFooter from '../CardFooter';
import MusicCardHeader from './MusicCardHeader';


type Props = {
    music: MusicType;
    isMyProfile: boolean;
    notifyVirtualizer: () => void;
    notifyChange: () => void;
    clearCache: () => void;
}


export default function MusicCard({ music, isMyProfile, notifyVirtualizer, notifyChange, clearCache }: Props) {
    const { id, contentName, description, audioFilepath, sheetMusicFilepath, timestamp, contentText, username, profilePicPath, displayName, likeCount, isLikedByLoggedInUser } = music;

    // Cleanup function gets called when component is unmounted
    // off the virtualized window.
    // useEffect(() => {
    //     console.log("remounted")
    //     return () => {
    //         // clearCache();
    //         setIsCommentsOpen(false);
    //         console.log("unmounted");
    //         vRef?.current?.recomputeRowHeights(1);
    //         vRef?.current?.forceUpdateGrid();
    //     };
    // }, [])

    return (
        <div className="card">
            <MusicCardHeader music={music} isMyProfile={false} notifyChange={notifyChange} />

            <Divider variant="fullWidth" component="div" sx={{ margin: "0.5% auto", width: "95%" }} />

            <div className="card-body" style={{ paddingBottom: "0%" }}>
                <div style={{ display: "flex", margin: "0 0" }}>
                    <div style={{ flex: "1 0 0" }}>
                        <h5 className="card-title">{contentName}</h5>
                        <p className="card-text">{contentText}</p>
                        <p className="card-text">{description}</p>
                        {sheetMusicFilepath &&
                            <a href={sheetMusicFilepath} target="_blank" rel="noreferrer">
                                Open sheet music
                            </a>
                        }
                        {audioFilepath &&
                            <ReactAudioPlayer
                                src={audioFilepath}
                                autoPlay={false}
                                controls
                            />
                        }
                    </div>
                </div>    
            </div>

            <Divider variant="fullWidth" component="div" sx={{ margin: "1% auto", width: "95%" }} />

            <div>
                <CardFooter
                    clearCache={clearCache}
                    notifyVirtualizer={notifyVirtualizer}
                    notifyChange={notifyChange}
                    id={id}
                    likeCount={likeCount}
                    isLikedByLoggedInUser={isLikedByLoggedInUser}
                />
            </div>

        </div>
    )
}
