import { Paper } from '@mui/material';
import { style, genreStyle } from './inlineStyles';
import { genreType } from '../../ObjectInterface';

type GenreProps = {
    genre: genreType;
    setGenreClicked: React.Dispatch<React.SetStateAction<string>>;
}

export default function GenrePaper({ genre, setGenreClicked }: GenreProps) {
    const handleClick = () => {
        setGenreClicked(genre.tagName);
    }

    return (
        <Paper elevation={3} sx={{ ...style, ...genreStyle, backgroundImage: `url(${genre.imageFilepath})` }} onClick={handleClick} >
            <p className='genre-text'>{genre.tagName}</p>
        </Paper>
    );
}