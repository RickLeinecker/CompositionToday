import { useState, useContext } from 'react';
import { Image } from 'react-bootstrap';
import useOpen from '../../Helper/CustomHooks/useOpen';
import { UserProfile } from '../../ObjectInterface';
import DefaultValues from '../../Styles/DefaultValues.module.scss';
import EditProfileModal from './EditProfileModal';
import ProfileContent from './ProfileContent';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ProfileContext } from './ProfileContext';
import { Fab, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#1f9affd3',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 0.8em 1em;
  margin: 0.5em 0.5em;
  border: none;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[600]};
  }

  &:focus {
    color: #fff;
    border-radius: 0.5em;
    outline: 1em solid ${blue[200]};
    outline-offset: 1em;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[500]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabsList = styled(TabsListUnstyled)`
  margin: auto;
  width: 100%;
  background-color: ${blue[500]};
  border-radius: 1em;
  margin-bottom: 0em;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

type Props = {
    userProfile: UserProfile;
    notifyChange: () => void;
}

export default function ProfileContentSelector({ userProfile, notifyChange }: Props) {
    const [currentSection, setCurrentSection] = useState<string>("Experience")
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: createOpen, handleClick: handleOpenCreate, handleClose: handleCloseCreate } = useOpen();
    const { isMyProfile } = useContext(ProfileContext);

    const handleChange = (event: any, newValue: number | string) => {
        setCurrentSection(newValue.toString());
    };

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
                    <div style={{ margin: "0% auto", marginTop: "2%" }}>
                        <TabsUnstyled defaultValue={"Experience"} onChange={handleChange}>
                            <TabsList>
                                <Tab value='Experience'>Experience</Tab>
                                <Tab value='Music'>Music</Tab>
                                <Tab value="Events">Events</Tab>
                                <Tab value="Articles">Articles</Tab>
                            </TabsList>
                        </TabsUnstyled>
                    </div>
                </div>
                <div className='content-box'>
                    <ProfileContent currentSection={currentSection} uid={userProfile.uid} createOpen={createOpen} handleCloseCreate={handleCloseCreate} />
                </div>
                {isMyProfile &&
                    <div style={{position: "absolute", right: "22%", bottom: "3%"}}>
                        <Fab color="default" aria-label="add" onClick={handleOpenCreate}>
                            <AddCircleIcon style={{ fontSize: "5vw", color: DefaultValues.black }} />
                        </Fab>
                    </div>
                }
            </div>
        </>
    )
}
