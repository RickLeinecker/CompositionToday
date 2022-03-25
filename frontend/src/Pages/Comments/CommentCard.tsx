import { CommentType } from '../../ObjectInterface';
import { Divider } from '@mui/material';
import GenericLike from '../../Helper/Generics/GenericLike';
import CommentCardHeader from './CommentCardHeader';

type Props = {
    commentType: CommentType;
    isMyProfile: boolean;
    notifyVirtualizer: () => void
    notifyChange: () => void;
}

export default function CommentCard({ commentType, isMyProfile, notifyVirtualizer, notifyChange }: Props) {
    const { id, comment, timestamp, approved, contentID, commenterUID, username, profilePicPath, displayName, likeCount, isLikedByLoggedInUser, isEdited} = commentType;

    return (
        <div className="card">
            
            <CommentCardHeader commentObject={commentType} isMyProfile={isMyProfile} notifyChange={notifyChange} />
            <Divider variant="fullWidth" component="div" sx={{ margin: "0.5% auto", width: "95%" }} />
            
            <div className="card-body">
                <p className="card-text">{comment}</p>
            </div>

            <div style={{ cursor: "pointer", float: "right", marginBottom: "-1%" }}>
                <GenericLike contentID={id} likeCount={likeCount} isLikedByLoggedInUser={isLikedByLoggedInUser} isComment={true}/>
            </div>

        </div>
    )
}
