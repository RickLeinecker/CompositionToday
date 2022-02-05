import { ArticleType } from '../../../ObjectInterface';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import EditArticleModal from './EditArticleModal';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu';
import moment from 'moment';

type Props = {
    article: ArticleType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function ArticleCard({ article, isMyProfile, notifyChange }: Props) {
    const { id, contentName, contentText, username, profilePicPath, displayName, timestamp} = article;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    return (
        <div className="card">
            <div className="card-icons" style={{display: "flex"}}>
                <p className="card-text-secondary">
                    {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                </p>
                {isMyProfile &&
                    <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit}/>
                }
            </div>
            
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
