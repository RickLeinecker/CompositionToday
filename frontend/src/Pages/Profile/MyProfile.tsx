import React, { useState } from 'react'
import { Button, ButtonGroup, Container } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'
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
                    
                    {/* <h1 style = {{padding: "2%", fontSize: "3vw"}}>Username</h1> */}
                    <ButtonGroup onClick={handleClick}>
                        <Button variant="light" value="Experience">Experience</Button>{' '}
                        <Button variant="light" value="Music">Music</Button>{' '}
                        <Button variant="light" value="Events">Events</Button>{' '}
                        <Button variant="light" value="Articles">Articles</Button>{' '}
                    </ButtonGroup>
                    <div>
                        {currentSection === "Experience" && <h1>Experience</h1>}
                        {currentSection === "Music" && <h1>Music</h1>}
                        {currentSection === "Events" && <h1>Events</h1>}
                        {currentSection === "Articles" && <h1>Articles</h1>}
                    </div>
                    {/* <div id="my-profile-box"></div> */}
                </div>
            </Container>
        </>
    )
}
