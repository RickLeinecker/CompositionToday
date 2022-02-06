import { Popover, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

type Props = {
    closeMenu: (newIsLiked: boolean) => void
    anchorEl: any;
    likeType: string | null;
}

export default function GenericLikeMenu({ closeMenu, anchorEl, likeType}: Props) {
    const [alignment, setAlignment] = useState<string | null>(likeType);
    const [likeCount, setLikeCount] = useState<number>(0);
    const [loveCount, setLoveCount] = useState<number>(0);

    const open = Boolean(anchorEl);
    const didMountRef = useRef(false);
    
    useEffect(() => {
        if(didMountRef.current)
            handleClose();

        // onMount
        if(!didMountRef.current){
            didMountRef.current = true;
            // fetchLikeCounts
        }
    }, [alignment])

    const handleClose = () => {
        alignment === null ? closeMenu(false) : closeMenu(true);
    };

    const handleChange = (event: any, newAlignment: string | null) => {
        setAlignment(newAlignment);
    };    

  return (
    <>
    <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{vertical: 'bottom', horizontal: 'left',}}>
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            >
            <ToggleButton value="like">
                <p>{likeCount}</p>
                <FavoriteIcon></FavoriteIcon>
            </ToggleButton>
            <ToggleButton value="love">
                <p>{loveCount}</p>
                <ThumbUpIcon></ThumbUpIcon>
            </ToggleButton>
        </ToggleButtonGroup>
    </Popover>
    </>
  );
}
