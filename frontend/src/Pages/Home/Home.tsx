import React, { useState } from 'react'
import { useAuth } from '../../FirebaseAuth/AuthContext'
import { useHistory } from "react-router-dom"
import { Button } from 'react-bootstrap'
import TopNavBar from '../TopNavBar'

export default function Home() {

    // Note: remove the below comments when you use error and currentUser somewhere
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error, setError] = useState<string>("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("Failed to log out")
        }
    }
    return (
        <>
            <TopNavBar />
            <div>
                Homepage
                <Button variant="link" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </>
    )
}
