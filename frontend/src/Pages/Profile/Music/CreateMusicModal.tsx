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

export default function CreateMusicModal({ userID, notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    
    async function confirmCreateHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID,
                contentName: newContentName,
                contentText: newContentText,
                contentType: "music",
                description: newContentDescription,
                // timestamp: newContentTimestamp,
            }),
            methodType: "POST",
            path: "createContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create music');
                return;
            }

            notifyChange();
            toast.success('Music created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create music');
        }
    }

    return (
        <div>
            <GenericModal show={createOpen} title={"Create Music"} onHide={handleCloseCreate} confirm={confirmCreateHandler} actionText={"Save"} >
                <>
                    <GenericInputField title="Song Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true}/>
                    <GenericInputField title="Title" type="contentText" onChange={setNewContentText} value={newContentText} isRequired={true}/>
                    <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} isRequired={false}/>
                </>
            </GenericModal>
        </div>
    )
}
