import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalProps {
    children: JSX.Element;
    title?: string | null | undefined;
    show: boolean;
    onHide: () => void;
}

/**
 * Generic Modal component for displaying. General use case for activating
 * will be through a button that toggles boolean to open the modal.
 * USING THE useModal() CUSTOM HOOK WILL BE HELPFUL.
 * @param show boolean on whether to open the modal
 * @param title [Optional] string that displays as large text in modal
 * @param children JSX children to display in modal
 * @returns JSX for usable modal
 */
const GenericModal = (props: ModalProps): JSX.Element => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GenericModal;