import React from 'react'
import GenericModal from '../../../Helper/Generics/GenericModal';
import GenericHandler from '../../../Handlers/GenericHandler';
import { GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    userID: string[];
    notifyChange: () => void;
    deleteOpen: boolean;
    handleCloseDelete: () => void;
    type: string;
}

export default function AdminRemoveModal({ userID, notifyChange, deleteOpen, handleCloseDelete, type }: Props) {

    async function confirmDeleteHandler() {
        console.log("delete admins", userID[0])
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: userID[0]
            }),
            methodType: "DELETE",
            path: "removeAdmin",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                return;
            }
        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }

        notifyChange();
        handleCloseDelete();
    }

    return (
        <div>
            <GenericModal show={deleteOpen} title={"Remove"} onHide={handleCloseDelete} confirm={confirmDeleteHandler} actionText={"Remove"} >
                <>
                    <p>
                        Are you sure you want to remove admin privileges for this user?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
