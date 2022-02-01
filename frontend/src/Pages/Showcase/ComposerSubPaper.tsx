import { useContext, useEffect, useRef, useState } from 'react'
import { Box, Grid, IconButton, Paper, Slide } from '@mui/material'
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { style2, style3 } from './inlineStyles';
import { PlayerContext } from './PlayerContext';

export default function ComposerSubPaper() {
    const [hovering, setHovering] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [pressed, setPressed] = useState(false);
    const containerRef = useRef(null);
    const { stopAllPlayers, setStopAllPlayers } = useContext(PlayerContext);

    console.log("Child Composer");

    useEffect(() => {
        setPlaying(false);

        if (playing && pressed)
            setPlaying(true);

        setPressed(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stopAllPlayers])

    const handleClick = (e: any) => {
        e.stopPropagation();
        console.log('top');
    }

    const handlePlay = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        setPressed(true);
        setPlaying(p => !p)
        setStopAllPlayers!(p => !p);
    }

    const handleEnter = () => {
        setHovering(true);
    }

    const handleLeave = () => {
        setHovering(false);
    }

    return (
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
                                    {
                                        !playing
                                            ? <PlayArrowIcon sx={{ color: 'white', height: 30, width: 30 }} />
                                            : <PauseIcon sx={{ color: 'white', height: 30, width: 30 }} />
                                    }
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
    );
}