import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function GenericLike() {

    // we will replace userID with username
    const [userID, setUserID] = useState<number>();
    const [isLiked, setIsLiked] = useState<boolean>();
    const [likeID, setLikeID] = useState<number>();
    const [likeCount, setLikeCount] = useState<number>(0);

    function handleLike(){
        console.log("like");
        setIsLiked(true);
        setLikeCount(likeCount + 1);
    }

    function handleUnlike(){
        console.log("unlike");
        setIsLiked(false);
        setLikeCount(likeCount - 1);
    }

    useEffect(() => {
        async function fetchIsLiked(){
            console.log("fetch if we liked this, and the likeID")
        }
        fetchIsLiked();
    },[userID])

    useEffect(() => {
        let temp = parseInt(window.sessionStorage.getItem("userID")!);
        setUserID(!temp ? 0 : temp);
    }, [])

    return(
    <div style={{float: "right", display: "flex"}}>
        <p>{likeCount}</p>
        {isLiked && <FavoriteIcon style={{marginLeft:"10%"}} onClick={handleUnlike}></FavoriteIcon>}
        {!isLiked && <FavoriteBorderIcon style={{marginLeft:"10%"}} onClick={handleLike}></FavoriteBorderIcon>}
    </div>
    );
}
