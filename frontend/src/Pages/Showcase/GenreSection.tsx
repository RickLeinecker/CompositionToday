import GenrePaper from './GenrePaper';
import { Grid } from '@mui/material';
import { gridStyle } from './inlineStyles';
import { genreType } from '../../ObjectInterface';

type GenreSectionProps = {
    genres: genreType[];
    setGenreClicked: React.Dispatch<React.SetStateAction<string>>;
}

export default function GenreSection({ genres, setGenreClicked }: GenreSectionProps) {
    return (
        <>
            <h1 className="header">Discover Composers By Genre</h1>

            {/* Use an API that randomly selects genre types */}
            <div className="container">
                <Grid container>
                    {
                        genres?.map((genre) => {
                            return (
                                <Grid
                                    key={genre.tagName}
                                    sx={gridStyle}
                                    item
                                    container
                                    xs={12}
                                    sm={6}
                                    lg={3}
                                    justifyContent="center"
                                >
                                    <GenrePaper genre={genre} setGenreClicked={setGenreClicked} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </>
    )
}