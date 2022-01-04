import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    experience: ExperienceType;
    isMyProfile: boolean;
    setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditExperienceModal({ isMyProfile, experience, setHasChanged }: Props) {
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
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
                // setError(answer.error);
                return;
            }

            // setError("");
            // setResponse(await answer.result);
            // setLoading(false);
            setHasChanged(value => !value);
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            // setError(DefaultValues.apiErrorMessage);
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"}>
                <>
                    <GenericInputField title="Experience Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} />
                    <GenericInputField title="Role" type="contentText" onChange={handleChange} value={newContentValue.contentText} />
                    <GenericInputField title="Description" type="description" onChange={handleChange} value={newContentValue.description} />
                    <GenericInputField title="Time Period" type="timestamp" onChange={handleChange} value={newContentValue.timestamp} />
                </>
            </GenericModal>
            {isMyProfile && <Button onClick={handleOpenEdit}>Edit</Button>}
        </div>
    )
}
