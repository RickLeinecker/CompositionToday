import { Paper, Typography } from '@mui/material';
import { style, genreStyle } from './inlineStyles';

type GenreProps = {
    genre: string;
}

export default function GenrePaper({ genre }: GenreProps) {
    return (
        <Paper elevation={3} sx={{ ...style, ...genreStyle }} onClick={() => console.log("tada")} >
            <Typography>{genre}</Typography>
        </Paper>
    );
}