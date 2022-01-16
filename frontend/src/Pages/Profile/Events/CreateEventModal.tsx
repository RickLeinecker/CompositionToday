import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';


type Props = {
    userID: number;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateEventModal({ userID, notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    
    async function confirmCreateHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID,
                contentName: newContentName,
                contentType: "event",
                description: newContentDescription,
                // timestamp: newContentTimestamp,
            }),
            methodType: "POST",
            path: "createContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create event');
                return;
            }

            notifyChange();
            toast.success('Event created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create event');
        }
    }

    return (
        <div>
            <GenericModal show={createOpen} title={"Create Event"} onHide={handleCloseCreate} confirm={confirmCreateHandler} actionText={"Save"} >
                <>
                    <GenericInputField title="Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true}/>
                    <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} isRequired={false}/>
                </>
            </GenericModal>
        </div>
    )
}
