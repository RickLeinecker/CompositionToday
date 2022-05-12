import { useEffect, useState } from 'react'
import GenericVirtualizedList from '../../Helper/Generics/GenericVirtualizedList';
import { ContentType, GenericHandlerType } from '../../ObjectInterface';
import GenericHandler from '../../Handlers/GenericHandler';
import DefaultValues from '../../Styles/DefaultValues.module.scss';
import { Alert } from 'react-bootstrap';
import './BlogStyle.scss';

export default function Blog() {
    const [response, setResponse] = useState<Array<ContentType> | undefined>(undefined);
    const [error, setError] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    const [loading, setLoading] = useState(true);

    const notifyChange = () => { setHasChanged(value => !value); }

    // useEffect(() => {
    //     window.location.replace("http://compositiontoday.net/comptodayblog");
    // },[])


    useEffect(() => {
        async function fetchData() {

            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ contentType: "article", uid: "UnDFelxKGZboK34C5Qqx4asGQpD3" }),
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
    }, [hasChanged])

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Admin Blog Posts</h1>
            <div style={{ margin: "auto" }}>
                {!error && loading ? <div>...loading</div>
                    :
                    error ?
                        <Alert variant="danger">{error}</Alert>
                        :
                        <div className='blog-container'>
                            <GenericVirtualizedList
                                bodyStyle={{ width: "100%", height: "82vh" }}
                                individualStyle={{ padding: "1% 1% 20px", right: "0", marginLeft: "auto", marginRight: "auto" }}
                                items={response}
                                notifyChange={notifyChange}
                                type={"article"}
                            />
                        </div>

                }

            </div>
        </>
    );
}
