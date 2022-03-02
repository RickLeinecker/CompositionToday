import React from 'react'
import GenericModal from '../../Helper/Generics/GenericModal';

type Props = {
    userID: number[];
    notifyChange: () => void;
    deleteOpen: boolean;
    handleCloseDelete: () => void;
    type: string;
}

export default function DeleteEventModal({ userID, notifyChange, deleteOpen, handleCloseDelete, type}: Props) {

    async function confirmDeleteHandler() {
        console.log("delete admins")

        handleCloseDelete();
    }

    return (
        <div>
            <GenericModal show={deleteOpen} title={"Remove"} onHide={handleCloseDelete} confirm={confirmDeleteHandler} actionText={"Remove"} >
                <>
                    <p>
                        Are you sure you want to remove admin privileges for these users?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
