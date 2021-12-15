import React from 'react'

export default function ExperienceCard(props: any) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.contentName}</h5>
                <p className="card-text">{props.contentText}</p>
                <p className="card-text">{props.timestamp}</p>
            </div>
        </div>
    )
}
