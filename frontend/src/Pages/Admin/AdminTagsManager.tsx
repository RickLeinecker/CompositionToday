import React, { useEffect, useState } from 'react'
import AdminTagsVirtualizedList from './AdminTagsVirtualizedList'

export default function AdminTagsManager() {

    const [tagsChanged, setTagsChanged] = useState<boolean>(false);

    const notifyChange = () => {
        setTagsChanged(value => !value);
    }

    useEffect(() => {
        async function fetchTags() {

        }
        async function fetchGenres() {

        }
        fetchTags();
        fetchGenres();
    }, [tagsChanged])

    return (
        <>
            <div>
                <p>
                    Tags
                </p>
                {/* <AdminTagsVirtualizedList
                    bodyStyle={{ width: "100%", height: "30vh" }}
                    individualStyle={{ padding: "1% 1% 20px" }}
                    items={responseTags}
                    notifyChange={notifyChange}
                    type={"tag"}
                /> */}
            </div>

            <div>
                <p>
                    Genres
                </p>
                {/* <AdminTagsVirtualizedList
                    bodyStyle={{ width: "100%", height: "30vh" }}
                    individualStyle={{ padding: "1% 1% 20px" }}
                    items={responseGenres}
                    notifyChange={notifyChange}
                    type={"genre"}
                /> */}
            </div>
        </>
    )
}
