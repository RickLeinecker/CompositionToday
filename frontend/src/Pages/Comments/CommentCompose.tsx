import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import { GenericHandlerType } from '../../ObjectInterface';
import GenericHandler from '../../Handlers/GenericHandler';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import "./CommentStyle.scss";
import DefaultValues from '../../Styles/DefaultValues.module.scss';

type Props = {
    notifyChange: () => void;
    contentID: number;
}

export default function CommentCompose({notifyChange, contentID}: Props) {

    const[comment, setComment] = useState<string>("");
    const currentUid = getAuth().currentUser?.uid;

    async function postComment(){

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: contentID,
                commenterUID: currentUid,
                comment: comment,
                approved: true,
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }),
            methodType: "POST",
            path: "createComment",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to post comment');
                return;
            }

            setComment("");
            notifyChange();
            toast.success('Comment created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to post comment');
        }
    }

    return (
        <div style={{width: "80%", display: "flex", alignContent: "center", margin: "1% auto", alignItems: "center"}}>
            <TextField
                // className="inputRounded"
                label={"Post a comment..."}
                variant="outlined"
                fullWidth
                onChange={e => setComment(e.target.value)}
                value={comment}
                inputProps={{maxLength: parseInt(DefaultValues.maxLengthMedium)}}
                style={{marginRight: "2%"}}
            />
            <Button onClick={postComment} style={{borderRadius: "100%"}}>
                <div style={{alignContent: "center", alignItems: "center", margin: "20% auto", marginLeft: "10%"}}>
                    <SendIcon/>
                </div>
            </Button>
        </div>
        
    );
}
