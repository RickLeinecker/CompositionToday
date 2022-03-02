import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu'
import moment from 'moment'
import useOpen from '../../../Helper/CustomHooks/useOpen'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal'
import { ArticleType } from '../../../ObjectInterface'
import EditArticleModal from './EditArticleModal'
import { Chip } from '@mui/material'

type Props = {
    article: ArticleType;
    isMyProfile: boolean;
    notifyChange: () => void;
}

export default function ArticleCardHeader({ article, isMyProfile, notifyChange }: Props) {
    const { id, username, profilePicPath, displayName, timestamp, isEdited, tagArray } = article;

    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        let temp = window.sessionStorage.getItem("username");

        setCurrentUsername(!temp ? "" : temp);
    }, [])

    function getChips(){
        if(!tagArray){
            return;
        }
        for(let i = 0; i < tagArray.length; i++){
            console.log(tagArray[i])
        }
        // console.log(typeof tagArray);
        // return tagArray?.map(tag => <Chip label={tag.tagName} />);
    }

    return (
        <div style={{ display: "flex" }}>
            <Link to={`/profile/${username}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: "flex", alignItems: "center", margin: "2%" }}>
                    <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{ float: "left" }} roundedCircle />
                    <h5 className="card-title" style={{ marginLeft: "2%" }}>{displayName}</h5>
                </div>
            </Link>
            {getChips()}
            <p className='card-text'>{tagArray && tagArray}</p>

            <div className="card-icons">
                <div style={{ display: "flex" }}>
                    {isEdited ?
                        <p className="card-text-secondary">
                            (edited)&nbsp;
                        </p>
                        :
                        <></>
                    }
                    <p className="card-text-secondary">
                        {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                    </p>
                    <div>
                        {(isMyProfile || username === currentUsername) &&
                            <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit} />
                        }
                    </div>
                </div>
            </div>

            <GenericDeleteModal
                contentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"Event"}
            />

            <EditArticleModal
                article={article}
                notifyChange={notifyChange}
                editOpen={editOpen}
                handleCloseEdit={handleCloseEdit}
            />
        </div>
    )
}
