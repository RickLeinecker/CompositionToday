import { useRef, useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Alert from "react-bootstrap/Alert"
import { useAuth } from '../../FirebaseAuth/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import { Container, Nav } from 'react-bootstrap'
import React from 'react'

export default function Login() {

    const [loginEmail, setLoginEmail] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { login } = useAuth()
    const history = useHistory()

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            // if email is verified then, log them in
            await login(emailRef.current?.value, passwordRef.current?.value)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return (
        <>
            <div className="form-container sign-in-container">
                <form className="registration" onSubmit={handleSubmit}>
                    <h1 className="registration">Sign in</h1>
                    <input className="registration" type="email" placeholder="Email" 
                    onChange={(e) => setLoginEmail(e.target.value)} value = {loginEmail}/>
                    <input className="registration" type="password" placeholder="Password" 
                    onChange={(e) => setLoginPassword(e.target.value)} value = {loginPassword}/>
                    
                    <a className = "registration" href="#">Forgot your password?</a>
                    <button className="registration">Sign In</button>
                </form>
            </div>
        </>
    )
}