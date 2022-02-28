import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { TagType } from '../../ObjectInterface';
import AdminTagsVirtualizedList from './AdminTagsVirtualizedList'

export default function AdminTagsManager() {

    const [tagsChanged, setTagsChanged] = useState<boolean>(false);
    const [responseTags, setResponseTags] = useState<Array<TagType> | undefined>(undefined);
    const [responseGenres, setResponseGenres] = useState<Array<TagType> | undefined>(undefined);

    const notifyChange = () => {
        setTagsChanged(value => !value);
    }

    useEffect(() => {
        async function fetchTags() {
            try {
                let answer = (await GenericGetHandler("getTags"));
                if (answer.error.length > 0) {
                    // setError(answer.error);
                    return;
                }

                // setError("");
                const result = await answer.result;
                setResponseTags(result);

                // setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
        async function fetchGenres() {
            try {
                let answer = (await GenericGetHandler("getComposerGenres"));
                if (answer.error.length > 0) {
                    // setError(answer.error);
                    return;
                }

                // setError("");
                const result = await answer.result;
                setResponseGenres(result);

                // setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
        fetchTags();
        fetchGenres();
    }, [tagsChanged])

    return (
        <>
            <div>
                <p style={{textDecoration: "underline"}}>
                    Tags
                </p>
                <AdminTagsVirtualizedList
                    bodyStyle={{ width: "100%", height: "30vh" }}
                    individualStyle={{ padding: "1% 1% 20px" }}
                    items={responseTags}
                    notifyChange={notifyChange}
                    type={"tag"}
                />
            </div>
            <br></br>
            <Divider></Divider>
            <br></br>
            <div>
                <p style={{textDecoration: "underline"}}>
                    Genres
                </p>
                <AdminTagsVirtualizedList
                    bodyStyle={{ width: "100%", height: "30vh" }}
                    individualStyle={{ padding: "1% 1% 20px" }}
                    items={responseGenres}
                    notifyChange={notifyChange}
                    type={"genre"}
                />
            </div>
        </>
    )
}
