import { EventType } from '../../../ObjectInterface';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import EditEventModal from './EditEventModal';
import { useState } from 'react';
import { Image } from 'react-bootstrap'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';

type Props = {
    event: EventType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function EventCard({ event, isMyProfile, notifyChange }: Props) {
    const { id, contentName, description, fromDate, toDate, imageFilepath, location, mapsEnabled } = event;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const src: string = "https://www.google.com/maps/embed/v1/place?key=" + process.env.REACT_APP_GOOGLE_MAPS_API + "&q=" + location

    return (
        <div className="card" onMouseOver={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>
            {isMyProfile && showOptions &&
                <>
                    <div className="card-icons">
                        <EditIcon onClick={handleOpenEdit} />
                        <DeleteIcon onClick={handleOpenDelete} />
                    </div>
                </>
            }

            <GenericDeleteModal
                contentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"Event"}
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
                <p className="card-text">{"Start date: " + fromDate?.toString().substring(0, 10)}</p>
                <p className="card-text">{"End date: " + toDate?.toString().substring(0, 10)}</p>
                <Image className="profile-pic" src={imageFilepath} style={{ height: "10%", width: "20%" }} />
                {location && <p className="card-text">{"Location: " + location}</p>}
                {
                    mapsEnabled ?
                        <iframe
                            title="map"
                            width="400"
                            height="300"
                            style={{ border: "0" }}
                            loading="lazy"
                            allowFullScreen
                            src={src}
                        /> 
                        : 
                        <></>
                }

            </div>
        </div>
    )
}
