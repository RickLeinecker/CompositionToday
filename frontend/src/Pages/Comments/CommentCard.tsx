import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import moment from 'moment';
import { CommentType } from '../../ObjectInterface';
import CommentOptionsMenu from './CommentOptionsMenu';
import useOpen from '../../Helper/CustomHooks/useOpen';
import CommentDeleteModal from './CommentDeleteModal';
import { useEffect, useState } from 'react';
import CommentEditModal from './CommentEditModal';
import { Divider } from '@mui/material';

type Props = {
    commentType: CommentType;
    isMyProfile: boolean;
    notifyVirtualizer: () => void
    notifyChange: () => void;
}

export default function ArticleCard({ commentType, isMyProfile, notifyVirtualizer, notifyChange }: Props) {
    const { id, comment, timestamp, approved, contentID, commenterUID, username, profilePicPath, displayName} = commentType;
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        let temp = window.sessionStorage.getItem("username");

        setCurrentUsername(!temp ? "" : temp);
    }, [])


    return (
        <div className="card">

            <div style={{ display: "flex"}}>
                <Link to={`/profile/${username}`} style={{ textDecoration: 'none' }}>
                    <div style={{ display: "flex", alignItems: "center", margin: "2%"}}>
                        <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{ float: "left" }} roundedCircle />
                        <h5 className="card-title" style={{ marginLeft: "2%" }}>{displayName}</h5>
                    </div>
                </Link>
                
                <div className="card-icons" style={{ display: "flex" }}>
                    <p className="card-text-secondary">
                        {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                    </p>
                    {(isMyProfile && username !== currentUsername) && 
                    <CommentOptionsMenu handleOpenDelete={handleOpenDelete}/>
                    }
                    {(username === currentUsername) && 
                        <CommentOptionsMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit}/>
                    }
                </div>
            </div>

            <Divider variant="fullWidth" component="div" sx={{ margin: "0.5% auto", width: "95%" }} />
            
            <CommentDeleteModal
                commentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"comment"}
            />

            <CommentEditModal
                comment={commentType}
                notifyChange={notifyChange}
                editOpen={editOpen}
                handleCloseEdit={handleCloseEdit}
            />
            
            <div className="card-body">
                <p className="card-text">{comment}</p>
            </div>
        </div>
    )
}
