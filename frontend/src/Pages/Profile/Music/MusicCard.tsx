import { MusicType } from '../../../ObjectInterface';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import EditMusicModal from './EditMusicModal';
import ReactAudioPlayer from 'react-audio-player';
import { Image } from 'react-bootstrap'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import { Link } from 'react-router-dom';
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu';
import moment from 'moment';

type Props = {
    music: MusicType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function MusicCard({ music, isMyProfile, notifyChange }: Props) {
    const { id, contentName, description, audioFilepath, sheetMusicFilepath, timestamp, contentText, username, profilePicPath, displayName} = music;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    return (
        <div className="card">
            <div className="card-icons" style={{display: "flex"}}>
                <p className="card-text-secondary">
                    {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                </p>
                {isMyProfile &&
                    <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit}/>
                }
            </div>
   
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
            
            <div className="card-body">
                
                <Link to={`/profile/${username}`} style={{textDecoration: 'none'}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{float: "left"}} roundedCircle/>
                        <h5 className="card-title" style={{marginLeft:"2%"}}>{displayName}</h5>
                    </div>
                </Link>
                <hr/>
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                {id}
                {sheetMusicFilepath}
                
                {sheetMusicFilepath && 
                    <a href={sheetMusicFilepath} target="_blank" rel="noreferrer">
                        Open sheet music
                    </a>
                }
                {audioFilepath}
                {audioFilepath && 
                    <ReactAudioPlayer
                        src={audioFilepath}
                        autoPlay={false}
                        controls
                    /> 
                }
            </div>
        </div>
    )
}
