import { Grid } from '@mui/material';
import { Container } from 'react-bootstrap';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import TopNavBar from '../TopNavBar';
import ComposerPaper from './ComposerPaper';
import GenrePaper from './GenrePaper';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import './ShowcaseStyle.scss';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

export default function Showcase() {
    const [genres, setGenres] = useState(['Classical', 'Film Score', 'Opera', 'Symphony']);

    const shuffleArray = (array: string[]) => {
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
            let list: string[] = answer.result.map((obj: any) => obj.tagName);
            shuffleArray(list);

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
                                    <Grid item container xs={6} sm={3} justifyContent="center">
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
