import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericVirtualizedList from '../../../Helper/Generics/GenericVirtualizedList';
import { ContentType, GenericHandlerType } from '../../../ObjectInterface';
import DefaultValues from '../../../Styles/DefaultValues.module.scss';
import CreateArticleModal from './CreateArticleModal';

type Props = {
    userID: number;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function ArticlesSection({ userID, createOpen, handleCloseCreate }: Props) {

    const [response, setResponse] = useState<Array<ContentType> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    const currentUid = getAuth().currentUser?.uid;

    const notifyChange = () => { setHasChanged(value => !value); }

    useEffect(() => {
        async function fetchData() {

            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ contentType: "article", uid: currentUid }),
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
                setResponse(await answer.result);
                setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }

        }
        fetchData();
    }, [hasChanged, currentUid])



    return (
        <>
            <CreateArticleModal userID={userID} notifyChange={notifyChange} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
            <div>
                {!error && loading ? <div>...loading</div>
                    :
                    error ?
                        <Alert variant="danger">{error}</Alert>
                        :
                        <GenericVirtualizedList
                            bodyStyle={{ width: "100%", height: "50vh" }}
                            individualStyle={{ padding: "1% 1% 20px" }}
                            items={response}
                            notifyChange={notifyChange}
                            type={"article"}
                        />
                }
            </div>
        </>
    )
}
