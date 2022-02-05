import React, { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GenericLikeMenu from './GenericLikeMenu';

export default function GenericLike() {

    // we will replace userID with username
    const [username, setUsername] = useState<string>("");
    const [isLiked, setIsLiked] = useState<boolean>();
    const [likeID, setLikeID] = useState<number>();
    const [likeCount, setLikeCount] = useState<number>(0);
    const [anchorEl, setAnchorEl] = useState(null);

    function handleClick(event: any){
        setAnchorEl(event.currentTarget);
    }

    function closeMenu(){
        setAnchorEl(null)
    }

    useEffect(() => {
        async function fetchIsLiked(){
            console.log("fetch if we liked this, and the likeID")
        }
        fetchIsLiked();
    },[username])

    useEffect(() => {
        let temp = window.sessionStorage.getItem("username");
        setUsername(!temp ? "" : temp);
        console.log(temp);
    }, [])

    return(
        <div style={{float: "right", display: "flex", marginRight: "3%"}}>
            <p>{likeCount}</p>
            {isLiked && <FavoriteIcon style={{marginLeft:"10%"}} onClick={handleClick}></FavoriteIcon>}
            {!isLiked && <FavoriteBorderIcon style={{marginLeft:"10%"}} onClick={handleClick}></FavoriteBorderIcon>}
            {anchorEl && <GenericLikeMenu anchorEl={anchorEl} closeMenu={closeMenu}/>}
        </div>
    );
}
