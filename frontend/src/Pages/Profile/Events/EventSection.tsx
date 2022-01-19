import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import { GenericHandlerType, EventType } from '../../../ObjectInterface';
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


        
    return (
        <>
            <CreateEventModal userID={userID} notifyChange={notifyChange} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
            <div>
                {!error && loading ? <div>...loading</div> 
                :
                error ? 
                <Alert variant="danger">{error}</Alert>
                : 
                <div>
                    {response?.map((_result: EventType) => (
                        <li key={_result.id}>
                            <EventCard
                                event={_result}
                                isMyProfile={true}
                                notifyChange={notifyChange}
                            />
                        </li>
                    ))}
                </div>
                }
            </div>
        </>
    )
}