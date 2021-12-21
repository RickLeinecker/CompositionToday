import { ExperienceType } from '../../../ObjectInterface';
import DeleteExperienceModal from './DeleteExperienceModal';
import EditExperienceModal from './EditExperienceModal';

type Props = {
    // contentName: string;
    // contentText: string;
    // timestamp: string;
    // description?: string;
    experience: ExperienceType
    isMyProfile: boolean;
    // contentID: number;
    // userID: number
}


export default function ExperienceCard({isMyProfile, experience}: Props) {
    const {id, contentName, contentText, description, timestamp} = experience;

    return (
        <div className="card" style={{display: "flex"}}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>

                <DeleteExperienceModal contentID={id} isMyProfile={isMyProfile}/>
                <EditExperienceModal 
                    experience={experience}
                    isMyProfile={isMyProfile}              
                />

            </div>
        </div>
    )
}
