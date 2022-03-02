import React from 'react'
import GenericModal from '../../../Helper/Generics/GenericModal';

type Props = {
    userID: number[];
    notifyChange: () => void;
    deleteOpen: boolean;
    handleCloseDelete: () => void;
    type: string;
}

export default function AdminDeleteUsersModal({ userID, notifyChange, deleteOpen, handleCloseDelete, type}: Props) {

    async function confirmDeleteHandler() {
        console.log("delete users")
        console.log(userID);
        handleCloseDelete();
    }

    return (
        <div>
            <GenericModal show={deleteOpen} title={"Delete"} onHide={handleCloseDelete} confirm={confirmDeleteHandler} actionText={"Delete"} >
                <>
                    <p>
                        Are you sure you want to PERMANENTLY delete these users?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
