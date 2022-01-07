import React from 'react'

type Props = {
    userID: number;
    biography: string;
}

export default function BiographySection({userID, biography}: Props) {
    return (
        <>
            <div>
                {biography}
            </div>
        </>
    )
}
