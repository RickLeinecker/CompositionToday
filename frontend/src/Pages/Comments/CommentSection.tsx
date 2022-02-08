import React, { useEffect, useState } from 'react';
import GenericHandler from '../../Handlers/GenericHandler';
import GenericVirtualizedList from '../../Helper/Generics/GenericVirtualizedList';
import { CommentType, GenericHandlerType } from '../../ObjectInterface';

type Props = {
    contentID: number;
    notifyChange: () => void;
}

export default function CommentSection({contentID, notifyChange}: Props) {
    const [response, setResponse] = useState<Array<CommentType> | undefined>(undefined);

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
                    return;
                }

                setResponse(await answer.result);

            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }

        }
        fetchData();
    }, [])
    
    return (
        <div>
            <GenericVirtualizedList
                bodyStyle={{ width: "100%", height: "20vh" }}
                individualStyle={{ padding: "1% 1% 20px" }}
                items={response}
                notifyChange={notifyChange}
                type={"comment"}
            />
        </div>
    );
}
