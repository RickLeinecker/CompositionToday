import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Image } from 'react-bootstrap'
import useOpen from '../../Helper/CustomHooks/useOpen'
import { User, UserProfile } from '../../ObjectInterface'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import EditProfileModal from './EditProfileModal'
import MyProfileContent from './MyProfileContent'
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    user: User;
    userProfile: UserProfile;
    notifyChange: () => void;
}

export default function MyProfileContentSelector({user, userProfile, notifyChange}: Props) {

    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const [isMyProfile, setIsMyProfile] = useState<boolean>(true);
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    
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
        return(
            <h1 id="userDisplay" style = {{display: "inline", padding: "2%", fontSize: "4vw", fontFamily: 'Work Sans', fontWeight: 900}}>{userProfile.displayName}</h1>
        )
    }

    return (
        <>
            <div id="container">
                <div id="my-profile-box">
                    <div style={{position: "relative", display: "flex", marginLeft: "5%"}}>
                        <div>
                            <Image style={{ width: "15%", height: "auto", float: "left"}} src="img_avatar.png" roundedCircle />
                            {getUser()}
                            <div style = {{marginLeft: "20%"}}>
                                <p style={{fontSize: "1.5vw"}}>{userProfile.bio}</p>
                            </div>
                        </div>
                        {isMyProfile && 
                                <>
                                    <div className='corner-icon'>
                                        <EditIcon onClick={handleOpenEdit}/>
                                    </div>

                                    <EditProfileModal 
                                        userProfile={userProfile} 
                                        notifyChange={notifyChange} 
                                        editOpen={editOpen}
                                        handleOpenEdit={handleOpenEdit}
                                        handleCloseEdit={handleCloseEdit}
                                    />
                                </>
                        }
                    </div>
                    <div style={{margin: "2% 0"}}>
                        <ButtonGroup className="buttonContainer" onClick={handleClick}>
                            <Button className="rounded-pill" id="Experience" style={{background: DefaultValues.secondaryColor}} variant="light" value="Experience">Experience</Button>{' '}
                            <Button className="rounded-pill" id="Music" variant="light" value="Music">Music</Button>{' '}
                            <Button className="rounded-pill" id="Events" variant="light" value="Events">Events</Button>{' '}
                            <Button className="rounded-pill" id="Articles" variant="light" value="Articles">Articles</Button>{' '}
                        </ButtonGroup>
                    </div>
                </div>
                <MyProfileContent currentSection={currentSection} userID={user.id}/>
            </div>
        </>
    )
}
