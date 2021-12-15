import React, { useEffect, useState } from 'react'
import { Alert, Button, ButtonGroup, Container, Image } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'
import ArticlesSection from './Articles/ArticlesSection'
import EventsSection from './Events/EventsSection'
import ExperienceSection from './Experience/ExperienceSection'
import MusicSection from './Music/MusicSection'
import './MyProfileStyle.scss'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import { getAuth } from 'firebase/auth'
import { GenericHandlerObject, User } from '../../ObjectInterface'
import GenericHandler from '../../Handlers/GenericHandler'

export default function MyProfile(props: any) {

    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        // get user info
        async function fetchUser(){
            const handlerObject: GenericHandlerObject = {
                data: JSON.stringify({uid: getAuth().currentUser?.uid}),
                methodType: "POST",
                path: "getLoggedInUser",
            }
            
            try{
                let answer = (await GenericHandler(handlerObject));
                if(answer.error.length > 0){
                    setError(answer.error);
                    return;
                }
                
                setError("");
                const result = await answer.result;
                setUser({
                    id: result.id,
                });
                setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                setError(DefaultValues.apiErrorMessage);
            }
        
        }
        fetchUser();

        // sets current section button color to selected 
        let property = document.getElementById(currentSection)

        if(property != null)
            property.style.background = DefaultValues.secondaryColor
        console.log(property + " this is property")

        return () => {
        }
    }, [currentSection])

    const handleClick = async (event: any)=>{

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

    function getUser(){
        var user = getAuth().currentUser;
        var email = user?.email

        return(
            <h1 id="userDisplay" style = {{padding: "2%", fontSize: "3vw"}}>{email}</h1>
        )
    }
      

    return (
        <>
            <TopNavBar/>
            <Container style = {{padding:"2%"}}>
                { 
                (loading && !error) ?
                    <div>...loading</div> 
                :
                (user && !error) ? 
                    <>
                        <div id="container">
                            <div style={{ display: "flex", marginLeft: "5%" }}>
                                <Image style={{ width: "10%", height: "auto" }} src="img_avatar.png" roundedCircle />
                                {getUser()}
                            </div>
                            <ButtonGroup className="buttonContainer" onClick={handleClick}>
                                <Button className="rounded-pill" id="Experience" style={{background: DefaultValues.secondaryColor}} variant="light" value="Experience">Experience</Button>{' '}
                                <Button className="rounded-pill" id="Music" variant="light" value="Music">Music</Button>{' '}
                                <Button className="rounded-pill" id="Events" variant="light" value="Events">Events</Button>{' '}
                                <Button className="rounded-pill" id="Articles" variant="light" value="Articles">Articles</Button>{' '}
                            </ButtonGroup>
                            <div id="my-profile-box"></div>
                        </div>
                        <div id="sections">
                                {currentSection === "Experience" && <ExperienceSection userID={user.id} />}
                                {currentSection === "Music" && <MusicSection />}
                                {currentSection === "Events" && <EventsSection />}
                                {currentSection === "Articles" && <ArticlesSection />}
                        </div>
                    </>
                :
                    <Alert variant="danger">{error}</Alert>
                }
            </Container>
        </>
    )
}
