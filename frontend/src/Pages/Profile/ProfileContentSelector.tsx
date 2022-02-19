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
import { Fab, IconButton, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

// const blue = {
//   50: '#F0F7FF',
//   100: '#C2E0FF',
//   200: '#80BFFF',
//   300: '#66B2FF',
//   400: '#3399FF',
//   500: '#007FFF',
//   600: '#0072E5',
//   700: '#0059B2',
//   800: '#004C99',
//   900: '#003A75',
// };

// const Tab = styled(TabUnstyled)`
//   font-family: IBM Plex Sans, sans-serif;
//   color: white;
//   cursor: pointer;
//   font-size: 0.875rem;
//   font-weight: bold;
//   background-color: transparent;
//   width: 100%;
//   padding: 12px 16px;
//   margin: 6px 6px;
//   border: none;
//   border-radius: 5px;
//   display: flex;
//   justify-content: center;

//   &:hover {
//     background-color: ${blue[400]};
//   }

//   &:focus {
//     color: #fff;
//     border-radius: 3px;
//     outline: 2px solid ${blue[200]};
//     outline-offset: 2px;
//   }

//   &.${tabUnstyledClasses.selected} {
//     background-color: ${blue[50]};
//     color: ${blue[600]};
//   }

//   &.${buttonUnstyledClasses.disabled} {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }
// `;

// const TabPanel = styled(TabPanelUnstyled)`
//   width: 100%;
//   font-family: IBM Plex Sans, sans-serif;
//   font-size: 0.875rem;
// `;

// const TabsList = styled(TabsListUnstyled)`
//   margin: auto;
//   width: 100%;
//   min-width: 320px;
//   background-color: ${blue[500]};
//   border-radius: 8px;
//   margin-bottom: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   align-content: space-between;
// `;

type Props = {
    userProfile: UserProfile;
    notifyChange: () => void;
}

export default function ProfileContentSelector({ userProfile, notifyChange }: Props) {
    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();
    const { isMyProfile } = useContext(ProfileContext);
    const [value, setValue] =  useState(0);

    const handleChange = (event: any, newValue: number) => {
      setValue(newValue);
    };

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
                    <div style={{ position: "relative", display: "flex", marginLeft: "2%", marginTop: "2%", alignItems: "center", justifyContent: "center"}}>
                        <div style={{ flex: "1 0 0" }}>
                            <Image className="profile-pic" src={userProfile.profilePicPath || "img_avatar.png"} roundedCircle />
                        </div>
                        <div style={{ flex: "7 0 0" }}>
                            <h1 id="userDisplay" className='user-name'>{userProfile.displayName}</h1>
                            <div>
                                <p style={{ fontSize: "calc(10px + 1vw)", marginLeft: "5%"}}>{userProfile.bio}</p>
                            </div>
                        </div>
                        {isMyProfile &&
                            <>
                                <div className='corner-icon'>
                                    <IconButton aria-label="edit-profile" onClick={handleOpenEdit}>
                                        <EditIcon style={{ fontSize: "calc(12px + 2.5vw)", color: DefaultValues.black}} />
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
                    <div style={{ margin: "0% 3%" }}>
                        {/* <ButtonGroup className="buttonContainer" onClick={handleClick}>
                            <Button className="rounded-pill" id="Experience" style={{ background: DefaultValues.secondaryColor }} variant="light" value="Experience">Experience</Button>{' '}
                            <Button className="rounded-pill" id="Music" variant="light" value="Music">Music</Button>{' '}
                            <Button className="rounded-pill" id="Events" variant="light" value="Events">Events</Button>{' '}
                            <Button className="rounded-pill" id="Articles" variant="light" value="Articles">Articles</Button>{' '}
                        </ButtonGroup> */}
                        <Tabs value={value} variant="fullWidth" onChange={handleChange} centered>
                            <Tab label="Experience" />
                            <Tab label="Music" />
                            <Tab label="Events" />
                            <Tab label="Articles" />
                        </Tabs>
                        {/* <TabsUnstyled defaultValue={0}>
                            <TabsList>
                                <Tab>Experience</Tab>
                                <Tab>Music</Tab>
                                <Tab>Events</Tab>
                                <Tab>Articles</Tab>
                            </TabsList>
                        </TabsUnstyled> */}
                    </div>
                </div>
                <div className='content-box'>
                    <ProfileContent currentSection={currentSection} uid={userProfile.uid} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
                </div>
                {isMyProfile &&
                    <div style={{position: "absolute", right: "22%", bottom: "5%"}}>
                        <Fab color="default" aria-label="add" onClick={handleOpenCreate}>
                            <AddCircleIcon style={{ fontSize: "5vw", color: DefaultValues.black }} />
                        </Fab>
                    </div>
                }
            </div>
        </>
    )
}
