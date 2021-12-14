import React from 'react'

export default function ExperienceCard(props: any) {
    return (
        <div>
            <li key={props.id}>
                <p>{props.contentName}</p>
                <p>{props.contentText}</p>
                <p>{props.timestamp}</p>
            </li> 
        </div>
    )
}
