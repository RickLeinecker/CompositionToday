import { ArticleType } from '../../../ObjectInterface';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import EditArticleModal from './EditArticleModal';
import { Divider } from '@mui/material';
import CardFooter from '../CardFooter';
import ArticleCardHeader from './ArticleCardHeader';
import {RichTextConverter } from '../../../Helper/Editor/RichTextEditor';

type Props = {
    article: ArticleType;
    isMyProfile: boolean;
    notifyVirtualizer: () => void;
    notifyChange: () => void;
    clearCache: () => void;
}


export default function ArticleCard({ article, isMyProfile, notifyVirtualizer, notifyChange, clearCache }: Props) {
    const { id, contentName, contentText, username, profilePicPath, displayName, timestamp, likeCount, isLikedByLoggedInUser } = article;

    return (
        <div className="card">
            <ArticleCardHeader article={article} isMyProfile={false} notifyChange={notifyChange} />

            <Divider variant="fullWidth" component="div" sx={{ margin: "0.5% auto", width: "95%" }} />

            <div className="card-body" style={{ paddingBottom: "0%" }}>
                <h1 className="card-title">{contentName}</h1>
                {/* <p className="card-text">{contentText}</p> */}
                <RichTextConverter content={contentText}/>

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
