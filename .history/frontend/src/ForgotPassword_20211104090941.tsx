import {useRef, useState} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Alert from "react-bootstrap/Alert"
import { useAuth } from './contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom'

export default function ForgotPassword(){

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null);
    const {login} = useAuth()
    const history = useHistory()

    async function handleSubmit(e: { preventDefault: () => void; }){
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
            // await login(emailRef.current?.value, passwordRef.current?.value)
            history.push("/")
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Reset Password</h2>
                    {error && <Alert variant ="danger">{error}</Alert>}
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className = "w-100" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Need an account? <Link to="/signup">Sign up</Link>
            </div>
        </>
    )
}