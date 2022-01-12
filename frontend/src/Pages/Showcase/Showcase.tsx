import { Grid, Typography } from '@mui/material'
import { Container } from 'react-bootstrap'
import GenericSearch from '../../Helper/Generics/GenericSearch'
import TopNavBar from '../TopNavBar'
import { ComposerPaper, GenrePaper } from './StackedPaper'

export default function Showcase() {

    return (
        <>
            <TopNavBar />
            <Container>
                <Typography>Showcase</Typography>
                <GenericSearch />
                <Typography className="color">Featured Composers</Typography>

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

                <Typography>Discover Composers By Genre</Typography>

                {/* Use an API that randomly selects genre types */}
                <Grid container>
                    <Grid item container xs={6} sm={3} justifyContent="center">
                        <GenrePaper genre='Classical'/>
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
