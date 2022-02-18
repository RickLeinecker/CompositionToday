import React, { useState } from 'react'
import { toast } from 'react-toastify';
import GenericHandler from '../../Handlers/GenericHandler';
import useOpen from '../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../Helper/Generics/GenericDiscardModal';
import GenericInputField from '../../Helper/Generics/GenericInputField';
import GenericModal from '../../Helper/Generics/GenericModal';
import { CommentType, GenericHandlerType } from '../../ObjectInterface';

type Props = {
    comment: CommentType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function CommetnEditModal({ comment, notifyChange, editOpen, handleCloseEdit}: Props) {
    const [newContentValue, setNewContentValue] = useState<string>(comment.comment)

    const [contentError, setContentError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseEdit();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentValue(comment.comment);
    }

    const handleChange = (newValue: string) => {
        setNewContentValue(newValue)
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue, setContentError) || error;

        return (error)
    }

    function checkIfEmpty(value: string | null | undefined, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if (!value) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    }

    async function confirmEditHandler() {
        console.log(comment);
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                commentID: comment.id,
                contentID: comment.contentID,
                commenterUID: comment.commenterUID,
                timestamp: comment.timestamp,
                comment: newContentValue,
                approved: 1,
            }),
            methodType: "PATCH",
            path: "updateComment",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update comment")
                console.log(answer.error)
                return;
            }

            toast.success("Comment updated")
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update comment")
        }

        handleCloseEdit();
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={onHide} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Comment" type="commentText" onChange={handleChange} value={newContentValue} isRequired={true} error={contentError} isMultiline={true} />
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
