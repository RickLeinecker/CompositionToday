import React, { useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { Checkbox, Container, FormControlLabel, FormGroup, FormLabel, IconButton, Popover } from '@mui/material';
import GenericTagsPicker from '../../Helper/Generics/GenericTagsPicker';
import { TagType } from '../../ObjectInterface';

type Props = {
    updateFilterBy: (newValue: string) => void
    updateTags: (newValue: Array<TagType>) => void;
    tags: Array<TagType>;
}

export default function FilterFeed({ updateFilterBy, updateTags, tags}: Props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isEventChecked, setIsEventChecked] = useState<boolean>(false);
    const [isMusicChecked, setIsMusicChecked] = useState<boolean>(false);
    const [isArticleChecked, setIsArticleChecked] = useState<boolean>(false);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: any, newValue: boolean) => {
        let type = event.currentTarget.name;

        if (type === "event") { setIsEventChecked(newValue); }
        if (type === "music") { setIsMusicChecked(newValue); }
        if (type === "article") { setIsArticleChecked(newValue); }

        updateFilterBy(type);
    };

    return (
        <div>
            <IconButton aria-label="filter" sx={{padding: "10%"}} onClick={handleClick}>
                <TuneIcon fontSize="large" />
            </IconButton>
            <Popover style={{}} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Container sx={{ mt: "10%", mb: "10%", borderRadius: "1em", width: "25vw"}}>
                    <FormLabel component="legend">Filter by type</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={isMusicChecked} onChange={handleChange} name="music" />
                            }
                            label="Music"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={isEventChecked} onChange={handleChange} name="event" />
                            }
                            label="Events"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={isArticleChecked} onChange={handleChange} name="article" />
                            }
                            label="Articles"
                        />
                    </FormGroup>
                    <FormLabel component="legend">Filter by tags</FormLabel>
                    <GenericTagsPicker updateTags={updateTags} defaultValue={tags}/>
                </Container>
            </Popover>
        </div>
    );
}
