import { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';
import CreateExperienceModal from './CreateExperienceModal';
import GenericVirtualizedList from '../../../Helper/Generics/GenericVirtualizedList';

type Props = {
    uid: string;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function ExperienceSection({ uid, createOpen, handleCloseCreate }: Props) {
    const [response, setResponse] = useState<Array<ExperienceType> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);

    const notifyChange = () => { setHasChanged(value => !value); }

    useEffect(() => {
        async function fetchData() {
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ contentType: "experience", uid: uid }),
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

    }, [uid, hasChanged])

    return (
        <>
            <CreateExperienceModal uid={uid} notifyChange={notifyChange} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
            {
                !error && loading ? <div>...loading</div>
                    :
                    error ? <Alert variant="danger">{error}</Alert>
                        :
                        <GenericVirtualizedList
                            bodyStyle={{ width: "100%", height: "63vh" }}
                            individualStyle={{ padding: "1% 1% 20px" }}
                            items={response}
                            notifyChange={notifyChange}
                            type={"experience"}
                        />
            }
        </>
    )
}