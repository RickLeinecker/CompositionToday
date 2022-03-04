import React from 'react'
import GenericModal from '../../../Helper/Generics/GenericModal';

type Props = {
    userID: number[];
    notifyChange: () => void;
    publishOpen: boolean;
    handleClosePublish: () => void;
    type: string;
}

export default function AdminMakePublisherModal({ userID, notifyChange, publishOpen, handleClosePublish, type}: Props) {

    async function confirmDeleteHandler() {
        console.log("make users publishers")
        console.log(userID);
        handleClosePublish();
    }

    return (
        <div>
            <GenericModal show={publishOpen} title={"Confirm"} onHide={handleClosePublish} confirm={confirmDeleteHandler} actionText={"Confirm"} >
                <>
                    <p>
                        Are you sure you want to make these users publishers?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
