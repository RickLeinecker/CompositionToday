import { Button } from '@mui/material'
import FilterFeed from './FilterFeed'
import SortFeed from './SortFeed'
import ArticleIcon from '@mui/icons-material/Article';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TodayIcon from '@mui/icons-material/Today';
import useOpen from '../../Helper/CustomHooks/useOpen';
import CreateEventModal from '../Profile/Events/CreateEventModal';
import CreateArticleModal from '../Profile/Articles/CreateArticleModal';
import CreateMusicModal from '../Profile/Music/CreateMusicModal';
import { TagType } from '../../ObjectInterface';
import { getAuth } from 'firebase/auth';

type Props = {
    updateFilterBy: (newValue: string) => void;
    sortBy: string;
    updateSortBy: (newValue: string) => void;
    updateTags: (newValue: Array<TagType>) => void;
    tags: Array<TagType>;
    uid: string;
}

export default function HomeHeader({ updateFilterBy, updateSortBy, sortBy, uid, updateTags, tags }: Props) {

    const { open: createArticleOpen, handleClick: handleArticleOpenCreate, handleClose: handleArticleCloseCreate } = useOpen();
    const { open: createMusicOpen, handleClick: handleMusicOpenCreate, handleClose: handleMusicCloseCreate } = useOpen();
    const { open: createEventOpen, handleClick: handleEventOpenCreate, handleClose: handleEventCloseCreate } = useOpen();

    return (
        <div>
            <div className="homefeed-header-box">
                {
                    getAuth().currentUser?.isAnonymous ?
                        <div className="create-content-box">
                        </div>
                        :
                        <div className="create-content-box">
                            <h2 className="create-content-header">Create new: </h2>
                            <Button style={{ margin: "2%" }} variant="outlined" onClick={handleArticleOpenCreate} startIcon={<ArticleIcon />}>
                                Article
                            </Button>
                            <Button style={{ margin: "2%" }} variant="outlined" onClick={handleMusicOpenCreate} startIcon={<MusicNoteIcon />}>
                                Music
                            </Button>
                            <Button style={{ margin: "2%" }} variant="outlined" onClick={handleEventOpenCreate} startIcon={<TodayIcon />}>
                                Event
                            </Button>
                        </div>
                }

                <div className="icons-box">
                    <FilterFeed updateFilterBy={updateFilterBy} updateTags={updateTags} tags={tags} />
                    <SortFeed sortBy={sortBy || ""} updateSortBy={updateSortBy} />
                </div>
            </div>
            <CreateEventModal uid={uid} createOpen={createEventOpen} handleCloseCreate={handleEventCloseCreate} notifyChange={() => { }} />
            <CreateArticleModal uid={uid} createOpen={createArticleOpen} handleCloseCreate={handleArticleCloseCreate} notifyChange={() => { }} />
            <CreateMusicModal uid={uid} createOpen={createMusicOpen} handleCloseCreate={handleMusicCloseCreate} notifyChange={() => { }} />
        </div>
    )
}
