import { Button } from 'react-bootstrap'
import useOpen from '../../Helper/CustomHooks/useOpen';
import TopNavBar from '../TopNavBar';
import GenericModal from '../../Helper/Generics/GenericModal';
import GenericInput from '../../Helper/Generics/GenericInput';
import GenericForm from '../../Helper/Generics/GenericForm';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import GenericFilter from '../../Helper/Generics/GenericFilter';
import GenericCard from '../../Helper/Generics/GenericCard';

export default function RelatedProjects() {
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();

    return (
        <>
            <TopNavBar />
            <div className="container">

                <div>
                    Related Projects
                </div>
                <p>Modal</p>
                <Button variant="warning" onClick={handleOpenDelete}>Delete Modal</Button>
                <GenericModal show={deleteOpen} title={"Test"} onHide={handleCloseDelete} actionText={"Delete"}>
                    <>
                        <h4>Delete Modal</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                            consectetur ac, vestibulum at eros.
                        </p>
                        <GenericForm />
                    </>
                </GenericModal>
                <br />
                <br />
                <Button variant="warning" onClick={handleOpenEdit}>Edit Modal</Button>
                <GenericModal show={editOpen} title={"Test"} onHide={handleCloseEdit} actionText={"Edit"}>
                    <>
                        <h4>Edit Modal</h4>
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
                <p>Filter</p>
                <GenericFilter />
                {/* <p>Card</p> */}
                <GenericCard />
            </div>
        </>
    )
}
