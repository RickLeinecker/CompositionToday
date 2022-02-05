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
    const [openMenu, setOpenMenu] = useState(false);
    const [menuTarget, setMenuTarget] = useState(null);

    function handleClick(event: any){
        console.log("handle click")
        setMenuTarget(event.currentTarget);
    }

    function updateOpenMenu(){
        setOpenMenu(!openMenu)
    }

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
        console.log("set open menu");
        setOpenMenu(true);
    },[menuTarget])

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
            {openMenu && <GenericLikeMenu menuTarget={menuTarget} updateOpenMenu={updateOpenMenu}/>}
        </div>
    );
}
