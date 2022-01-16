import { EventType } from '../../../ObjectInterface';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteEventModal from './DeleteEventModal';
import EditEventModal from './EditEventModal';

type Props = {
    event: EventType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function MusicCard({ event, isMyProfile, notifyChange }: Props) {
    const { id, contentName, description} = event;
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

                    <DeleteEventModal
                    contentID={id}
                    notifyChange={notifyChange} 
                    deleteOpen={deleteOpen}
                    handleCloseDelete={handleCloseDelete}
                    />

                    <EditEventModal
                        event={event}
                        notifyChange={notifyChange}
                        editOpen={editOpen}
                        handleCloseEdit={handleCloseEdit}
                    />
                </>
            }
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}
