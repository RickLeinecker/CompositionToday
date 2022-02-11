import ArticlesSection from './Articles/ArticlesSection';
import EventSection from './Events/EventSection';
import ExperienceSection from './Experience/ExperienceSection';
import MusicSection from './Music/MusicSection';

type Props = {
    currentSection: string;
    uid: string;
    userID: number;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function ProfileContent({currentSection, uid, userID, createOpen, handleCloseCreate}: Props) {
    return (
        <div id="sections">
            {currentSection === "Experience" && <ExperienceSection uid={uid} userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
            {currentSection === "Music" && <MusicSection uid={uid} userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />}
            {currentSection === "Events" && <EventSection uid={uid} userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
            {currentSection === "Articles" && <ArticlesSection uid={uid} userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
        </div>
    )
}
