import { MusicType } from '../../../ObjectInterface';
import ReactAudioPlayer from 'react-audio-player';
import { Divider } from '@mui/material';
import CardFooter from '../CardFooter';
import MusicCardHeader from './MusicCardHeader';
import { useState } from 'react';
import { Image } from 'react-bootstrap'
import Waveform from './Player/Waveform';


type Props = {
    music: MusicType;
    isMyProfile: boolean;
    notifyVirtualizer: () => void;
    notifyChange: () => void;
    clearCache: () => void;
}


export default function MusicCard({ music, isMyProfile, notifyVirtualizer, notifyChange, clearCache }: Props) {
    const {
        id,
        contentName,
        description,
        audioFilepath,
        sheetMusicFilepath,
        timestamp,
        contentText,
        username,
        profilePicPath,
        displayName,
        likeCount,
        isLikedByLoggedInUser,
        tagArray,
        imageFilepath,
        imageFilename,
    } = music;

    const [showMore, setShowMore] = useState(false);

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

            <div className="card-body" style={{ paddingBottom: "0%", display: "flex" }}>
                <div>
                    {imageFilepath ?
                        <div>
                            <Image src={imageFilepath} style={{ height: "auto", width: "auto", maxHeight: "30vh", maxWidth: "100%", overflow: "hidden", float: "left" }} />
                        </div>
                        :
                        <></>
                    }
                </div>

                <div style={{ marginLeft: "5%", display: "flex", flexDirection: "column", flexGrow: "1" }}>
                    <h5 className="card-title" style={{ margin: "0%" }}>{contentName}</h5>
                    <p className="card-text" style={{ margin: "0%" }}>{contentText}</p>
                    <p className="card-text-secondary" style={{ margin: "0%" }}>{(showMore || !description || description.length <= 250) ? description : description?.substring(0, 250) + "..."}</p>
                    <div style={{ float: "right" }}>
                        {(!showMore && description && description.length > 250) && <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => { setShowMore(true); clearCache(); notifyVirtualizer() }}>Show more</p>}
                        {(showMore && description && description.length > 250) && <p style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => { setShowMore(false); clearCache(); notifyVirtualizer() }}>Show less</p>}
                    </div>
                    {sheetMusicFilepath &&
                        <a href={sheetMusicFilepath} style={{textDecoration:"underline", color: "blue"}} target="_blank" rel="noreferrer">
                            Open sheet music
                        </a>
                    }
                    <div>
                        {audioFilepath &&
                            <>
                                {/* <ReactAudioPlayer
                                    src={audioFilepath}
                                    autoPlay={false}
                                    controls
                                /> */}
                                <Waveform url={audioFilepath} />
                            </>

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
