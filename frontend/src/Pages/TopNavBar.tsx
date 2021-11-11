import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function TopNavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Composition Today</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/showcase">Showcase</Nav.Link>
                        <Nav.Link href="/related-projects">Related Projects</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link href="/my-profile">
                            <img className="profile-pic" src="img_avatar.png" alt="avatar"/>
                            My Profile
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
