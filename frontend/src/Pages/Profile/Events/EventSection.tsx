import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericVirtualizedList from '../../../Helper/Generics/GenericVirtualizedList';
import { GenericHandlerType, EventType, TagType } from '../../../ObjectInterface';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';
import CreateEventModal from './CreateEventModal';
import EventCard from './EventCard';

type Props = {
    userID: number;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function EventSection({createOpen, handleCloseCreate, userID}: Props) {

    const [response, setResponse] = useState<Array<EventType> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    const [tagOptions, setTagOptions] = useState<Array<TagType>>();

    const notifyChange = () => {
        setHasChanged(value => !value);
    }


    useEffect(() => {
        async function fetchData(){

            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({contentType: "event", userID}),
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
    }, [userID, notifyChange])


    // get tags
    useEffect(() => {
        fetchTags();
        async function fetchTags(){
            
            try{
                let answer = (await GenericGetHandler("getTags"));
                if(answer.error.length > 0){
                    // setError(answer.error);
                    return;
                }
                
                // setError("");
                const result = await answer.result;
                setTagOptions(result);

                // setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
    },[]);

        
    return (
        <>
            <CreateEventModal userID={userID} notifyChange={notifyChange} createOpen={createOpen} handleCloseCreate={handleCloseCreate} tagOptions={tagOptions}/>
            <div>
                {!error && loading ? <div>...loading</div> 
                :
                error ? 
                <Alert variant="danger">{error}</Alert>
                : 
                <div>
                    <GenericVirtualizedList
                        bodyStyle={{ width: "100%", height: "50vh" }}
                        individualStyle={{ padding: "1% 1% 20px" }}
                        items={response}
                        notifyChange={notifyChange}
                        type={"event"}
                    />
                </div>
                }
            </div>
        </>
    )
}
