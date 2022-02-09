import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';

export default function CommentCompose() {

    const[comment, setComment] = useState<string>("");
    return (
        <div style={{width: "80%", display: "flex", alignContent: "center", margin: "1% auto"}}>
            <TextField
                label={"Post a comment..."}
                variant="outlined"
                fullWidth
                onChange={e => setComment(e.target.value)}
                value={comment}
                multiline
                style={{borderRadius: "8em", marginRight: "2%"}}
            />
            <Button>
                <SendIcon/>
            </Button>
        </div>
        
    );
}
