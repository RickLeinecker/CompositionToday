import { EventType } from '../../../ObjectInterface';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import EditEventModal from './EditEventModal';
import { useState } from 'react';
import { Image } from 'react-bootstrap'
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Divider } from '@mui/material';
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu';

type Props = {
    event: EventType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function EventCard({ event, isMyProfile, notifyChange }: Props) {
    const { id, contentName, description, fromDate, toDate, imageFilepath, location, mapsEnabled, username, profilePicPath, displayName, timestamp } = event;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const[showMap, setShowMap] = useState<boolean>(false);
    const src: string = "https://www.google.com/maps/embed/v1/place?key=" + process.env.REACT_APP_GOOGLE_MAPS_API + "&q=" + location

    return (
        <div className="card">
            <div className="card-icons" style={{display: "flex"}}>
                <p className="card-text-secondary">
                    {timestamp && moment(new Date(timestamp).toUTCString()).fromNow()}
                </p>
                {isMyProfile &&
                    <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit}/>
                }
            </div>

            <GenericDeleteModal
                contentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"Event"}
            />

            <EditEventModal
                event={event}
                notifyChange={notifyChange}
                editOpen={editOpen}
                handleCloseEdit={handleCloseEdit}
            />

            <div className="card-body">
                <div style={{display: "flex"}}>
                    <Link to={`/profile/${username}`} style={{textDecoration: 'none'}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Image className="profile-pic-card" src={profilePicPath || "img_avatar.png"} style={{float: "left"}} roundedCircle/>
                            <h5 className="card-title" style={{marginLeft:"2%"}}>{displayName}</h5>
                        </div>
                    </Link>
                </div>
                <Divider variant="fullWidth" component="div" sx={{margin:"2% 0"}}/>
                <div style={{display: "flex", margin: "0 0"}}>
                    <div style={{flex: "1 0 0"}}>
                        <h5 className="card-title">{contentName}</h5>
                        <p className="card-text-secondary">{description}</p>
                        <p className="card-text">{"From: " + moment(new Date(fromDate).toUTCString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        <p className="card-text">{"To: " + moment(new Date(toDate).toUTCString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        {location && <p className="card-text">{"Location: " + location}</p>}
                        {mapsEnabled ? <p className="card-text" style={{textDecoration:"underline"}} onClick={() => setShowMap(!showMap)}>{showMap ? "Hide map" : "Show map"}</p> : <></>}
                    </div>
                    {imageFilepath ?
                        <div style={{flex: "1 0 0"}}>
                            <Image src={imageFilepath} style={{ height: "auto", width: "auto", maxHeight: "30vh", maxWidth: "100%",float:"right", overflow: "hidden"}} />
                        </div>
                        :
                        <></>
                    }
                </div>
                <div style={{marginTop: "2%"}}>
                    {
                        mapsEnabled && showMap ?
                            <iframe
                                title="map"
                                width="100%"
                                height="300em"
                                style={{ border: "0" }}
                                loading="lazy"
                                allowFullScreen
                                src={src}
                            /> 
                            : 
                            <></>
                    }
                </div>
            </div>

        </div>
    )
}
