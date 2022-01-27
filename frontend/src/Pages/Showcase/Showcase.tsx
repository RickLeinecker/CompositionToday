import { Grid } from '@mui/material';
import { Container } from 'react-bootstrap';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import TopNavBar from '../TopNavBar';
import ComposerPaper from './ComposerPaper';
import GenrePaper from './GenrePaper';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import './ShowcaseStyle.scss';
import { GenericHandlerType } from '../../ObjectInterface';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function Showcase() {

    const getGenres = async () => {
        try {
            let answer = await GenericGetHandler("getComposerGenres");
            // if (answer.error.length > 0) {
            //     toast.error('Failed to get data');
            //     return;
            // }
            console.log(answer.result.map((obj:any) => obj.tagName));
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create experience');
        }
    }

    useEffect(() => {
        getGenres();
    }, [])

    // GenericGetHandler('getComposerGenres').then(res => { JSON.parse(res).then((ans: any) => { console.log(ans) }) });

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
                        <Grid item container xs={6} sm={3} justifyContent="center">
                            <GenrePaper genre='Classical' />
                        </Grid>
                        <Grid item container xs={6} sm={3} justifyContent="center">
                            <GenrePaper genre='Film Score' />
                        </Grid>
                        <Grid item container xs={6} sm={3} justifyContent="center">
                            <GenrePaper genre='Opera' />
                        </Grid>
                        <Grid item container xs={6} sm={3} justifyContent="center">
                            <GenrePaper genre='Symphony' />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </>
    )
}
