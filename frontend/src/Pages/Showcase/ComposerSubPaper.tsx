import { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Grid, IconButton, Paper, Slide } from '@mui/material'
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ReplayIcon from '@mui/icons-material/Replay';
import { style2, style3 } from './inlineStyles';
import paperStyle from './PaperStyle.module.scss';
import { PlayerContext } from './PlayerContext';
import { toast } from 'react-toastify';

type ComposerSubPaperProps = {
    audioFilepath: string | null;
    audioFilename: string | null;
    imagePath: string | null;
    username: string | null;
}

export default function ComposerSubPaper({ audioFilename, audioFilepath, imagePath, username }: ComposerSubPaperProps) {
    const [hovering, setHovering] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const containerRef = useRef(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { stopAllPlayers, setStopAllPlayers } = useContext(PlayerContext);
    const navigate = useNavigate();

    useEffect(() => {
        !playing ? audioRef?.current?.pause() : audioRef?.current?.play();
        console.log("Current Time: " + audioRef?.current?.currentTime);
        console.log("Duration: " + audioRef?.current?.duration);
    }, [playing]);

    useEffect(() => {
        setPlaying(false);

        if (playing && pressed)
            setPlaying(true);

        setPressed(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stopAllPlayers])

    const handleClick = (e: any) => {
        e.stopPropagation();

        if (username === null)
            toast.error('This user does not have a profile.');
        else
            navigate(`/profile/${username}`);
    }

    const handlePlay = (e: any) => {
        e.stopPropagation();
        e.preventDefault();

        if (!hasEnded) {
            setPressed(true);
            setPlaying(p => !p)
            setStopAllPlayers!(p => !p);
        }
        else {
            setPlaying(false);
            setHasEnded(false);

            if (audioRef.current !== null)
                audioRef.current.currentTime = 0;
        }
    }

    const handleRewind = () => {
        if (audioRef.current !== null) {
            audioRef.current.currentTime -= 5;
            setHasEnded(false);
        }
    }

    const handleForward = () => {
        if (audioRef.current !== null)
            audioRef.current.currentTime += 5;
    }

    const handleEndOfSong = () => {
        setPlaying(false);
        setHasEnded(true);
        console.log("ENDED");
    }

    const handleEnter = () => {
        setHovering(true);
    }

    const handleLeave = () => {
        setHovering(false);
    }

    if (imagePath === null)
        imagePath = '/img_avatar.png';

    // console.log("Checking out path: " + audioFilepath)
    console.log("Is playing: " + !audioRef?.current?.paused)

    return (
        <Paper elevation={1} sx={{ ...style2, backgroundImage: `url(${imagePath})`, backgroundSize: paperStyle.innerSize }} onClick={handleClick} onMouseEnter={handleEnter} onMouseLeave={handleLeave} >
            <Grid container direction="column" item minHeight='100%' alignItems="stretch" justifyContent="flex-end" >
                {
                    audioFilepath &&
                    <Box overflow="hidden" ref={containerRef} >
                        <Slide direction="up" in={hovering} container={containerRef.current} >
                            <Paper elevation={1} sx={style3} onClick={e => e.stopPropagation()}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                    <audio ref={audioRef} onEnded={handleEndOfSong} >
                                        <source src={audioFilepath} type="audio/mpeg" />
                                    </audio>

                                    <IconButton aria-label="previous" onClick={handleRewind}>
                                        <FastRewindIcon sx={{ color: 'white', height: 20, width: 20 }} />
                                    </IconButton>
                                    <IconButton aria-label="play/pause" onClick={handlePlay}>
                                        {
                                            !hasEnded
                                                ? !playing
                                                    ? <PlayArrowIcon sx={{ color: 'white', height: 30, width: 30 }} />
                                                    : <PauseIcon sx={{ color: 'white', height: 30, width: 30 }} />
                                                : <ReplayIcon sx={{ color: 'white', height: 30, width: 30 }} />
                                        }
                                    </IconButton>
                                    <IconButton aria-label="next" onClick={handleForward}>
                                        <FastForwardIcon sx={{ color: 'white', height: 20, width: 20 }} />
                                    </IconButton>
                                </Box>
                            </Paper>
                        </Slide>
                    </Box>
                }
            </Grid>
        </Paper>
    );
}