import React, { useEffect } from 'react'
import TopNavBar from '../TopNavBar'

export default function Blog() {

    useEffect(() => {
        window.location.replace("http://compositiontoday.net/comptodayblog");
    },[])

    return (
        <>
            <TopNavBar />
        </>
    )
}
