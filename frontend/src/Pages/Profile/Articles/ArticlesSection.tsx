import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import { Content, GenericHandlerObject } from '../../../ObjectInterface';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';

export default function ArticlesSection() {

    const [response, setResponse] = useState<Array<Content> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {
        async function fetchData(){

            const handlerObject: GenericHandlerObject = {
                data: JSON.stringify({contentType: "articles"}),
                methodType: "POST",
                path: "getContentByType",
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
    }, [])


        
    return (
        <>
            <div>
                {!error && loading ? <div>...loading</div> 
                :
                error ? 
                <Alert variant="danger">{error}</Alert>
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
