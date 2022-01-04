import { ExperienceType } from '../../../ObjectInterface';
import DeleteExperienceModal from './DeleteExperienceModal';
import EditExperienceModal from './EditExperienceModal';

type Props = {
    experience: ExperienceType;
    isMyProfile: boolean;
    setHasChanged: React.Dispatch<React.SetStateAction<boolean>>;
}


export default function ExperienceCard({ experience, isMyProfile, setHasChanged }: Props) {
    const { id, contentName, contentText, description, timestamp } = experience;

    return (
        <div className="card" style={{ display: "flex" }}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>

                <DeleteExperienceModal contentID={id} isMyProfile={isMyProfile} setHasChanged={setHasChanged} />
                <EditExperienceModal
                    experience={experience}
                    isMyProfile={isMyProfile}
                    setHasChanged={setHasChanged}
                />

            </div>
        </div>
    )
}
