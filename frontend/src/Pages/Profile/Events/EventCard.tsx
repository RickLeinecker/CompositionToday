import { EventType } from '../../../ObjectInterface';
import { useState } from 'react';
import { Image } from 'react-bootstrap'
import moment from 'moment';
import { Divider } from '@mui/material';
import EventCardHeader from './EventCardHeader';
import CardFooter from '../CardFooter';

type Props = {
    event: EventType;
    isMyProfile: boolean;
    notifyChange: () => void;
    notifyVirtualizer: () => void;
    clearCache: () => void;
}


export default function EventCard({ event, isMyProfile, notifyVirtualizer, notifyChange, clearCache }: Props) {
    const { id, contentName, description, fromDate, toDate, imageFilepath, location, mapsEnabled, username, profilePicPath, displayName, timestamp, likeCount, isLikedByLoggedInUser } = event;
    const [showMap, setShowMap] = useState<boolean>(false);
    const src: string = "https://www.google.com/maps/embed/v1/place?key=" + process.env.REACT_APP_GOOGLE_MAPS_API + "&q=" + location
    const [showMore, setShowMore] = useState(false);


    const handleMapExpand = () => {
        setShowMap(prev => !prev);
        clearCache();
        notifyVirtualizer();
    }

    return (
        <div className="card">
            <EventCardHeader event={event} isMyProfile={false} notifyChange={notifyChange} />

            <Divider variant="fullWidth" component="div" sx={{ margin: "0.5% auto", width: "95%" }} />

            <div className="card-body" style={{ paddingBottom: "0%" }}>
                <div style={{ display: "flex", margin: "0 0" }}>
                    <div style={{ flex: "1 0 0" }}>
                        <h5 className="card-title">{contentName}</h5>
                        <p className="card-text-secondary" style={{marginBottom: "0%"}}>{(showMore || !description || description.length <= 250) ? description : description?.substring(0, 250) + "..."}</p>
                        <div style={{float: "right"}}>
                            {(!showMore && description && description.length > 250) && <p style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => {setShowMore(true); clearCache(); notifyVirtualizer()}}>Show more</p>}
                            {(showMore && description && description.length > 250) && <p style={{cursor: "pointer", textDecoration: "underline"}} onClick={() => {setShowMore(false); clearCache(); notifyVirtualizer()}}>Show less</p>}
                        </div>
                        <br/>
                        <p className="card-text">{"From: " + moment(new Date(fromDate).toUTCString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        <p className="card-text">{"To: " + moment(new Date(toDate).toUTCString()).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        {location && <p className="card-text">{"Location: " + location}</p>}
                        {mapsEnabled ? <p className="card-text" style={{ textDecoration: "underline" }} onClick={handleMapExpand}>{showMap ? "Hide map" : "Show map"}</p> : <></>}
                    </div>
                    {imageFilepath ?
                        <div style={{ flex: "1 0 0" }}>
                            <Image src={imageFilepath} style={{ height: "auto", width: "auto", maxHeight: "30vh", maxWidth: "100%", float: "right", overflow: "hidden" }} />
                        </div>
                        :
                        <></>
                    }
                </div>
                <div style={{ marginTop: "2%" }}>
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

            <Divider variant="fullWidth" component="div" sx={{ margin: "1% auto", width: "95%" }} />

            <div>
                <CardFooter
                    clearCache={clearCache}
                    notifyVirtualizer={notifyVirtualizer}
                    notifyChange={notifyChange}
                    id={id}
                    likeCount={likeCount}
                    isLikedByLoggedInUser={isLikedByLoggedInUser}
                />
            </div>

        </div>
    )
}
