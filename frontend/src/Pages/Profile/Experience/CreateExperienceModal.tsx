import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    userID: number;
    notifyChange: () => void;
}

export default function CreateExperienceModal({ userID, notifyChange }: Props) {

    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();
    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentTimestamp, setNewContentTimeStamp] = useState("");

    async function confirmCreateHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID,
                contentName: newContentName,
                contentText: newContentText,
                contentType: "experience",
                description: newContentDescription,
                // timestamp: newContentTimestamp,
            }),
            methodType: "POST",
            path: "createContent",
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
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            // setError(DefaultValues.apiErrorMessage);
        }
    }

    return (
        <div>
            <Button onClick={handleOpenCreate}>Add experience</Button>
            <GenericModal show={createOpen} title={"Create"} onHide={handleCloseCreate} confirm={confirmCreateHandler} actionText={"Save"} >
                <>
                    <GenericInputField title="Experience Title" type="contentName" onChange={setNewContentName} value={newContentName} />
                    <GenericInputField title="Role" type="contentText" onChange={setNewContentText} value={newContentText} />
                    <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} />
                    <GenericInputField title="Time Period" type="timestamp" onChange={setNewContentTimeStamp} value={newContentTimestamp} />
                </>
            </GenericModal>
        </div>
    )
}
