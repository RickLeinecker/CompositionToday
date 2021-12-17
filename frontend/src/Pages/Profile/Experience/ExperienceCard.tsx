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

    const { open, handleClick, handleClose } = useOpen();

    return (
        <div className="card" style={{display: "flex"}}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>
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
                {isMyProfile && 
                    <>
                        <Button onClick={handleClick}>Edit</Button>
                        <Button onClick={handleClick}>Delete</Button>
                    </>
                }
            </div>
        </div>
    )
}
