import React from 'react'

export default function ExperienceCard(props: any) {
    return (
        <div>
            <p>{props.contentName}</p>
            <p>{props.contentText}</p>
            <p>{props.timestamp}</p>
        </div>
    )
}
