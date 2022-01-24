import { Grid } from '@mui/material';
import { Container } from 'react-bootstrap';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import TopNavBar from '../TopNavBar';
import ComposerPaper from './ComposerPaper';
import GenrePaper from './GenrePaper';
import './ShowcaseStyle.scss';

export default function Showcase() {

    return (
        <>
            <TopNavBar />
            <Container>
                <h1>Showcase</h1>
                <GenericSearch />
                <h1 className="header" >Featured Composers</h1>

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

                

                <h1 className="header">Discover Composers By Genre</h1>

                {/* Use an API that randomly selects genre types */}
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
            </Container>
        </>
    )
}
