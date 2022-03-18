import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import moment from 'moment'
import { Chip } from '@mui/material'
import { TagType } from '../../ObjectInterface'
import GenericCardMenu from '../Comments/CommentOptionsMenu'
import CommentOptionsMenu from '../Comments/CommentOptionsMenu'

type Props = {
    isMyProfile: boolean;
    tagArray: string;
    username: string;
    profilePicPath: string;
    isEdited: boolean;
    timestamp: string;
    displayName: string;
    currentUsername: string;
    type?: string;
    handleOpenDelete: () => void;
    handleOpenEdit: () => void;
}

export default function CardHeader({ isMyProfile, tagArray, username, profilePicPath, isEdited, timestamp, currentUsername, handleOpenEdit, handleOpenDelete, displayName, type }: Props) {

    function getChips() {
        if (!tagArray) {
            return;
        }
        let tags: TagType[] = JSON.parse(tagArray);
        return tags?.map(tag => <Chip key={tag.tagName} label={tag.tagName} color="primary" variant="outlined" style={{ marginRight: "2%" }} />);
    }

    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "7 0 0" }}>
                <div className='card-start'>
                    <div style={{ width: "calc(15% + 14px)", margin: "auto 2%" }}>
                        <Link to={`/profile/${username}`} style={{ margin: "0%" }}>
                            <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} roundedCircle />
                        </Link>
                    </div>
                    <div style={{ width: "30%" }}>
                        <Link to={`/profile/${username}`} style={{ textDecoration: 'none', whiteSpace: "nowrap" }}>
                            <h5 className="card-title" style={{ marginLeft: "2%", alignSelf: "center" }}>{displayName}</h5>
                        </Link>
                    </div>
                </div>
            </div>


            <div className="card-icons" style={{ display: "flex", flexDirection: "column", width: "50%", }}>
                <div style={{ display: "flex", float: "right", justifyContent: "flex-end" }}>
                    {isEdited ?
                        <p className="card-text-secondary">
                            (edited)&nbsp;
                        </p>
                        :
                        <></>
                    }
                    <p className="card-text-secondary" style={{ whiteSpace: "nowrap" }}>
                        {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                    </p>
                    <div>
                        {type === "comment" ?
                        
                            <>
                            {isMyProfile}
                                {(isMyProfile && username !== currentUsername) && <CommentOptionsMenu handleOpenDelete={handleOpenDelete} />}
                                {(username === currentUsername) && <CommentOptionsMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit} />}
                            </>
                        :
                            (isMyProfile || username === currentUsername) && <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit} />
                        }
                    </div>

                </div>
                <div className="tagBox">
                    {getChips()}
                </div>
            </div>
        </div>
    )
}
