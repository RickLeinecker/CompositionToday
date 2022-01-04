import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';
import ExperienceCard from './ExperienceCard';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';
import CreateExperienceModal from './CreateExperienceModal';

type Props = {
    userID: number;
}

export default function ExperienceSection({ userID }: Props) {
    const [response, setResponse] = useState<Array<ExperienceType> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ contentType: "experience", userID }),
                methodType: "POST",
                path: "getUserContentByType",
            }

            try {
                let answer = (await GenericHandler(handlerObject));
                if (answer.error.length > 0) {
                    setError(answer.error);
                    return;
                }

                setError("");
                setResponse(await answer.result.reverse());
                setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }

        }
        fetchData();
    }, [userID, hasChanged])



    return (
        <>
            <CreateExperienceModal userID={userID} setHasChanged={setHasChanged}/>
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
                                        setHasChanged={setHasChanged}
                                    />
                                </li>
                            ))}
                        </div>
                }
            </div>
        </>
    )
}
