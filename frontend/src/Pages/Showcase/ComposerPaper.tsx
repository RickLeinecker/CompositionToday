import { useRef, useState } from 'react'
import { Box, Grid, IconButton, Paper, Slide } from '@mui/material'
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import Marquee from "react-fast-marquee";
import { style, style2, style3, marqueeStyle } from './inlineStyles';
import { composerType } from '../../ObjectInterface';


type ComposerProps = {
    composer: composerType;
}

export default function ComposerPaper({ composer }: ComposerProps) {
    const [hovering, setHovering] = useState(false);
    const [playing, setPlaying] = useState(false);
    const containerRef = useRef(null);

    const handleClick = (e: any) => {
        e.stopPropagation();
        console.log('top');
    }

    const handlePlay = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('to swap')
        // have use context to make all other playing states false
        // then do the below:
        setPlaying(p => !p)
    }

    const handleEnter = () => {
        setHovering(true);
    }

    const handleLeave = () => {
        setHovering(false);
    }

    return (
        <Paper elevation={3} sx={style} onClick={() => console.log("tada")} >
            <Grid container item minHeight='100%' alignItems="center" justifyContent="center" >
                <Marquee style={{ ...marqueeStyle, top: '10px' }} delay={2} pauseOnHover gradientWidth={"30%"} gradientColor={[197, 218, 255]}>
                    {`Do not go gentle into that good night`}
                </Marquee>
                <Paper elevation={1} sx={style2} onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
                    <Grid container direction="column" item minHeight='100%' alignItems="stretch" justifyContent="flex-end" >
                        <Box overflow="hidden" ref={containerRef} >
                            <Slide direction="up" in={hovering} container={containerRef.current} >
                                <Paper elevation={1} sx={style3} onClick={e => e.stopPropagation()}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                        <IconButton aria-label="previous">
                                            <FastRewindIcon sx={{ color: 'white', height: 20, width: 20 }} />
                                        </IconButton>
                                        <IconButton aria-label="play/pause" onClick={handlePlay}>
                                            {!playing ? <PlayArrowIcon sx={{ color: 'white', height: 30, width: 30 }} /> : <PauseIcon sx={{ color: 'white', height: 30, width: 30 }} />}
                                        </IconButton>
                                        <IconButton aria-label="next">
                                            <FastForwardIcon sx={{ color: 'white', height: 20, width: 20 }} />
                                        </IconButton>
                                    </Box>
                                </Paper>
                            </Slide>
                        </Box>
                    </Grid>
                </Paper>
                <Marquee style={{ ...marqueeStyle, bottom: '10px' }} delay={2} pauseOnHover gradientWidth={"20%"} gradientColor={[197, 218, 255]}>
                    {`${composer.firstName} ${composer.lastName}`}
                </Marquee>
            </Grid>
        </Paper>
    );
}