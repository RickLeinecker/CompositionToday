import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'

export default function Dashboard() {

    const [error, setError] = useState<string>("")
    const {currentUser, logout} = useAuth()
    function handleLogout(){
        setError('')

        try{
            await logout()
        } catch{
            setError("Failed to log out")
        }
    }
    return (
        <div>
            Dashboard   
        </div>
    )
}
