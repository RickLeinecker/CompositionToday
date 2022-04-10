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
                <Marquee style={{ ...marqueeStyle, top: '10px' }} delay={2} pauseOnHover gradientWidth={"20%"} gradientColor={[69, 171, 255]}>
                    {composer.audioFilename !== null ? composer.audioFilename : "This composer has no featured piece🚫🎵"}
                </Marquee>
                <ComposerSubPaper audioFilename={composer.audioFilename} audioFilepath={composer.audioFilepath} imagePath={composer.profilePicPath} username={composer.username} />
                {/* TODO: Change from username to displayname */}
                <Marquee style={{ ...marqueeStyle, bottom: '10px' }} delay={2} pauseOnHover gradientWidth={"20%"} gradientColor={[69, 171, 255]}>
                    {`${composer.username}`}
                </Marquee> 
            </Grid>
        </Paper>
    );
}