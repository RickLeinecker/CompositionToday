import { Box, Grid, Paper, Typography } from '@mui/material'
import { Container } from 'react-bootstrap'
import GenericSearch from '../../Helper/Generics/GenericSearch'
import TopNavBar from '../TopNavBar'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import showcaseStyle from './ShowcaseStyle.module.scss'

const style = { backgroundColor: DefaultValues.secondaryColor, height: showcaseStyle.paperSize, width: showcaseStyle.paperSize, borderRadius: '25px' };
const style2 = { height: '9rem', width: '9rem', borderRadius: '10px' };
const style3 = { backgroundColor: DefaultValues.primaryColor, height: '2.5rem', borderRadius: '10px' };

export default function Showcase() {
    const handleClick = (e: any) => {
        e.stopPropagation();
        console.log('top');
    }

    const handleHover = (e:any) => {
        console.log(e)
    }

    return (
        <>
            <TopNavBar />
            <Container>
                <Typography>Showcase</Typography>
                <GenericSearch />
                <Typography className="color">Featured Composers</Typography>

                <Grid container>
                    <Grid item container xs={6} lg={3} justifyContent="center">
                        <Paper elevation={3} sx={style} onClick={() => console.log("tada")} >
                            <Grid container item minHeight='100%' alignItems="center" justifyContent="center">
                                {/* <Grid item> */}
                                <Paper elevation={1} sx={style2} onClick={handleClick} >
                                    <Grid container direction="column" item minHeight='100%' alignItems="stretch" justifyContent="flex-end">
                                        <Paper elevation={1} sx={style3} onMouseOver={handleHover} >
                                            <Typography fontSize={"60%"}>Play Featured Song</Typography>
                                        </Paper>
                                    </Grid>
                                </Paper>
                                {/* </Grid> */}
                            </Grid>
                            {/* </Box> */}
                        </Paper>
                    </Grid>
                    <Grid item container xs={6} lg={3} justifyContent="center">
                        <Paper elevation={3} sx={style} />
                    </Grid>
                    <Grid item container xs={6} lg={3} justifyContent="center">
                        <Paper elevation={3} sx={style} />
                    </Grid>
                    <Grid item container xs={6} lg={3} justifyContent="center">
                        <Paper elevation={3} sx={style} />
                    </Grid>
                </Grid>

                <Typography>Discover Composers By Genre</Typography>

                <Grid container>
                    <Grid item container xs={6} sm={3} justifyContent="center">
                        <Paper elevation={3} sx={style} />
                    </Grid>
                    <Grid item container xs={6} sm={3} justifyContent="center">
                        <Paper elevation={3} sx={style} />
                    </Grid>
                    <Grid item container xs={6} sm={3} justifyContent="center">
                        <Paper elevation={3} sx={style} />
                    </Grid>
                    <Grid item container xs={6} sm={3} justifyContent="center">
                        <Paper elevation={3} sx={style} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
