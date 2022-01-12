import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Image } from 'react-bootstrap'
import useOpen from '../../Helper/CustomHooks/useOpen'
import { User, UserProfile } from '../../ObjectInterface'
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import EditProfileModal from './EditProfileModal'
import MyProfileContent from './MyProfileContent'
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type Props = {
    user: User;
    userProfile: UserProfile;
    notifyChange: () => void;
}

export default function MyProfileContentSelector({user, userProfile, notifyChange}: Props) {

    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const [isMyProfile, setIsMyProfile] = useState<boolean>(true);
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();
    
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

    const createContent = () => {
        if(currentSection === 'experience'){
            handleOpenCreate();
        }
    }

    return (
        <>
            <div id="container">
                <div id="my-profile-box">
                    <div style={{position: "relative", display: "flex", marginLeft: "5%"}}>
                        <div>
                            <Image className="profile-pic" src="img_avatar.png" roundedCircle />
                            <h1 id="userDisplay" className='user-name'>{userProfile.displayName}</h1>
                            <div style = {{marginLeft: "20%"}}>
                                <p style={{fontSize: "1.5vw"}}>{userProfile.bio}</p>
                            </div>
                        </div>
                        {isMyProfile && 
                                <>
                                    <div className='corner-icon'>
                                        <EditIcon style={{fontSize: "3vw"}} onClick={createContent}/>
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
                <div className='content-box'>
                    <div style={{position: "relative", display: "flex"}}>
                    <div className='content-text-box'>
                        <h1>{currentSection}</h1>
                    </div>
                    
                    <div style={{position: "absolute", top: "0.5em", right: "1%"}}>
                        <AddCircleIcon style={{fontSize: "5vw"}} onClick={handleOpenCreate}/>
                    </div>
                    </div>
                    <div className='content-scroll'>
                        <MyProfileContent currentSection={currentSection} userID={user.id} createOpen={createOpen} handleCloseCreate={handleCloseCreate}/>
                    </div>
                </div>
            </div>
        </>
    )
}
