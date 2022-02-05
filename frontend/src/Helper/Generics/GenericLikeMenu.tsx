import { Popover, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';

type Props = {
    menuTarget: any;
    updateOpenMenu: () => void
}

export default function GenericLikeMenu({ menuTarget, updateOpenMenu}: Props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [alignment, setAlignment] = React.useState('like');
    const open = Boolean(anchorEl);
    
    useEffect(() => {
        console.log("we in useeffect");
        handleClick(menuTarget);
    }, [menuTarget])

    const handleClick = (menuTarget: any) => {
        setAnchorEl(menuTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
        updateOpenMenu();
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
            <ToggleButton value="like">Like</ToggleButton>
            <ToggleButton value="love">Love</ToggleButton>
            <ToggleButton value="celebrate">Celebrate</ToggleButton>
        </ToggleButtonGroup>
    </Popover>
    </>
  );
}
