import React from 'react'
import { Button } from 'react-bootstrap';

type Props = {
    contentName: string;
    contentText: string;
    timestamp: string;
    description?: string;
    isMyProfile: boolean;
    contentID: number;
}


export default function ExperienceCard({contentName, contentText, timestamp, description, isMyProfile, contentID}: Props) {

    function openEditModal(){
        console.log("open edit here");
    }

    function openDeleteModal(){
        console.log("open delete here");
    }

    return (
        <div className="card" style={{display: "flex"}}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>
                {isMyProfile && 
                    <>
                        <Button onClick={openEditModal}>Edit</Button>
                        <Button onClick={openDeleteModal}>Delete</Button>
                    </>
                }
            </div>
        </div>
    )
}
