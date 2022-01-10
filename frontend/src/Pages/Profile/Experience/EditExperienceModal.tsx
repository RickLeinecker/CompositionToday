import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';

type Props = {
    experience: ExperienceType;
    notifyChange: () => void;
    editOpen: boolean;
    handleOpenEdit: () => void;
    handleCloseEdit: () => void;
}

export default function EditExperienceModal({experience, notifyChange, editOpen, handleOpenEdit, handleCloseEdit}: Props) {
    const [newContentValue, setNewContentValue] = useState<ExperienceType>(experience)

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    async function confirmEditHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                userID: newContentValue.userID,
                contentType: "experience",
                contentName: newContentValue.contentName,
                contentText: newContentValue.contentText,
                description: newContentValue.description,
                // timestamp: newContentTimestamp,
            }),
            methodType: "PATCH",
            path: "updateContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update experience")
                return;
            }

            toast.success("Experience updated")
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update experience")
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"}>
                <>
                    <GenericInputField title="Experience Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} isRequired={true}/>
                    <GenericInputField title="Role" type="contentText" onChange={handleChange} value={newContentValue.contentText} isRequired={true}/>
                    <GenericInputField title="Description" type="description" onChange={handleChange} value={newContentValue.description} isRequired={false}/>
                    <GenericInputField title="Time Period" type="timestamp" onChange={handleChange} value={newContentValue.timestamp} isRequired={false}/>
                </>
            </GenericModal>
        </div>
    )
}
