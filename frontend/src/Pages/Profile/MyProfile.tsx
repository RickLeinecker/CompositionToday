import React from 'react'
import { Container } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'

export default function MyProfile() {
    return (
        <>
            <TopNavBar />
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <div>
                        My profile
                    </div>
                </div>
            </Container>
        </>
    )
}
