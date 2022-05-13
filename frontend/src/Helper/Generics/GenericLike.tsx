import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GenericLikeMenu from './GenericLikeMenu';
import { GenericHandlerType, LikeType } from '../../ObjectInterface';
import GenericHandler from '../../Handlers/GenericHandler';
import { getAuth } from 'firebase/auth';

type Props = {
    contentID: number;
    likeCount: number;
    isLikedByLoggedInUser: boolean;
    isComment: boolean;
}

export default function GenericLike({ contentID, likeCount, isLikedByLoggedInUser, isComment }: Props) {

    const [isLiked, setIsLiked] = useState<boolean>(isLikedByLoggedInUser);
    const [currentLikeCount, setCurrentLikeCount] = useState<number>(likeCount);
    const [likeType, setLikeType] = useState<LikeType | null>(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const currentUid = getAuth().currentUser?.uid;
    const [isRefresh, setIsRefresh] = useState(false);

    function refresh() {
        setIsRefresh(!isRefresh);
    }

    function handleOpen(event: any) {
        console.log("we here")
        setAnchorEl(event.currentTarget);
    }

    function closeMenu(newIsLiked: boolean) {
        setAnchorEl(null)

        // update like state
        setIsLiked(newIsLiked);
    }

    function updateLikeCount(newCount: number) {
        setCurrentLikeCount(newCount);
    }

    useEffect(() => {
        async function didUserLikeContent() {

            const handlerObject: GenericHandlerType = isComment ?
                {
                    data: JSON.stringify({ commentID: contentID, uid: currentUid }),
                    methodType: "POST",
                    path: "didUserLikeComment",
                }
                :
                {
                    data: JSON.stringify({ contentID: contentID, uid: currentUid }),
                    methodType: "POST",
                    path: "didUserLikeContent",
                }

            try {
                let answer = (await GenericHandler(handlerObject));
                if (answer.error.length > 0) {
                    return;
                }
                setLikeType(await answer.result);

            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }

        }
        didUserLikeContent();
    }, [contentID, currentUid, isComment, isRefresh])

    return (
        <div style={{ cursor: 'pointer', float: "right", display: "flex", marginRight: "1%" }}>
            <p>{currentLikeCount || "0"}</p>
            {isLiked ? <FavoriteIcon style={{ marginLeft: "2%" }} onMouseEnter={handleOpen}></FavoriteIcon> : <></>}
            {!isLiked ? <FavoriteBorderIcon style={{ marginLeft: "2%" }} onMouseEnter={handleOpen}></FavoriteBorderIcon> : <></>}
            {anchorEl && <GenericLikeMenu
                anchorEl={anchorEl}
                closeMenu={closeMenu}
                contentID={contentID}
                isComment={isComment}
                currentUid={currentUid}
                likeType={likeType}
                refresh={refresh}
                updateLikeCount={updateLikeCount} />}
        </div>
    );
}
