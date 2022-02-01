import { Paper } from '@mui/material';
import { style, genreStyle } from './inlineStyles';
import { genreType } from '../../ObjectInterface';

type GenreProps = {
    genre: genreType;
}

export default function GenrePaper({ genre }: GenreProps) {
    return (
        <Paper elevation={3} sx={{ ...style, ...genreStyle, backgroundImage: `url(${genre.imageFilepath})`}} onClick={() => console.log("tada")} >
            <p className='genre-text'>{genre.tagName}</p>
        </Paper>
    );
}