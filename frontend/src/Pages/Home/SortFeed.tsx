import React, { useState } from 'react';
import SortIcon from '@mui/icons-material/Sort';
import { Popover, ToggleButton, ToggleButtonGroup } from '@mui/material';

type Props = {
    sortBy: string;
    updateSortBy: (newValue: string) => void
}

export default function SortFeed({sortBy, updateSortBy}: Props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: any, newSort: string) => {
        updateSortBy(newSort);
    };    

    return (
        <div>
            <SortIcon fontSize='large' onClick={handleClick} />
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                <ToggleButtonGroup
                    color="primary"
                    value={sortBy}
                    exclusive
                    orientation="vertical"
                    onChange={handleChange}
                >
                    <ToggleButton value="newest">Newest</ToggleButton>
                    <ToggleButton value="relevant">Relevant</ToggleButton>
                    <ToggleButton value="popular">Popular</ToggleButton>
                </ToggleButtonGroup>
            </Popover>
        </div>
    );
}
