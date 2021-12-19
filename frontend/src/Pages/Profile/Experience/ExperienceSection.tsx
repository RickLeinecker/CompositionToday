import React, { useEffect, useState } from 'react'
import { Alert, Button } from 'react-bootstrap';
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();

    function confirmCreateHandler(){
        console.log("create");
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
                                contentID={_result.id}
                                isMyProfile={true} 
                                contentName={_result.contentName} 
                                description={_result.description}
                                contentText={_result.contentText} 
                                timestamp={_result.timestamp}/>
                        </li>
                    ))}
                </div>
                }
            </div>
        </>
    )
}
