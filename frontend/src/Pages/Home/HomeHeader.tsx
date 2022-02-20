import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import FilterFeed from './FilterFeed'
import SortFeed from './SortFeed'
import ArticleIcon from '@mui/icons-material/Article';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TodayIcon from '@mui/icons-material/Today';
import useOpen from '../../Helper/CustomHooks/useOpen';
import CreateEventModal from '../Profile/Events/CreateEventModal';
import CreateArticleModal from '../Profile/Articles/CreateArticleModal';
import CreateMusicModal from '../Profile/Music/CreateMusicModal';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { TagType } from '../../ObjectInterface';

type Props = {
    updateFilterBy: (newValue: string) => void
    sortBy: string;
    updateSortBy: (newValue: string) => void
    uid: string;
}

export default function HomeHeader({ updateFilterBy, updateSortBy, sortBy, uid }: Props) {

    const { open: createArticleOpen, handleClick: handleArticleOpenCreate, handleClose: handleArticleCloseCreate } = useOpen();
    const { open: createMusicOpen, handleClick: handleMusicOpenCreate, handleClose: handleMusicCloseCreate } = useOpen();
    const { open: createEventOpen, handleClick: handleEventOpenCreate, handleClose: handleEventCloseCreate } = useOpen();
    const [tagOptions, setTagOptions] = useState<Array<TagType>>();


    // get tags
    useEffect(() => {
        fetchTags();
        async function fetchTags() {

            try {
                let answer = (await GenericGetHandler("getTags"));
                if (answer.error.length > 0) {
                    // setError(answer.error);
                    return;
                }

                // setError("");
                const result = await answer.result;
                setTagOptions(result);

                // setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
    }, []);

    return (
        <div>
            <div style={{ position: "relative", display: "flex", marginTop: "1%", justifyContent: "center" }}>
                <div className='create-post-box'>
                    <div style={{ position: "relative", display: "flex", margin: "2%", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ flex: "7 0 0" }}>
                            <h1>Create new: </h1>
                            <Button color="primary" variant="outlined" style={{ margin: "2%" }} onClick={handleArticleOpenCreate} startIcon={<ArticleIcon />}>
                                Article
                            </Button>
                            <Button variant="outlined" style={{ margin: "2%" }} onClick={handleMusicOpenCreate} startIcon={<MusicNoteIcon />}>
                                Music
                            </Button>
                            <Button variant="outlined" style={{ margin: "2%" }} onClick={handleEventOpenCreate} startIcon={<TodayIcon />}>
                                Event
                            </Button>
                        </div>
                        <div style={{ flex: "1 0 0" }}>
                            <FilterFeed updateFilterBy={updateFilterBy} />
                            <SortFeed sortBy={sortBy || ""} updateSortBy={updateSortBy} />
                        </div>
                    </div>
                </div>
            </div>
            <CreateEventModal uid={uid} createOpen={createEventOpen} handleCloseCreate={handleEventCloseCreate} notifyChange={() => { } } tagOptions={tagOptions}/>
            <CreateArticleModal uid={uid} createOpen={createArticleOpen} handleCloseCreate={handleArticleCloseCreate} notifyChange={() => { } }/>
            <CreateMusicModal uid={uid} createOpen={createMusicOpen} handleCloseCreate={handleMusicCloseCreate} notifyChange={() => { } }/>
        </div>
    )
}
