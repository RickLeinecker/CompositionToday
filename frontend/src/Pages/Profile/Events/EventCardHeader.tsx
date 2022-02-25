import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu'
import moment from 'moment'
import useOpen from '../../../Helper/CustomHooks/useOpen'
import { Chip } from '@mui/material'
import EditEventModal from './EditEventModal'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal'
import { EventType } from '../../../ObjectInterface'

type Props = {
    event: EventType;
    isMyProfile: boolean;
    notifyChange: () => void;
}

export default function EventCardHeader({event, isMyProfile, notifyChange}: Props) {
    const { id, fromDate, toDate, username, profilePicPath, displayName, timestamp, isEdited} = event;

    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    
    const [status, setStatus] = useState("");
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        let temp = window.sessionStorage.getItem("username");

        setCurrentUsername(!temp ? "" : temp);
    }, [])
    
    useEffect(() => {
        let fromDateCurr = new Date(fromDate).getTime();
        let toDateCurr = new Date(toDate).getTime();
        let currDate = new Date().getTime();

        if (toDateCurr < currDate) {
            setStatus("Completed")
        }
        else if (fromDateCurr < currDate) {
            setStatus("Ongoing");
        }
        else {
            setStatus("Scheduled");
        }
    }, [fromDate, toDate]);


  return (
    <div style={{ display: "flex" }}>
        <Link to={`/profile/${username}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: "flex", alignItems: "center", margin: "2%"}}>
                <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{ float: "left" }} roundedCircle />
                <h5 className="card-title" style={{ marginLeft: "2%" }}>{displayName}</h5>
            </div>
        </Link>

        <div className="card-icons">
            <div style={{ display: "flex" }}>
                {isEdited &&
                    <p className="card-text-secondary">
                        (edited)&nbsp;
                    </p>
                }
                <p className="card-text-secondary">
                    {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                </p>
                <div>
                    {(isMyProfile || username === currentUsername) &&
                        <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit}/>
                    }
                </div>
            </div>
            <div style={{float: "right"}}>
                {status === 'Scheduled' && <Chip label={status} color="success" />}
                {status === 'Ongoing' && <Chip label={status} color="primary" />}
                {status === 'Completed' && <Chip label={status} color="error" />}
            </div>
        </div>

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
    </div>
  )
}
