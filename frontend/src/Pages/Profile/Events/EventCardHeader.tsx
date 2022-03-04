import React, { useEffect, useState } from 'react'
import useOpen from '../../../Helper/CustomHooks/useOpen'
import EditEventModal from './EditEventModal'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal'
import { EventType } from '../../../ObjectInterface'
import CardHeader from '../CardHeader'

type Props = {
    event: EventType;
    isMyProfile: boolean;
    notifyChange: () => void;
}

export default function EventCardHeader({ event, isMyProfile, notifyChange }: Props) {
    const { id, username, profilePicPath, displayName, timestamp, isEdited, tagArray } = event;

    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        let temp = window.localStorage.getItem("username");

        setCurrentUsername(!temp ? "" : temp);
    }, [])

    return (
        <div>
            <CardHeader
                isMyProfile={isMyProfile}
                tagArray={tagArray}
                username={username}
                profilePicPath={profilePicPath}
                isEdited={isEdited}
                timestamp={timestamp}
                displayName={displayName}
                currentUsername={currentUsername}
                handleOpenDelete={handleOpenDelete}
                handleOpenEdit={handleOpenEdit}
            />

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
