import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'
import ArticlesSection from './Articles/ArticlesSection'
import EventsSection from './Events/EventsSection'
import ExperienceSection from './Experience/ExperienceSection'
import MusicSection from './Music/MusicSection'
import './MyProfileStyle.css'

export default function MyProfile() {

    const [currentSection, setCurrentSection] = useState<string>("Experience")

    useEffect(() => {

        // sets current section button color to selected 
        let property = document.getElementById(currentSection)
            if(property != null)
                property.style.background = "#3981FF"

        return () => {
        }
    }, [currentSection])

    const handleClick=(event: any)=>{
        event.preventDefault()
        
        // sets old section button color to selected
        // and updates section 
        if(event?.target?.value != null){
            let oldProperty = document.getElementById(currentSection)
            if(oldProperty != null){
                oldProperty.style.background = "#FFFBFF"
            }
            setCurrentSection(event?.target?.value)
        }
    }

    return (
        <>
            <TopNavBar/>
            <Container style = {{minHeight:"100vh", padding:"2%"}}>
                <div id="container">   
                    <h1 style = {{padding: "2%", fontSize: "3vw"}}>Username</h1>
                    <ButtonGroup className="buttonContainer" onClick={handleClick}>
                        <Button className="rounded-pill" id="Experience" variant="light" value="Experience">Experience</Button>{' '}
                        <Button className="rounded-pill" id="Music" variant="light" value="Music">Music</Button>{' '}
                        <Button className="rounded-pill" id="Events" variant="light" value="Events">Events</Button>{' '}
                        <Button className="rounded-pill" id="Articles" variant="light" value="Articles">Articles</Button>{' '}
                    </ButtonGroup>
                    <div id="my-profile-box"></div>
                </div>
                <div id="sections">
                    {currentSection === "Experience" && <ExperienceSection/>}
                    {currentSection === "Music" && <MusicSection/>}
                    {currentSection === "Events" && <EventsSection/>}
                    {currentSection === "Articles" && <ArticlesSection/>}
                </div>
            </Container>
        </>
    )
}
