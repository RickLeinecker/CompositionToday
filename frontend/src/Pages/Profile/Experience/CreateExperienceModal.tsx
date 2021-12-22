import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    userID: number;
}

export default function CreateExperienceModal({userID}: Props) {

    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();
    const[newContentName, setNewContentName] = useState("");
    const[newContentText, setNewContentText] = useState("");
    const[newContentDescription, setNewContentDescription] = useState("");
    const[newContentTimestamp, setNewContentTimeStamp] = useState("");

    async function confirmCreateHandler(){
        console.log("create");
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
            <Button onClick={handleOpenCreate}>Add experience</Button>
            <GenericModal show={createOpen} title={"Create"} onHide={handleCloseCreate} confirm={confirmCreateHandler} actionText={"Save"} >
                    <>
                        <GenericInputField title="Experience Title" onChange={setNewContentName} value={newContentName}/>
                        <GenericInputField title="Role" onChange={setNewContentText} value={newContentText}/>
                        <GenericInputField title="Description" onChange={setNewContentDescription} value={newContentDescription}/>
                        <GenericInputField title="Time Period" onChange={setNewContentTimeStamp} value={newContentTimestamp}/>
                    </>
            </GenericModal>
        </div>
    )
}
