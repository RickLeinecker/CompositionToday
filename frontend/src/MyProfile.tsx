import React from 'react'
import { Container } from 'react-bootstrap'
import TopNavBar from './TopNavBar'
import './MyProfileStyle.css'

export default function MyProfile() {
    return (
        <>
            <TopNavBar/>
            <Container className="d-flex justify-content-center" style = {{minHeight:"100vh", padding:"3%"}}>
                <div id="container">
                    <div id="my-profile-box"></div>
                    <h1 style = {{padding: "2%"}}>Username</h1>
                </div>
            </Container>
        </>
    )
}
