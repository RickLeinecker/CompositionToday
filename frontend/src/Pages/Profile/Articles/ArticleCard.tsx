import { ArticleType } from '../../../ObjectInterface';
import { Divider } from '@mui/material';
import CardFooter from '../CardFooter';
import ArticleCardHeader from './ArticleCardHeader';
import { useState } from 'react';

type Props = {
    article: ArticleType;
    isMyProfile: boolean;
    notifyVirtualizer: () => void;
    notifyChange: () => void;
    clearCache: () => void;
}


export default function ArticleCard({ article, isMyProfile, notifyVirtualizer, notifyChange, clearCache }: Props) {
    const { id, contentName, contentText, username, profilePicPath, displayName, timestamp, likeCount, isLikedByLoggedInUser, isEdited, tagArray} = article;

    const [showMore, setShowMore] = useState(false);

    return (
        <div className="card">
            <ArticleCardHeader article={article} isMyProfile={false} notifyChange={notifyChange} />

            <Divider variant="fullWidth" component="div" sx={{ margin: "0.5% auto", width: "95%" }} />

            <div className="card-body" style={{ paddingBottom: "0%" }}>
                <h1 className="card-title">{contentName}</h1>
                <p className="card-text">{(showMore || contentText.length <= 250) ? contentText : contentText.substring(0, 250) + "..."}</p>
                <div style={{float: "right"}}>
                    {(!showMore && contentText.length > 250) && <p style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => {setShowMore(true); clearCache(); notifyVirtualizer()}}>Show more</p>}
                    {(showMore && contentText.length > 250) && <p style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => {setShowMore(false); clearCache(); notifyVirtualizer()}}>Show less</p>}
                </div>
            </div>

            <Divider variant="fullWidth" component="div" sx={{ margin: "1% auto", width: "95%" }} />

            <div>
                <CardFooter
                    clearCache={clearCache}
                    notifyVirtualizer={notifyVirtualizer}
                    notifyChange={notifyChange}
                    id={id}
                    likeCount={likeCount}
                    isLikedByLoggedInUser={isLikedByLoggedInUser}
                />
            </div>
            
        </div>
    )
}
