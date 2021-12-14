import React, { useEffect, useState } from 'react'
import GetContentByTypeHandler from '../../../Handlers/GetContentByTypeHandler';
import { Content, JSONfileContent } from '../../../ObjectInterface';
import ExperienceCard from './ExperienceCard';

export default function ExperienceSection() {

    const [response, setResponse] = useState<JSONfileContent| undefined>(undefined);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchData(){
            let answer = (await GetContentByTypeHandler("experience"));
            setResponse(await answer);
            setLoading(false);
        }
        
        fetchData();
    }, [])


        
    return (
        <>
            <div>
                {loading ? <div>...loading</div> 
                : 
                <div>
                    {response?.result.map((_result: Content) => (
                        <li key={_result.id}>
                            <ExperienceCard contentName={_result.contentName} contentText={_result.contentText} timestamp={_result.timestamp}>
                            </ExperienceCard>
                        </li>

                    ))}
                </div>
                }
            </div>
        </>
    )
}
