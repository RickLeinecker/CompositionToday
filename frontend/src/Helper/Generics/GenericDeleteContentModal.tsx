import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function GenericDeleteContentModal() {
    return (
        <div>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Are you sure you want to delete this?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Confirm</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}
