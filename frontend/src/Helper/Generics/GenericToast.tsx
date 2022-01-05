import React, { useState } from 'react'
import { Row, Col, Toast, ToastContainer } from 'react-bootstrap';

type Props = {
    resetToast: () => void;
    toastType: string;
}

export default function GenericToast({toastType, resetToast}: Props) {
    const [show, setShow] = useState(false);
    
    return (
        <Row>
            <Col xs={6}>
                <ToastContainer className="p-3" position={"top-start"}>
                    <Toast onClose={() => {setShow(false); resetToast()}} show={show} delay={3000} bg={toastType} autohide>
                        <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Composition Today</strong>
                        {/* <small>11 mins ago</small> */}
                        </Toast.Header>
                        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
      </Row>
    )
}
