import React, { useEffect, useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import { Content, GenericHandlerObject } from '../../../ObjectInterface';
import ExperienceCard from './ExperienceCard';

export default function ExperienceSection() {

    const [response, setResponse] = useState<Array<Content> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        async function fetchData(){

            const handlerObject: GenericHandlerObject = {
                data: JSON.stringify({contentType: "experience"}),
                methodType: "POST",
                url: "getContentByType",
            }

            try{
                let answer = (await GenericHandler(handlerObject));
                if(answer.error.length > 0){
                    console.log("error");
                    return;
                }
                
                setError(false);
                setResponse(await answer.result);
                setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                setError(true);
            }
        
        }
        fetchData();
    }, [])


        
    return (
        <>
            <div>
                {!error && loading ? <div>...loading</div> 
                :
                error ? 
                <div>Could not process this request, please reload the page</div> 
                : 
                <div>
                    {response?.map((_result: Content) => (
                        <li key={_result.id}>
                            <ExperienceCard 
                                contentName={_result.contentName} 
                                contentText={_result.contentText} 
                                timestamp={_result.timestamp}>
                            </ExperienceCard>
                        </li>
                    ))}
                </div>
                }
            </div>
        </>
    )
}
