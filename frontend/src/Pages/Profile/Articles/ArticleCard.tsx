import { ArticleType } from '../../../ObjectInterface';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import EditArticleModal from './EditArticleModal';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu';
import moment from 'moment';
import { useState } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CommentSection from '../../Comments/CommentSection';
import GenericLike from '../../../Helper/Generics/GenericLike';
import { Divider } from '@mui/material';

type Props = {
    article: ArticleType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function ArticleCard({ article, isMyProfile, notifyChange }: Props) {
    const { id, contentName, contentText, username, profilePicPath, displayName, timestamp, likeCount, isLikedByLoggedInUser} = article;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const[isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false)
    
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

            <div style={{display: "flex", margin:"2%", marginBottom: "1%"}}>
                    <Link to={`/profile/${username}`} style={{textDecoration: 'none'}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{float: "left"}} roundedCircle/>
                            <h5 className="card-title" style={{marginLeft:"2%"}}>{displayName}</h5>
                        </div>
                    </Link>
            </div>

            <Divider variant="fullWidth" component="div" sx={{margin:"0.5% auto", width:"95%"}}/>
            
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
            
            <div className="card-body" style={{paddingBottom: "0%"}}>
                <h1 className="card-title">{contentName}</h1>
                <p className="card-text">{contentText}</p>
            </div>
            
            <Divider variant="fullWidth" component="div" sx={{margin:"1% auto", width:"95%"}}/>

            <div style={{float: "right", marginBottom:"-1%"}}>
                {isCommentsOpen ?
                    <div style={{float: "right"}} onClick={() => setIsCommentsOpen(false)}>
                        <ChatBubbleIcon/>
                        <ArrowDropDownIcon/>
                    </div>
                    :
                    <div style={{float: "right"}} onClick={() => setIsCommentsOpen(true)}>
                        <ChatBubbleOutlineIcon/>
                        <ArrowDropUpIcon/>
                    </div>
                }
                <GenericLike contentID={article.id} likeCount={likeCount} isLikedByLoggedInUser={isLikedByLoggedInUser}/>
            </div>

            <div>
                {isCommentsOpen ? <CommentSection contentID={article.id}/> : <></>}
            </div>
        </div>
    )
}
