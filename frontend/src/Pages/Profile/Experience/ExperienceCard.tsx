import { useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericForm from '../../../Helper/Generics/GenericForm';
import GenericInput from '../../../Helper/Generics/GenericInput';
import GenericModal from '../../../Helper/Generics/GenericModal';
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    contentName: string;
    contentText: string;
    timestamp: string;
    description?: string;
    isMyProfile: boolean;
    contentID: number;
    userID: number
}


export default function ExperienceCard({contentName, contentText, timestamp, description, isMyProfile, contentID, userID}: Props) {

    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    // const[newContentValue, setNewContentValue] = useState<ExperienceType>({id: contentID, userID, contentName: "hiii there", contentText, timestamp, description})
    const[newContentName, setNewContentName] = useState(contentName);
    const[newContentText, setNewContentText] = useState(contentText);
    const[newContentDescription, setNewContentDescription] = useState(description);
    const[newContentTimestamp, setNewContentTimeStamp] = useState(timestamp);

    async function confirmDeleteHandler(){
        console.log("HERE WE DELETE");
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({contentID}),
            methodType: "DELETE",
            path: "deleteContent",
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
                timestamp: timestamp,
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
        <div className="card" style={{display: "flex"}}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>

                <GenericModal show={deleteOpen} title={"Delete"} onHide={handleCloseDelete} confirm={confirmDeleteHandler} actionText={"Delete"} >
                    <>
                        <p>
                            Are you sure you want to delete this?
                        </p>
                    </>
                </GenericModal>

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
                        <Button onClick={handleOpenDelete}>Delete</Button>
                    </>
                }
            </div>
        </div>
    )
}
