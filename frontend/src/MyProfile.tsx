import React from 'react'
import { Button, Container } from 'react-bootstrap'
import TopNavBar from './TopNavBar'
import './MyProfileStyle.css'

export default function MyProfile() {
    return (
        <>
            <TopNavBar/>
            <Container className="d-flex justify-content-center" style = {{minHeight:"100vh", padding:"3%"}}>
                <div id="container">
                    <h1 style = {{padding: "2%", fontSize: "3vw"}}>Username</h1>
                    <Button variant="light">Experience</Button>{' '}
                    <Button variant="light">Music</Button>{' '}
                    <Button variant="light">Events</Button>{' '}
                    <Button variant="light">Articles</Button>{' '}
                    <div id="my-profile-box"></div>
                </div>
            </Container>
        </>
    )
}
