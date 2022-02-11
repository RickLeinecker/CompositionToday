import ArticlesSection from './Articles/ArticlesSection';
import EventSection from './Events/EventSection';
import ExperienceSection from './Experience/ExperienceSection';
import MusicSection from './Music/MusicSection';

type Props = {
    currentSection: string;
    uid: string;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function ProfileContent({currentSection, uid, createOpen, handleCloseCreate}: Props) {
    return (
        <div id="sections">
            {currentSection === "Experience" && <ExperienceSection uid={uid} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
            {currentSection === "Music" && <MusicSection uid={uid} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />}
            {currentSection === "Events" && <EventSection uid={uid} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
            {currentSection === "Articles" && <ArticlesSection uid={uid} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
        </div>
    )
}
