import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Container } from 'react-bootstrap';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import TopNavBar from '../TopNavBar';
import ComposerPaper from './ComposerPaper';
import GenrePaper from './GenrePaper';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import './ShowcaseStyle.scss';
import { toast } from 'react-toastify';
import { genreType } from '../../ObjectInterface';

const defaultGenres: genreType[] = [
    { tagName: 'Classical', imageFilepath: 'http://compositiontoday.net/images/pexels-ylanite-koppens-697672.jpg' },
    { tagName: 'Film Score', imageFilepath: 'http://compositiontoday.net/images/pexels-kyle-loftus-2510428.jpg' },
    { tagName: 'Opera', imageFilepath: 'http://compositiontoday.net/images/pexels-pixabay-63328.jpg' },
    { tagName: 'Symphony', imageFilepath: 'http://compositiontoday.net/images/pexels-afroromanzo-4028878.jpg' },
]

export default function Showcase() {
    const [genres, setGenres] = useState<genreType[]>(defaultGenres);

    const shuffleArray = (array: object[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const getGenres = async () => {
        try {
            let answer = await GenericGetHandler("getComposerGenres");
            let list: genreType[] = answer.result;
            console.log(list)
            shuffleArray(list);
            console.log(list)

            setGenres(list.slice(0, 4));
        } catch (e: any) {
            toast.error('Failed to retrieve data');
        }
    }

    useEffect(() => {
        getGenres();
    }, [])

    return (
        <>
            <TopNavBar />
            <Container>
                <h1>Showcase</h1>
                <GenericSearch />
                <h1 className="header" >Featured Composers</h1>

                <div className="container">
                    <Grid container>
                        <Grid item container xs={6} lg={3} justifyContent="center">
                            <ComposerPaper />
                        </Grid>
                        <Grid item container xs={6} lg={3} justifyContent="center">
                            <ComposerPaper />
                        </Grid>
                        <Grid item container xs={6} lg={3} justifyContent="center">
                            <ComposerPaper />
                        </Grid>
                        <Grid item container xs={6} lg={3} justifyContent="center">
                            <ComposerPaper />
                        </Grid>
                    </Grid>
                </div>



                <h1 className="header">Discover Composers By Genre</h1>

                {/* Use an API that randomly selects genre types */}
                <div className="container">
                    <Grid container>
                        {
                            genres.map((genre) => {
                                return (
                                    <Grid key={genre.tagName} item container xs={6} sm={3} justifyContent="center">
                                        <GenrePaper genre={genre} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>
            </Container>
        </>
    )
}
