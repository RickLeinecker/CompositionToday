import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap'
import moment from 'moment';
import { CommentType } from '../../ObjectInterface';

type Props = {
    commentType: CommentType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function ArticleCard({ commentType, isMyProfile, notifyChange }: Props) {
    const { id, comment, timestamp, approved, contentID, commenterUserID} = commentType;

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">{comment}</p>
            </div>
        </div>
    )
}
