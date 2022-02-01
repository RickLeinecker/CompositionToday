import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Container } from 'react-bootstrap';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import TopNavBar from '../TopNavBar';
import ComposerPaper from './ComposerPaper';
import GenrePaper from './GenrePaper';
// import GenericHandler from '../../Handlers/GenericHandler';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { toast } from 'react-toastify';
import { genreType } from '../../ObjectInterface';
import { gridStyle } from './inlineStyles';
import './ShowcaseStyle.scss';

export default function Showcase() {
    const [genres, setGenres] = useState<genreType[]>([]);
    const [featuredComposers, setFeaturedComposers] = useState<any[]>([]);


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
            // console.log(list)
            shuffleArray(list);
            // console.log(list)

            setGenres(list.slice(0, 4));
        } catch (e: any) {
            toast.error('Failed to retrieve data');
        }
    }

    const getFeaturedComposers = async () => {
        try {
            let answer = await GenericGetHandler("getComposersForShowcase");
            let list: any[] = answer.result;
            console.log(list)
            shuffleArray(list);
            console.log(list)

            setFeaturedComposers(list.slice(0, 4));
        } catch (e: any) {
            toast.error('Failed to retrieve data');
        }
    }

    useEffect(() => {
        getFeaturedComposers();
        getGenres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        {
                            featuredComposers?.map((featuredComposer) => {
                                return (
                                    <Grid
                                        key={featuredComposer.id}
                                        sx={gridStyle}
                                        item
                                        container
                                        xs={12}
                                        sm={6}
                                        lg={3}
                                        justifyContent="center"
                                    >
                                        <ComposerPaper composer={featuredComposer} />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </div>



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
