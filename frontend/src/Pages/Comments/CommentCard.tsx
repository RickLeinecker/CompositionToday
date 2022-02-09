import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import moment from 'moment';
import { CommentType } from '../../ObjectInterface';
import CommentOptionsMenu from './CommentOptionsMenu';
import useOpen from '../../Helper/CustomHooks/useOpen';
import CommentDeleteModal from './CommentDeleteModal';

type Props = {
    commentType: CommentType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function ArticleCard({ commentType, isMyProfile, notifyChange }: Props) {
    const { id, comment, timestamp, approved, contentID, commenterUserID, username, profilePicPath, displayName} = commentType;
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    return (
        <div className="card">
            <div className="card-icons" style={{display: "flex"}}>
                <p className="card-text-secondary">
                    {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                </p>
                {isMyProfile && 
                    <CommentOptionsMenu handleOpenDelete={handleOpenDelete}/>
                }
            </div>
            
            <CommentDeleteModal
                commentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"comment"}
            />


            <div style={{display: "flex", margin:"2%", marginBottom: "1%"}}>
                    <Link to={`/profile/${username}`} style={{textDecoration: 'none'}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{float: "left"}} roundedCircle/>
                            <h5 className="card-title" style={{marginLeft:"2%"}}>{displayName}</h5>
                        </div>
                    </Link>
            </div>
            <div className="card-body">
                <p className="card-text">{comment}</p>
            </div>
        </div>
    )
}