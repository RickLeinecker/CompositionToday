import React from 'react'
import GenericHandler from '../../Handlers/GenericHandler';
import GenericModal from './GenericModal';
import { GenericHandlerType } from '../../ObjectInterface';
import { toast } from 'react-toastify';

type Props = {
    contentID: number;
    notifyChange: () => void;
    deleteOpen: boolean;
    handleCloseDelete: () => void;
    type: string;
}

export default function DeleteEventModal({ contentID, notifyChange, deleteOpen, handleCloseDelete, type}: Props) {

    async function confirmDeleteHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({ contentID }),
            methodType: "DELETE",
            path: "deleteContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to delete ' + type);
                return;
            }

            notifyChange();
            toast.success(type + ' deleted');
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to delete ' + type);
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
