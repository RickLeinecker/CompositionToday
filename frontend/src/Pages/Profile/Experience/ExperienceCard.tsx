import { Button } from 'react-bootstrap';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericForm from '../../../Helper/Generics/GenericForm';
import GenericModal from '../../../Helper/Generics/GenericModal';

type Props = {
    contentName: string;
    contentText: string;
    timestamp: string;
    description?: string;
    isMyProfile: boolean;
    contentID: number;
}


export default function ExperienceCard({contentName, contentText, timestamp, description, isMyProfile, contentID}: Props) {

    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();

    return (
        <div className="card" style={{display: "flex"}}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>
                <GenericModal show={deleteOpen} title={"Delete"} onHide={handleCloseDelete} actionText={"Delete"} >
                    <>
                        <p>
                            Are you sure you want to delete this?
                        </p>
                    </>
                </GenericModal>

                <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} actionText={"Edit"}>
                    <>
                        <GenericForm />
                    </>
                </GenericModal>
                {isMyProfile && 
                    <>
                        <Button onClick={handleOpenEdit}>Edit</Button>
                        <Button onClick={handleOpenDelete}>Delete</Button>
                    </>
                }
            </div>
        </div>
    )
}
