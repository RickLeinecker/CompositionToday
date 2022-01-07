import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';

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
                toast.error('Failed to create experience');
                return;
            }

            notifyChange();
            toast.success('Experience created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create experience');
        }
    }

    return (
        <div>
            <Button onClick={handleOpenCreate}>Add experience</Button>
            <GenericModal show={createOpen} title={"Create"} onHide={handleCloseCreate} confirm={confirmCreateHandler} actionText={"Save"} >
                <>
                    <GenericInputField title="Experience Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true}/>
                    <GenericInputField title="Role" type="contentText" onChange={setNewContentText} value={newContentText} isRequired={true}/>
                    <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} isRequired={false}/>
                    <GenericInputField title="Time Period" type="timestamp" onChange={setNewContentTimeStamp} value={newContentTimestamp} isRequired={false}/>
                </>
            </GenericModal>
        </div>
    )
}