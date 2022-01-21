import { MusicType } from '../../../ObjectInterface';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import EditMusicModal from './EditMusicModal';
import DeleteMusicModal from './DeleteMusicModal';

type Props = {
    music: MusicType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function MusicCard({ music, isMyProfile, notifyChange }: Props) {
    const { id, contentName, description, audioFilepath, sheetMusicFilepath, timestamp, contentText } = music;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    return (
        <div className="card">
            {isMyProfile && 
                <>
                    <div className="card-icons">
                        <EditIcon onClick={handleOpenEdit}/> 
                        <DeleteIcon onClick={handleOpenDelete}/>
                    </div>

                    <DeleteMusicModal
                    contentID={id}
                    notifyChange={notifyChange} 
                    deleteOpen={deleteOpen}
                    handleCloseDelete={handleCloseDelete}
                    />

                    <EditMusicModal
                        music={music}
                        notifyChange={notifyChange}
                        editOpen={editOpen}
                        handleCloseEdit={handleCloseEdit}
                    />
                </>
            }
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                {/* <p className="card-text">{sheetMusicFilepath}</p> */}
                {sheetMusicFilepath && <a href={sheetMusicFilepath} target="_blank" rel="noreferrer">Open sheet music</a>}
            </div>
        </div>
    )
}
