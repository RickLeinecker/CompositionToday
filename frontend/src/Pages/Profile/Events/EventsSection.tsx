import React, { useEffect, useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import { Content, GenericHandlerObject } from '../../../ObjectInterface';

export default function EventsSection() {

    const [response, setResponse] = useState<Array<Content> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        async function fetchData(){

            const handlerObject: GenericHandlerObject = {
                data: JSON.stringify({contentType: "music"}),
                methodType: "POST",
                path: "getContentByType",
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
                            <div>
                                <p>{_result.contentText}</p>
                            </div>
                        </li>
                    ))}
                </div>
                }
            </div>
        </>
    )
}
