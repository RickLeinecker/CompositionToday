import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import GenericHandler from '../../Handlers/GenericHandler';
import GenericVirtualizedList from '../../Helper/Generics/GenericVirtualizedList';
import { CommentType, GenericHandlerType } from '../../ObjectInterface';
import DefaultValues from '../../Styles/DefaultValues.module.scss';

type Props = {
    contentID: number;
}

export default function CommentSection({contentID}: Props) {
    const [response, setResponse] = useState<Array<CommentType> | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [commentHasChanged, setCommentHasChanged] = useState<boolean>(false);

    const notifyChange = () => {
        setCommentHasChanged(value => !value);
    }

    useEffect(() => {
        async function fetchData() {
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ contentID: contentID}),
                methodType: "POST",
                path: "getCommentsForContent",
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
    }, [commentHasChanged, contentID])
    
    return (
        <div>
            {!error && loading ? <div>...loading</div>
                    :
                    error ?
                        <Alert variant="danger">{error}</Alert>
                        :
                        <div>
                            <GenericVirtualizedList
                                bodyStyle={{ width: "100%", height: "20vh" }}
                                individualStyle={{ padding: "1% 1% 20px" }}
                                items={response}
                                notifyChange={notifyChange}
                                type={"comment"}
                            />
                        </div>
            }
        </div>
    );
}
