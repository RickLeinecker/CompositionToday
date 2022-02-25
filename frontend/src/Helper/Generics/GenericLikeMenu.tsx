import { Popover, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { GenericHandlerType, LikeType } from '../../ObjectInterface';
import GenericHandler from '../../Handlers/GenericHandler';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CelebrationIcon from '@mui/icons-material/Celebration';

type Props = {
    closeMenu: (newIsLiked: boolean) => void
    anchorEl: any;
    contentID: number;
    currentUid: string | undefined;
    likeType: LikeType | null;
    refresh: () => void;
    updateLikeCount: (newCount: number) => void;
    isComment: boolean;
}

export default function GenericLikeMenu({ closeMenu, anchorEl, contentID, currentUid, likeType, refresh, updateLikeCount, isComment}: Props) {
    const [alignment, setAlignment] = useState<string>(likeType?.likeType || "");
    const [likeCount, setLikeCount] = useState<number>(0)
    const [likedCount, setLikedCount] = useState<number>(0);
    const [lovedCount, setLovedCount] = useState<number>(0);
    const [celebratedCount, setCelebratedCount] = useState<number>(0);
    const [jammedCount, setJammedCount] = useState<number>(0);

    const open = Boolean(anchorEl);
    const didMountRef = useRef(false);

    async function createLike(){
        let likeTypeID = -1;
        if(alignment === 'thumbs_up'){
            likeTypeID = 0;
        }
        else if(alignment === 'music_notes'){
            likeTypeID = 1;
        }
        else if(alignment === 'celebration'){
            likeTypeID = 5;
        }
        else if(alignment === 'heart'){
            likeTypeID = 3;
        }

        const handlerObject: GenericHandlerType = isComment ? 
        {
            data: JSON.stringify({ 
                commentID: contentID, 
                uid: currentUid, 
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                likeTypeID: likeTypeID,
            }),
            methodType: "POST",
            path: "createLikeForComment",
        }
        :
        {
            data: JSON.stringify({ 
                contentID: contentID, 
                uid: currentUid, 
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                likeTypeID: likeTypeID,
            }),
            methodType: "POST",
            path: "createLikeForContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                return;
            }

            updateLikeCount(likeCount + 1)
            refresh();

        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    }

    async function updateLike(){
        let likeTypeID = -1;
        if(alignment === 'thumbs_up'){
            likeTypeID = 0;
        }
        else if(alignment === 'music_notes'){
            likeTypeID = 1;
        }
        else if(alignment === 'celebration'){
            likeTypeID = 5;
        }
        else if(alignment === 'heart'){
            likeTypeID = 3;
        }

        const handlerObject: GenericHandlerType = isComment ? 
        {
            data: JSON.stringify({ 
                likeID: likeType?.likeID,
                commentID: contentID, 
                uid: currentUid, 
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                likeTypeID: likeTypeID,
            }),
            methodType: "PATCH",
            path: "updateLike",
        }
        : 
        {
            data: JSON.stringify({ 
                likeID: likeType?.likeID,
                contentID: contentID, 
                uid: currentUid, 
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                likeTypeID: likeTypeID,
            }),
            methodType: "PATCH",
            path: "updateLike",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                return;
            }

            refresh();

        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    }

    async function deleteLike(){
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({ 
                likeID: likeType?.likeID,
            }),
            methodType: "DELETE",
            path: "deleteLike",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                return;
            }

            updateLikeCount(likeCount - 1);
            refresh();

        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const handlerObject: GenericHandlerType = isComment ? 
            {
                data: JSON.stringify({ commentID: contentID}),
                methodType: "POST",
                path: "getLikeCountForComment",
            }
            :
            {
                data: JSON.stringify({ contentID: contentID}),
                methodType: "POST",
                path: "getLikeCountForContent",
            }

            try {
                let answer = (await GenericHandler(handlerObject));
                if (answer.error.length > 0) {
                    return;
                }

                setLikeCount(await answer.result[0].likeCount);
                setLikedCount(await answer.result[0].likedCount);
                setLovedCount(await answer.result[0].lovedCount);
                setCelebratedCount(await answer.result[0].celebratedCount);
                setJammedCount(await answer.result[0].jammedCount);

            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }

        }
        fetchData();
    }, [contentID, currentUid])
    
    useEffect(() => {
        if(didMountRef.current){
            // update
            if(alignment !== null && likeType?.isLiked){
                updateLike();
            }
            // create
            else if(alignment !== null && !likeType?.isLiked){
                createLike();
            }
            // delete
            else if(alignment === null && likeType?.isLiked){
                deleteLike();
            }
            handleClose();
        }

        // onMount
        if(!didMountRef.current){
            didMountRef.current = true;
        }
    }, [alignment])

    const handleClose = () => {
        (alignment === null || alignment === "") ? closeMenu(false) : closeMenu(true);
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
            <ToggleButton value="heart">
                <p>{lovedCount}</p>
                <FavoriteIcon/>
            </ToggleButton>
            <ToggleButton value="thumbs_up">
                <p>{likedCount}</p>
                <ThumbUpIcon/>
            </ToggleButton>
            <ToggleButton value="celebration">
                <p>{celebratedCount}</p>
                <CelebrationIcon/>
            </ToggleButton>
            <ToggleButton value="music_notes">
                <p>{jammedCount}</p>
                <MusicNoteIcon/>
            </ToggleButton>
        </ToggleButtonGroup>
    </Popover>
    </>
  );
}
