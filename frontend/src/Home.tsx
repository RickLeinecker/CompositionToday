import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import {useHistory} from "react-router-dom"
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'

export default function Home() {

    
    const [error, setError] = useState<string>("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout(){
        setError('')

        try{
            await logout()
            history.push("/login")
        } catch{
            setError("Failed to log out")
        }
    }
    return (
        <>
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
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                Homepage 
                <Button variant="link" onClick={handleLogout}>
                    Logout
                </Button>  
            </div>
        </>
    )
}
