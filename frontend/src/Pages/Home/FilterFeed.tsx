import React, { useEffect, useState } from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import { Checkbox, Container, FormControlLabel, FormGroup, FormLabel, Paper, Popover } from '@mui/material';

type Props = {
    filterByType: string[];
    updateFilterBy: (newValue: string[]) => void
}

export default function FilterFeed({ filterByType, updateFilterBy }: Props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isEventChecked, setIsEventChecked] = useState<boolean>(filterByType.includes("event"));
    const [isMusicChecked, setIsMusicChecked] = useState<boolean>(filterByType.includes("music"));
    const [isArticleChecked, setIsArticleChecked] = useState<boolean>(filterByType.includes("article"));

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: any, newValue: boolean) => {
        let type = event.currentTarget.name;
        let tempArr = filterByType;

        if(type === "event"){
            setIsEventChecked(newValue);
        }

        if(type === "music"){
            setIsMusicChecked(newValue);
        }

        if(type === "article"){
            setIsArticleChecked(newValue);
        }

        if(!newValue){
            tempArr = tempArr.filter(e => e !== type);
        }
        else if(!tempArr.includes(type)){
            tempArr.push(type);
        }
        
        updateFilterBy(tempArr);
    };

    return (
        <div>
            <TuneIcon fontSize="large" onClick={handleClick}/>
            <Popover style={{}} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Container sx={{mt:"10%"}}>
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
                </Container>
            </Popover>
        </div>
    );
}
