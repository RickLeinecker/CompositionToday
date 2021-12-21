import DeleteExperienceModal from './DeleteExperienceModal';
import EditExperienceModal from './EditExperienceModal';

type Props = {
    contentName: string;
    contentText: string;
    timestamp: string;
    description?: string;
    isMyProfile: boolean;
    contentID: number;
    userID: number
}


export default function ExperienceCard({contentName, contentText, timestamp, description, isMyProfile, contentID, userID}: Props) {

    return (
        <div className="card" style={{display: "flex"}}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>

                <DeleteExperienceModal contentID={contentID} isMyProfile={isMyProfile}/>
                <EditExperienceModal 
                    contentID={contentID}
                    isMyProfile={isMyProfile}
                    contentName={contentName}
                    timestamp={timestamp}
                    description={description}
                    userID={userID} 
                    contentText={contentText}                
                />

            </div>
        </div>
    )
}
