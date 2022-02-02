import { MusicType } from '../../../ObjectInterface';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMusicModal from './EditMusicModal';
import ReactAudioPlayer from 'react-audio-player';
import { useState } from 'react';
import { Image } from 'react-bootstrap'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import { Link } from 'react-router-dom';

type Props = {
    music: MusicType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function MusicCard({ music, isMyProfile, notifyChange }: Props) {
    const { id, contentName, description, audioFilepath, sheetMusicFilepath, timestamp, contentText, username, profilePicPath, displayName} = music;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const[showOptions, setShowOptions] = useState<boolean>(false);

    return (
        <div className="card" onMouseOver={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>
            {isMyProfile && showOptions &&
                <>
                    <div className="card-icons">
                        <EditIcon onClick={handleOpenEdit}/> 
                        <DeleteIcon onClick={handleOpenDelete}/>
                    </div>
                </>
            }
   
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
                
                <Link to="/my-profile">
                    <div style={{marginBottom: "3%", display: "flex", alignItems: "center"}}>
                        <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{float: "left"}} roundedCircle/>
                        <h5 className="card-title" style={{marginLeft:"2%"}}>{displayName}</h5>
                    </div>
                </Link>
                
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
    )
}
