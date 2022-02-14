import { useEffect, useState, useContext } from 'react';
import { Button, ButtonGroup, Image } from 'react-bootstrap';
import useOpen from '../../Helper/CustomHooks/useOpen';
import { UserProfile } from '../../ObjectInterface';
import DefaultValues from '../../Styles/DefaultValues.module.scss';
import EditProfileModal from './EditProfileModal';
import ProfileContent from './ProfileContent';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ProfileContext } from './ProfileContext';
import { IconButton } from '@mui/material';

type Props = {
    userProfile: UserProfile;
    notifyChange: () => void;
}

export default function ProfileContentSelector({ userProfile, notifyChange }: Props) {
    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();
    const { isMyProfile } = useContext(ProfileContext);

    // sets current section button color to selected 
    useEffect(() => {
        let property = document.getElementById(currentSection)

        if (property !== null)
            property.style.background = DefaultValues.secondaryColor

        return () => {
        }
    }, [currentSection])

    const handleClick = async (event: any) => {

        event.preventDefault()

        // sets old section button color to selected
        // and updates section 
        if (event?.target?.value != null && event?.target?.value !== currentSection) {
            let oldProperty = document.getElementById(currentSection)
            if (oldProperty != null) {
                oldProperty.style.background = DefaultValues.white
            }
            setCurrentSection(event?.target?.value)
        }
    }

    return (
        <>
            <div className="container-profile">
                <div className="my-profile-box">
                    <div style={{ position: "relative", display: "flex", marginLeft: "5%" }}>
                        <div>
                            <Image className="profile-pic" src={userProfile.profilePicPath || "img_avatar.png"} roundedCircle />
                            <h1 id="userDisplay" className='user-name'>{userProfile.displayName}</h1>
                            <div style={{ marginLeft: "20%" }}>
                                <p style={{ fontSize: "calc(10px + 1vw)" }}>{userProfile.bio}</p>
                            </div>
                        </div>
                        {isMyProfile &&
                            <>
                                <div className='corner-icon'>
                                    <IconButton aria-label="edit-profile" onClick={handleOpenEdit}>
                                        <EditIcon style={{ fontSize: "calc(12px + 2.5vw)" }} />
                                    </IconButton>
                                </div>

                                <EditProfileModal
                                    userProfile={userProfile}
                                    notifyChange={notifyChange}
                                    editOpen={editOpen}
                                    handleCloseEdit={handleCloseEdit}
                                />
                            </>
                        }
                    </div>
                    <div style={{ margin: "2% 0" }}>
                        <ButtonGroup className="buttonContainer" onClick={handleClick}>
                            <Button className="rounded-pill" id="Experience" style={{ background: DefaultValues.secondaryColor }} variant="light" value="Experience">Experience</Button>{' '}
                            <Button className="rounded-pill" id="Music" variant="light" value="Music">Music</Button>{' '}
                            <Button className="rounded-pill" id="Events" variant="light" value="Events">Events</Button>{' '}
                            <Button className="rounded-pill" id="Articles" variant="light" value="Articles">Articles</Button>{' '}
                        </ButtonGroup>
                    </div>
                </div>
                <div className='content-box'>
                    <div style={{ position: "relative", display: "flex" }}>
                        <div className='content-text-box'>
                            <h1>{currentSection}</h1>
                        </div>

                        {isMyProfile &&
                            <div style={{ position: "absolute", top: "0.5em", right: "1%" }}>
                                <IconButton aria-label="create-content" onClick={handleOpenCreate}>
                                    <AddCircleIcon style={{ fontSize: "5vw" }} />
                                </IconButton>
                            </div>
                        }
                    </div>
                    <div className='content-scroll'>
                        <ProfileContent currentSection={currentSection} uid={userProfile.uid} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
                    </div>
                </div>
            </div>
        </>
    )
}
