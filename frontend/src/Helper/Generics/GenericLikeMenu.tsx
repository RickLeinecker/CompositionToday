import { Popover, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

type Props = {
    closeMenu: () => void
    anchorEl: any;
}

export default function GenericLikeMenu({ closeMenu, anchorEl}: Props) {
    const [alignment, setAlignment] = useState('like');
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
        closeMenu();
    };

    const handleChange = (event: any, newAlignment: string) => {
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
                <p>0</p>
                <FavoriteIcon></FavoriteIcon>
            </ToggleButton>
            <ToggleButton value="love">
                <p>0</p>
                <ThumbUpIcon></ThumbUpIcon>
            </ToggleButton>
        </ToggleButtonGroup>
    </Popover>
    </>
  );
}
