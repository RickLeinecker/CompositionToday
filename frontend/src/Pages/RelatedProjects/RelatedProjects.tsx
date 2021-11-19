import { Button } from 'react-bootstrap'
import useModal from '../../Helper/CustomHooks/useModal';
import TopNavBar from '../TopNavBar';
import GenericModal from '../../Helper/Generics/GenericModal';
import GenericInput from '../../Helper/Generics/GenericInput';
import GenericForm from '../../Helper/Generics/GenericForm';
import GenericSearch from '../../Helper/Generics/GenericSearch';

export default function RelatedProjects() {
    const { open, handleClick, handleClose } = useModal();

    return (
        <>
            <TopNavBar />
            <div className="container">

                <div>
                    Related Projects
                </div>
                <p>Modal</p>
                <Button variant="warning" onClick={handleClick}>Test Modal</Button>
                <GenericModal show={open} title={"Test"} onHide={handleClose} >
                    <>
                        <h4>Centered Modal</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </p>
                        <GenericForm />
                    </>
                </GenericModal>
                <p>Inputs</p>
                <GenericInput />
                <p>Search Bar</p>
                <GenericSearch />
            </div>
        </>
    )
}
