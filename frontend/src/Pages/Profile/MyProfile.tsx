import React, { useState } from 'react'
import { Button, ButtonGroup, Container } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'
import ArticlesSection from './Articles/ArticlesSection'
import EventsSection from './Events/EventsSection'
import ExperienceSection from './Experience/ExperienceSection'
import MusicSection from './Music/MusicSection'
import './MyProfileStyle.css'

export default function MyProfile() {

    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const handleClick=(event: any)=>{
        event.preventDefault()
        setCurrentSection(event?.target?.value)
    }

    return (
        <>
            <TopNavBar/>
            <Container className="d-flex justify-content-center" style = {{minHeight:"100vh", padding:"3%"}}>
                <div id="container">
                    
                    <h1 style = {{padding: "2%", fontSize: "3vw"}}>Username</h1>
                    <ButtonGroup onClick={handleClick}>
                        <Button variant="light" value="Experience">Experience</Button>{' '}
                        <Button variant="light" value="Music">Music</Button>{' '}
                        <Button variant="light" value="Events">Events</Button>{' '}
                        <Button variant="light" value="Articles">Articles</Button>{' '}
                    </ButtonGroup>
                    <div>
                        {currentSection === "Experience" && <ExperienceSection/>}
                        {currentSection === "Music" && <MusicSection/>}
                        {currentSection === "Events" && <EventsSection/>}
                        {currentSection === "Articles" && <ArticlesSection/>}
                    </div>
                    <div id="my-profile-box"></div>
                </div>
            </Container>
        </>
    )
}
