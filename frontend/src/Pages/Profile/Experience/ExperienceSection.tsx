import React, { useEffect, useState } from 'react'
import { Alert, Button, FormControl, InputGroup } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';
import ExperienceCard from './ExperienceCard';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericModal from '../../../Helper/Generics/GenericModal';

type Props = {
    userID: number;
}

export default function ExperienceSection({userID}: Props) {

    const [response, setResponse] = useState<Array<ExperienceType> | undefined>(undefined);
    // const [newExperience, setNewExperience] = useState<ExperienceType | undefined>(undefined);
    const[newContentName, setNewContentName] = useState("");
    const[newContentText, setNewContentText] = useState("");
    const[newContentDescription, setNewContentDescription] = useState("");
    const[newContentTimestamp, setNewContentTimeStamp] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();

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

    useEffect(() => {
        async function fetchData(){
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({contentType: "experience", userID}),
                methodType: "POST",
                path: "getUserContentByType",
            }
            
            try{
                let answer = (await GenericHandler(handlerObject));
                if(answer.error.length > 0){
                    setError(answer.error);
                    return;
                }
                
                setError("");
                setResponse(await answer.result);
                setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }
        
        }
        fetchData();
    }, [userID])


        
    return (
        <>
            <Button onClick={handleOpenCreate}>Add experience</Button>
            <GenericModal show={createOpen} title={"Create"} onHide={handleCloseCreate} confirm={confirmCreateHandler} actionText={"Save"} >
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">Experience title</InputGroup.Text>
                            <FormControl
                                id="AddTitle"
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                value={newContentName}
                                onChange={e => setNewContentName(e.target.value)}
                            />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">Role</InputGroup.Text>
                                <FormControl
                                id="AddRole"
                                value={newContentText}
                                onChange={e => setNewContentText(e.target.value)}
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">Description</InputGroup.Text>
                                <FormControl
                                id="AddDescription"
                                aria-label="Default"
                                onChange={e => setNewContentDescription(e.target.value)}
                                value={newContentDescription}
                                aria-describedby="inputGroup-sizing-default"
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="inputGroup-sizing-default">Time period</InputGroup.Text>
                                <FormControl
                                id="AddTimePeriod"
                                aria-label="Default"
                                onChange={e => setNewContentTimeStamp(e.target.value)}
                                value={newContentTimestamp}
                                aria-describedby="inputGroup-sizing-default"
                                />
                        </InputGroup>
                    </>
            </GenericModal>
            <div>
                {!error && loading ? <div>...loading</div> 
                :
                error ? 
                <Alert variant="danger">{error}</Alert>
                : 
                <div>
                    {response?.map((_result: ExperienceType) => (
                        <li key={_result.id}>
                            <ExperienceCard
                                experience={_result}
                                isMyProfile={true} 
                            />   
                        </li>
                    ))}
                </div>
                }
            </div>
        </>
    )
}
