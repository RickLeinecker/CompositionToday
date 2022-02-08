import { Paper } from '@mui/material';
import { style, genreStyle } from './inlineStyles';
import { genreType } from '../../ObjectInterface';
import { imgStyle } from './inlineStyles';

type GenreProps = {
    genre: genreType;
    setGenreClicked: React.Dispatch<React.SetStateAction<string>>;
}

export default function GenrePaper({ genre, setGenreClicked }: GenreProps) {
    const handleClick = () => {
        setGenreClicked(genre.tagName);
    }

    return (
        <Paper
            elevation={3}
            sx={{
                ...style,
                ...genreStyle
            }}
            onClick={handleClick}
        >
            <div style={imgStyle}>
                <img src={genre.imageFilepath} alt="genre" className='genre-image' style={imgStyle} />
                <p className='genre-text'>{genre.tagName}</p>
            </div>
        </Paper >
    );
}