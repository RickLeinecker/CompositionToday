import React from 'react'
import GenericModal from '../../../Helper/Generics/GenericModal';

type Props = {
    userID: number[];
    notifyChange: () => void;
    adminOpen: boolean;
    handleCloseAdmin: () => void;
    type: string;
}

export default function AdminMakeAdminModal({ userID, notifyChange, adminOpen, handleCloseAdmin, type}: Props) {

    async function confirmDeleteHandler() {
        console.log("make users admins")
        console.log(userID);
        handleCloseAdmin();
    }

    return (
        <div>
            <GenericModal show={adminOpen} title={"Confirm"} onHide={handleCloseAdmin} confirm={confirmDeleteHandler} actionText={"Confirm"} >
                <>
                    <p>
                        Are you sure you want to make these users administrators?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
