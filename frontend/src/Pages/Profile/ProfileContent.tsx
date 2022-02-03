import ArticlesSection from './Articles/ArticlesSection';
import EventSection from './Events/EventSection';
import ExperienceSection from './Experience/ExperienceSection';
import MusicSection from './Music/MusicSection';

type Props = {
    currentSection: string;
    userID: number;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function ProfileContent({currentSection, userID, createOpen, handleCloseCreate}: Props) {
    return (
        <div id="sections">
            {currentSection === "Experience" && <ExperienceSection userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
            {currentSection === "Music" && <MusicSection userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />}
            {currentSection === "Events" && <EventSection userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
            {currentSection === "Articles" && <ArticlesSection userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
        </div>
    )
}
