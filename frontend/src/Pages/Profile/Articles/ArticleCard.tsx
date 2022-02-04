import { ArticleType } from '../../../ObjectInterface';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import EditArticleModal from './EditArticleModal';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap'

type Props = {
    article: ArticleType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function ArticleCard({ article, isMyProfile, notifyChange }: Props) {
    const { id, contentName, contentText, username, profilePicPath, displayName} = article;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const[showOptions, setShowOptions] = useState<boolean>(false);

    return (
        <div className="card" onMouseOver={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>
            {isMyProfile && showOptions && 
                <>
                    <div className="card-icons">
                        <EditIcon onClick={handleOpenEdit}/> 
                        <DeleteIcon onClick={handleOpenDelete}/>
                    </div>
                </>
            }
            
            <GenericDeleteModal
                contentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"Article"}
            />

            <EditArticleModal
                article={article}
                notifyChange={notifyChange}
                editOpen={editOpen}
                handleCloseEdit={handleCloseEdit}
            />
            
            <div className="card-body">
                <Link to={`/profile/${username}`} style={{textDecoration: 'none'}}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{float: "left"}} roundedCircle/>
                        <h5 className="card-title" style={{marginLeft:"2%"}}>{displayName}</h5>
                    </div>
                </Link>
                <hr/>
                <h1 className="card-title">{contentName}</h1>
                <p className="card-text">{contentText}</p>
            </div>
        </div>
    )
}
