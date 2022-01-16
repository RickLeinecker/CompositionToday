import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import { GenericHandlerType, MusicType } from '../../../ObjectInterface';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';
import CreateMusicModal from './CreateMusicModal';
import MusicCard from './MusicCard';

type Props = {
    userID: number;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function MusicSection({createOpen, handleCloseCreate, userID}: Props) {

    const [response, setResponse] = useState<Array<MusicType> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);

    const notifyChange = () => {
        setHasChanged(value => !value);
    }


    useEffect(() => {
        async function fetchData(){

            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({contentType: "music", userID}),
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
            <CreateMusicModal userID={userID} notifyChange={notifyChange} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
            <div>
                {!error && loading ? <div>...loading</div> 
                :
                error ? 
                <Alert variant="danger">{error}</Alert>
                : 
                <div>
                    {response?.map((_result: MusicType) => (
                        <li key={_result.id}>
                            <MusicCard
                                music={_result}
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
