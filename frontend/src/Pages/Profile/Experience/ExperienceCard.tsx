import React from 'react'

type Props = {
    contentName?: string | undefined;
    contentText?: string | undefined;
    timestamp?: string | undefined;
    description?: string | undefined;
}

export default function ExperienceCard({contentName, contentText, timestamp, description}: Props) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{"contentName"}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>
            </div>
        </div>
    )
}
