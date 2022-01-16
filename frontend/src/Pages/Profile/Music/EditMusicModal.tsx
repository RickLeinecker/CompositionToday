import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, MusicType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';

type Props = {
    music: MusicType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditMusicModal({music, notifyChange, editOpen, handleCloseEdit}: Props) {
    const [newContentValue, setNewContentValue] = useState<MusicType>(music)

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;
        error = checkIfEmpty(newContentValue.contentText, setTextError) || error;

        return(error)
    }

    function checkIfEmpty(value: string | null | undefined, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if(!value){
            setError(true);
            return true;
        } else{
            setError(false);
            return false;
        }
    }

    async function confirmEditHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                userID: newContentValue.userID,
                contentType: "music",
                contentName: newContentValue.contentName,
                contentText: newContentValue.contentText,
                description: newContentValue.description,
            }),
            methodType: "PATCH",
            path: "updateContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update music")
                return;
            }

            toast.success("Music updated")
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update music")
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Music Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} isRequired={true} error={nameError}/>
                    <GenericInputField title="Title" type="contentText" onChange={handleChange} value={newContentValue.contentText} isRequired={true} error={textError}/>
                    <GenericInputField title="Description" type="description" onChange={handleChange} value={newContentValue.description} isRequired={false}/>
                </>
            </GenericModal>
        </div>
    )
}
