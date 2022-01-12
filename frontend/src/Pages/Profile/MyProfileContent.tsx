import React from 'react'
import ArticlesSection from './Articles/ArticlesSection'
import EventsSection from './Events/EventsSection'
import ExperienceSection from './Experience/ExperienceSection'
import MusicSection from './Music/MusicSection'

type Props = {
    currentSection: string;
    userID: number;
}

export default function MyProfileContent({currentSection, userID}: Props) {
    return (
        <div id="sections">
                {currentSection === "Experience" && <ExperienceSection userID={userID} />}
                {currentSection === "Music" && <MusicSection />}
                {currentSection === "Events" && <EventsSection />}
                {currentSection === "Articles" && <ArticlesSection />}
        </div>
    )
}
