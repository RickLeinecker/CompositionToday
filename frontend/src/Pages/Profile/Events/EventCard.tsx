import { EventType } from '../../../ObjectInterface';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteEventModal from './DeleteEventModal';
import EditEventModal from './EditEventModal';
import { useState } from 'react';

type Props = {
    event: EventType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function MusicCard({ event, isMyProfile, notifyChange }: Props) {
    const { id, contentName, description, fromDate, toDate} = event;
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
            
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">{"Start date: " + fromDate?.toString().substring(0,10)}</p>
                <p className="card-text">{"End date: " + toDate?.toString().substring(0,10)}</p>
            </div>
        </div>
    )
}
