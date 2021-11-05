import {useRef, useState} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Alert from "react-bootstrap/Alert"
import { useAuth } from './contexts/AuthContext';
import {Link} from 'react-router-dom'

export default function Login(){

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const login = useAuth()

    async function handleSubmit(e: { preventDefault: () => void; }){
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            await signup(emailRef.current?.value, passwordRef.current?.value)
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
        
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Log in</h2>
                    {error && <Alert variant ="danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className = "w-100" type="submit">
                            Log in
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}