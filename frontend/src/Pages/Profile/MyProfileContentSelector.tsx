import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Image } from 'react-bootstrap'
import { User } from '../../ObjectInterface'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import MyProfileContent from './MyProfileContent'

type Props = {
    user: User;
}

export default function MyProfileContentSelector({user}: Props) {

    const [currentSection, setCurrentSection] = useState<string>("Experience")

    // sets current section button color to selected 
    useEffect(() => {
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
        <div>
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
            <MyProfileContent currentSection={currentSection} userID={user.id}/>
        </div>
    )
}
