import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    contentName: string;
    contentText: string;
    timestamp: string;
    description?: string;
    isMyProfile: boolean;
    contentID: number;
    userID: number
}
export default function EditExperienceModal({contentName, contentText, timestamp, description, isMyProfile, contentID, userID}: Props) {
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    // const[newContentValue, setNewContentValue] = useState<ExperienceType>({id: contentID, userID, contentName: "hiii there", contentText, timestamp, description})
    const[newContentName, setNewContentName] = useState(contentName);
    const[newContentText, setNewContentText] = useState(contentText);
    const[newContentDescription, setNewContentDescription] = useState(description);
    const[newContentTimestamp, setNewContentTimeStamp] = useState(timestamp);




    async function confirmEditHandler(){
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID, 
                userID, 
                contentType: "experience",
                contentName: newContentName, 
                contentText: newContentText, 
                description: newContentDescription,
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
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Experience title</InputGroup.Text>
                        <FormControl
                        aria-label="Default"
                        value={newContentName}
                        onChange={e => setNewContentName(e.target.value)}
                        aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Role</InputGroup.Text>
                        <FormControl
                        aria-label="Default"
                        value={newContentText}
                        onChange={e => setNewContentText(e.target.value)}
                        aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
                        <FormControl
                        aria-label="Default"
                        onChange={e => setNewContentDescription(e.target.value)}
                        value={newContentDescription}
                        aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Time period</InputGroup.Text>
                        <FormControl
                        aria-label="Default"
                        onChange={e => setNewContentTimeStamp(e.target.value)}
                        value={newContentTimestamp}
                        aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
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
