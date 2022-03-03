import { Divider } from '@mui/material';
import TagComponent from './TagComponent';
import GenreComponent from './GenreComponent';

export default function AdminTagsManager() {
    return (
        <>
            <TagComponent />
            <br></br>
            <Divider></Divider>
            <br></br>
            <GenreComponent />
        </>
    )
}
