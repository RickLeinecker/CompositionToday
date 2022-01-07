import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface ModalProps {
    children: JSX.Element;
    title?: string | null | undefined;
    show: boolean;
    actionText?: string | null | undefined;
    onHide: () => void;
    confirm: () => void;
}

/**
 * Generic Modal component for displaying. General use case for activating
 * will be through a button that toggles boolean to open the modal.
 * USING THE useModal() CUSTOM HOOK WILL BE HELPFUL.
 * @param show boolean on whether to open the modal
 * @param title [Optional] string that displays as large text in modal
 * @param children JSX children to display in modal
 * @param onHide hides modal
 * @param confirm calls a function that does the action when we click the action button
 * @param actiontText sets the text of the action button (eg: Delete)
 * @returns JSX for usable modal
 */
const GenericModal = ({children, title, show, actionText, onHide, confirm}: ModalProps): JSX.Element => {
    return (
        <Modal
            show={show} 
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
                {!!actionText && <Button className="btn-danger" onClick={() => { onHide(); confirm();}}>{actionText}</Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default GenericModal;