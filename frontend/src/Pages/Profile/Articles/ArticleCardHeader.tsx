import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu'
import moment from 'moment'
import useOpen from '../../../Helper/CustomHooks/useOpen'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal'
import { ArticleType, TagType } from '../../../ObjectInterface'
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

    function getChips() {
        if (!tagArray) {
            return;
        }
        let tags: TagType[] = JSON.parse(tagArray);
        return tags?.map(tag => <Chip label={tag.tagName} style={{marginRight: "2%"}} />);
    }

    return (
        <div style={{ display: "flex", height:"10vh" }}>
            <div className='card-start'>
                <div style={{width: "8vh", marginRight: "2%"}}>
                    <Link to={`/profile/${username}`} style={{margin: "0%"}}>
                        <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} roundedCircle />
                    </Link>
                </div>
                <div style={{width: "50%"}}>
                    <Link to={`/profile/${username}`} style={{ textDecoration: 'none', whiteSpace: "nowrap" }}>
                        <h5 className="card-title" style={{ marginLeft: "2%", alignSelf: "center" }}>{displayName}</h5>
                    </Link>
                    <div className="tagBox">
                        {getChips()}
                    </div>
                </div>
            </div>

            <div className="card-icons">
                <div style={{ display: "flex" }}>
                    {isEdited ?
                        <p className="card-text-secondary">
                            (edited)&nbsp;
                        </p>
                        :
                        <></>
                    }
                    <p className="card-text-secondary" style={{whiteSpace: "nowrap"}}>
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
