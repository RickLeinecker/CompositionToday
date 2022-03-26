import React, { useEffect, useState } from 'react'
import useOpen from '../../Helper/CustomHooks/useOpen'
import { CommentType } from '../../ObjectInterface'
import CardHeader from '../Profile/CardHeader'
import CommentDeleteModal from './CommentDeleteModal'
import CommentEditModal from './CommentEditModal'

type Props = {
    commentObject: CommentType;
    isMyProfile: boolean;
    notifyChange: () => void;
}

export default function ArticleCardHeader({ commentObject, isMyProfile, notifyChange }: Props) {
    const { comment, displayName, username, profilePicPath, isEdited, timestamp, id } = commentObject;

    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        let temp = window.localStorage.getItem("username");

        setCurrentUsername(!temp ? "" : temp);
    }, [])

    return (
        <div>
            <CardHeader
                isMyProfile={isMyProfile}
                tagArray={""}
                username={username}
                profilePicPath={profilePicPath}
                isEdited={isEdited}
                timestamp={timestamp}
                displayName={displayName}
                currentUsername={currentUsername}
                handleOpenDelete={handleOpenDelete}
                handleOpenEdit={handleOpenEdit}
                type={"comment"}
            />
            <CommentDeleteModal
                commentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"comment"}
            />

            <CommentEditModal
                comment={commentObject}
                notifyChange={notifyChange}
                editOpen={editOpen}
                handleCloseEdit={handleCloseEdit}
            />
        </div>
    )
}
