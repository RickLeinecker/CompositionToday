import { MusicType } from '../../../ObjectInterface';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import EditMusicModal from './EditMusicModal';
import ReactAudioPlayer from 'react-audio-player';
import { Image } from 'react-bootstrap'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import { Link } from 'react-router-dom';
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu';
import moment from 'moment';
import GenericLike from '../../../Helper/Generics/GenericLike';
import { Divider } from '@mui/material';
import CommentSection from '../../Comments/CommentSection';
import { useEffect, useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { List } from 'react-virtualized';


type Props = {
    music: MusicType;
    isMyProfile: boolean;
    notifyVirtualizer: () => void;
    notifyChange: () => void;
    clearCache: () => void;
}


export default function MusicCard({ music, isMyProfile, notifyVirtualizer, notifyChange, clearCache }: Props) {
    const { id, contentName, description, audioFilepath, sheetMusicFilepath, timestamp, contentText, username, profilePicPath, displayName, likeCount, isLikedByLoggedInUser } = music;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        let temp = window.sessionStorage.getItem("username");

        setCurrentUsername(!temp ? "" : temp);
    }, [])


    const handleCommentExpand = () => {
        setIsCommentsOpen(prev => !prev);
        clearCache();
        notifyVirtualizer();
    }

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
            <div style={{ display: "flex"}}>
                <Link to={`/profile/${username}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: "flex", alignItems: "center", margin: "2%"}}>
                        <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{ float: "left" }} roundedCircle />
                        <h5 className="card-title" style={{ marginLeft: "2%" }}>{displayName}</h5>
                    </div>
                </Link>

                <div className="card-icons">
                    <div style={{ display: "flex" }}>
                        <p className="card-text-secondary">
                            {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                        </p>
                        {(isMyProfile || username === currentUsername) &&
                            <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit} />
                        }
                    </div>
                </div>
            </div>

            <Divider variant="fullWidth" component="div" sx={{ margin: "0.5% auto", width: "95%" }} />

            <GenericDeleteModal
                contentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"Music"}
            />

            <EditMusicModal
                music={music}
                notifyChange={notifyChange}
                editOpen={editOpen}
                handleCloseEdit={handleCloseEdit}
            />

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

            <div style={{ cursor: "pointer", float: "right", marginBottom: "-1%" }}>
                {isCommentsOpen ?
                    <div style={{ float: "right" }} onClick={handleCommentExpand}>
                        <ChatBubbleIcon />
                        <ArrowDropDownIcon />
                    </div>
                    :
                    <div style={{ float: "right" }} onClick={handleCommentExpand}>
                        <ChatBubbleOutlineIcon />
                        <ArrowDropUpIcon />
                    </div>
                }
                <GenericLike contentID={music.id} likeCount={likeCount} isLikedByLoggedInUser={isLikedByLoggedInUser} />
            </div>

            <div>
                {isCommentsOpen ? <CommentSection contentID={music.id} notifyParent={notifyChange} clearCache={clearCache} /> : <></>}
            </div>

        </div>
    )
}
