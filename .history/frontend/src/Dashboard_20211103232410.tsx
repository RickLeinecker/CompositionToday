import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link, useHistory} from "react-router-dom"

export default function Dashboard() {

    
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
        <div>
            Dashboard   
        </div>
    )
}
