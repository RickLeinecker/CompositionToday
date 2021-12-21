import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    experience: ExperienceType;
    // contentName: string;
    // contentText: string;
    // timestamp: string;
    // description?: string;
    // contentID: number;
    // userID: number
    isMyProfile: boolean;

}

export default function EditExperienceModal({isMyProfile, experience}: Props) {
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const[newContentValue, setNewContentValue] = useState<ExperienceType>(experience)
    // const[newContentName, setNewContentName] = useState(contentName);
    // const[newContentText, setNewContentText] = useState(contentText);
    // const[newContentDescription, setNewContentDescription] = useState(description);
    // const[newContentTimestamp, setNewContentTimeStamp] = useState(timestamp);

    function handleNameChange(newValue: string) {
        setNewContentValue(prevState => ({
            ...prevState,
            contentName: newValue
        }));
    }
    function handleTextChange(newValue: string) {
        setNewContentValue(prevState => ({
            ...prevState,
            contentText: newValue
        }));
    }
    function handleDescriptionChange(newValue: string) {
        setNewContentValue(prevState => ({
            ...prevState,
            description: newValue
        }));
    }
    function handleTimestampChange(newValue: string) {
        setNewContentValue(prevState => ({
            ...prevState,
            timestamp: newValue
        }));
    }

    async function confirmEditHandler(){
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
        
        try{
            let answer = (await GenericHandler(handlerObject));
            if(answer.error.length > 0){
                // setError(answer.error);
                return;
            }
            
            // setError("");
            // setResponse(await answer.result);
            // setLoading(false);
            

        } catch(e: any){
            console.error("Frontend Error: " + e);
            // setError(DefaultValues.apiErrorMessage);
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"}>
                <>
                    <GenericInputField title="Experience Title" onChange={handleNameChange} value={newContentValue.contentName}/>
                    <GenericInputField title="Role" onChange={handleTextChange} value={newContentValue.contentText}/>
                    <GenericInputField title="Description" onChange={handleDescriptionChange} value={newContentValue.description}/>
                    <GenericInputField title="Time Period" onChange={handleTimestampChange} value={newContentValue.timestamp}/>
        
                </>
            </GenericModal>

            {isMyProfile && 
                <>
                    <Button onClick={handleOpenEdit}>Edit</Button>
                </>
            }
        </div>
    )
}
