import React from 'react'
import { Container } from 'react-bootstrap'
import TopNavBar from './TopNavBar'
import './MyProfileStyle.css'

export default function MyProfile() {
    return (
        <>
            <TopNavBar/>
            <Container className="d-flex justify-content-center" style = {{minHeight:"100vh", padding:"5%"}}>
                <div className="w-100" style={{maxWidth:"400px"}}>
                    <div id="container">
                        <div id="my-profile-box"></div>
                        Username
                    </div>
                    
                </div>
            </Container>
        </>
    )
}
