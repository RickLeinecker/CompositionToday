import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Image } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'
import ArticlesSection from './Articles/ArticlesSection'
import EventsSection from './Events/EventsSection'
import ExperienceSection from './Experience/ExperienceSection'
import MusicSection from './Music/MusicSection'
import './MyProfileStyle.scss'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import GetUsersHandler from '../../Handlers/GetUsersHandler'
import {User, Content, JSONfileContent, JSONfileUser} from "../../ObjectInterface"
import GetContentByTypeHandler from '../../Handlers/GetContentByTypeHandler'

export default function MyProfile() {

    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const [response, setResponse] = useState<JSONfileUser| undefined>(undefined);

    useEffect(() => {

        // sets current section button color to selected 
        let property = document.getElementById(currentSection)
            if(property != null)
                property.style.background = DefaultValues.secondaryColor

        return () => {
        }
    }, [currentSection])

    const handleClick = async (event: any)=>{
        let answer = (await GetUsersHandler(event));
        // let answer = (await GetContentByTypeHandler(event, "music"));
        setResponse(answer)
        console.log("here is answer" + answer);

        event.preventDefault()
        
        // sets old section button color to selected
        // and updates section 
        if(event?.target?.value != null && event?.target?.value !== currentSection){
            let oldProperty = document.getElementById(currentSection)
            if(oldProperty != null){
                oldProperty.style.background = DefaultValues.white
            }
            setCurrentSection(event?.target?.value)
        }
    }
      

    return (
        <>
            <TopNavBar/>
            <Container style = {{padding:"2%"}}>
                <div id="container">
                    <div style ={{display: "flex", marginLeft: "5%"}}>
                        <Image style={{width: "10%", height: "auto"}} src="img_avatar.png" roundedCircle/>
                        <h1 style = {{padding: "2%", fontSize: "3vw"}}>Username</h1>
                    </div>
                    <ButtonGroup className="buttonContainer" onClick={handleClick}>
                        <Button className="rounded-pill" id="Experience" variant="light" value="Experience">Experience</Button>{' '}
                        <Button className="rounded-pill" id="Music" variant="light" value="Music">Music</Button>{' '}
                        <Button className="rounded-pill" id="Events" variant="light" value="Events">Events</Button>{' '}
                        <Button className="rounded-pill" id="Articles" variant="light" value="Articles">Articles</Button>{' '}
                    </ButtonGroup>
                    <div id="my-profile-box"></div>
                </div>
                {response?.result.map((_result: User) => (
                    <li key={_result.id}>
                        <p>{_result.firstName}</p>
                    </li> 
                ))}
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
