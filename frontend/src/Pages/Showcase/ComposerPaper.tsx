import Marquee from "react-fast-marquee";
import ComposerSubPaper from './ComposerSubPaper';
import { composerType } from '../../ObjectInterface';
import { style, marqueeStyle } from './inlineStyles';
import { Grid, Paper } from '@mui/material';

type ComposerProps = {
    composer: composerType;
}

export default function ComposerPaper({ composer }: ComposerProps) {
    return (
        <Paper elevation={3} sx={style} onClick={() => console.log("tada")} >
            <Grid container item minHeight='100%' alignItems="center" justifyContent="center" >
                <Marquee style={{ ...marqueeStyle, top: '10px' }} delay={2} pauseOnHover gradientWidth={"20%"} gradientColor={[197, 218, 255]}>
                    {composer.audioFilename !== null ? composer.audioFilename : "Composer has no featured piece"}
                </Marquee>
                <ComposerSubPaper imagePath={composer.profilePicPath} username={composer.username} />
                <Marquee style={{ ...marqueeStyle, bottom: '10px' }} delay={2} pauseOnHover gradientWidth={"20%"} gradientColor={[197, 218, 255]}>
                    {`${composer.firstName} ${composer.lastName}`}
                </Marquee>
            </Grid>
        </Paper>
    );
}