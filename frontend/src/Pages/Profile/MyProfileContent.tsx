import React from 'react'
import ArticlesSection from './Articles/ArticlesSection'
import EventsSection from './Events/EventsSection'
import ExperienceSection from './Experience/ExperienceSection'
import MusicSection from './Music/MusicSection'

type Props = {
    currentSection: string;
    userID: number;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function MyProfileContent({currentSection, userID, createOpen, handleCloseCreate}: Props) {
    return (
        <div id="sections">
            {currentSection === "Experience" && <ExperienceSection userID={userID} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>}
            {currentSection === "Music" && <MusicSection />}
            {currentSection === "Events" && <EventsSection />}
            {currentSection === "Articles" && <ArticlesSection />}
        </div>
    )
}
