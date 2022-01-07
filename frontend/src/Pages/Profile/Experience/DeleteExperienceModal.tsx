import React from 'react'
import { Button } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';

type Props = {
    contentID: number;
    isMyProfile: boolean;
    notifyChange: () => void;
}

export default function DeleteExperienceModal({ contentID, isMyProfile, notifyChange }: Props) {

    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

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
            {isMyProfile && <Button onClick={handleOpenDelete}>Delete</Button>}
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
