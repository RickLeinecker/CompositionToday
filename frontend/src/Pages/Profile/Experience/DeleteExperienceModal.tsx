import React from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';

type Props = {
    contentID: number;
    notifyChange: () => void;
    deleteOpen: boolean;
    handleOpenDelete: () => void;
    handleCloseDelete: () => void;
}

export default function DeleteExperienceModal({ contentID, notifyChange, deleteOpen, handleOpenDelete, handleCloseDelete}: Props) {

    async function confirmDeleteHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({ contentID }),
            methodType: "DELETE",
            path: "deleteContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to delete experience');
                return;
            }

            notifyChange();
            toast.success('Experience deleted');
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to delete experience');
        }
    }

    return (
        <div>
            <GenericModal show={deleteOpen} title={"Delete"} onHide={handleCloseDelete} confirm={confirmDeleteHandler} actionText={"Delete"} >
                <>
                    <p>
                        Are you sure you want to delete this?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
