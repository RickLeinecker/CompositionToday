import { ExperienceType } from '../../../ObjectInterface';
import EditExperienceModal from './EditExperienceModal';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import './ExperienceStyle.scss';
import GenericDeleteModal from '../../../Helper/Generics/GenericDeleteModal';
import GenericCardMenu from '../../../Helper/Generics/GenericCardMenu';

type Props = {
    experience: ExperienceType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function ExperienceCard({ experience, isMyProfile, notifyChange }: Props) {
    const { id, contentName, contentText, description, fromDate, toDate, isDateCurrent } = experience;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    

    const startDate =  !fromDate ? undefined : new Date(fromDate);
    const endDate = !toDate ? undefined : new Date(toDate);

    return (
        <div className="card">
            <div className="card-icons" style={{display: "flex"}}>
                {isMyProfile &&
                    <GenericCardMenu handleOpenDelete={handleOpenDelete} handleOpenEdit={handleOpenEdit}/>
                }
            </div>

            <GenericDeleteModal
                contentID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"Experience"}
            />

            <EditExperienceModal
                experience={experience}
                notifyChange={notifyChange}
                editOpen={editOpen}
                handleCloseEdit={handleCloseEdit}
            />
            
            <div className="card-body">
                <div style={{display: "flex", alignItems: "center"}}>
                    <h1 style={{marginRight: "2%"}}>{contentName}</h1>
                    <h2 className="card-text-secondary">{"(" + contentText + ")"}</h2>
                </div>
                
                <p className="card-text-secondary">
                    {startDate && ((startDate.getUTCMonth() + 1).toString() + "/" + startDate.getUTCFullYear().toString()) + "-" 
                    + (isDateCurrent ? "Current" : (endDate && ((endDate.getUTCMonth() + 1).toString() 
                    + "/" + endDate.getUTCFullYear().toString())))}
                </p>
                <p className="card-text-secondary">{description}</p>
            </div>
        </div>
    )
}
