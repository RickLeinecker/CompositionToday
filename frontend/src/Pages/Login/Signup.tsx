import { useRef, useState } from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Alert from "react-bootstrap/Alert"
import { useAuth } from '../../FirebaseAuth/AuthContext';
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'

export default function Signup() {

    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const { signup } = useAuth()
    const history = useHistory()

    async function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault()

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current?.value, passwordRef.current?.value)
            history.push("/")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)

    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign up</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passwordRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control type="password" ref={passwordConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="w-100" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log in</Link>
                    </div>
                </div>
            </Container>
        </>
    )
}