import { Button } from '@mui/material';
import React, { useState } from 'react';

type Props = {
    updateFile: (file: File) => void;
    type: string;
    name: string;
    filename: string 
}

export default function GenericFileUpload({updateFile, type, name, filename}: Props) {

    const fileSelectedHandler = (event: any) => {
        updateFile(event.target.files[0]);
        // setNewContentSheetMusic(event.target.files[0])
        // setNewContentSheetMusicFilename(event.target.files[0].name)
    }

    return(
        <div>
            <Button variant="contained" component="label">
                Upload {name}
                <input type="file" accept={type} onChange={fileSelectedHandler} hidden/>
            </Button>
            {filename}
        </div>
    )
}
