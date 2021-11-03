import {useRef} from 'react'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import { useAuth } from '@firebase/auth'
import { signInWithPopup } from '@firebase/auth'

export default function Signup(){

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const {signup} = useAuth()

    function handleSubmit(e: { preventDefault: () => void; }){
        e.preventDefault()

        signup(emailRef.current?.value, passwordRef.current?.value)
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign up</h2>
                    <Form>
                        <Form.Group id = "email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id = "password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id = "password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button className = "w-100" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? Log in
            </div>
        </>
    )
}