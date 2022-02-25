import React, { useState } from 'react'
import GenericLike from './../../Helper/Generics/GenericLike';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentSection from './../Comments/CommentSection';

type Props = {
    clearCache: () => void;
    notifyVirtualizer: () => void;
    notifyChange: () => void;
    id: number;
    likeCount: number;
    isLikedByLoggedInUser: boolean;
}

export default function CardFooter({clearCache, notifyVirtualizer, notifyChange, id, likeCount, isLikedByLoggedInUser}: Props) {
    const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

    const handleCommentExpand = () => {
        setIsCommentsOpen(prev => !prev);
        clearCache();
        notifyVirtualizer();
    }
    
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <div style={{ cursor: "pointer", marginBottom: "-1%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                <GenericLike contentID={id} likeCount={likeCount} isLikedByLoggedInUser={isLikedByLoggedInUser} isComment={false} />
                {isCommentsOpen ?
                    <div onClick={handleCommentExpand}>
                        <ChatBubbleIcon />
                        <ArrowDropDownIcon />
                    </div>
                    :
                    <div onClick={handleCommentExpand}>
                        <ChatBubbleOutlineIcon />
                        <ArrowDropUpIcon />
                    </div>
                }
            </div>

            <div style={{margin: "auto", width: "100%"}}>
                {isCommentsOpen ? <CommentSection contentID={id} notifyParent={notifyChange} clearCache={clearCache} /> : <></>}
            </div>
        </div>
    )
}
