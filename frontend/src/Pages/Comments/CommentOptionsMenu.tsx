import { MenuList, MenuItem, ListItemIcon, ListItemText, Popover } from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DefaultValues from '../../Styles/DefaultValues.module.scss'

type Props = {
    handleOpenDelete: () => void;
}

export default function GenericCardMenu({ handleOpenDelete }: Props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <MoreVertIcon onClick={handleClick} fontSize="medium" style={{ cursor: "pointer", color: DefaultValues.secondaryText }} />
            <Popover open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}>
                <MenuList>
                    <MenuItem onClick={() => { handleOpenDelete(); handleClose(); }}>
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText>Delete</ListItemText>
                    </MenuItem>
                </MenuList>
            </Popover>
        </>
    );
}
