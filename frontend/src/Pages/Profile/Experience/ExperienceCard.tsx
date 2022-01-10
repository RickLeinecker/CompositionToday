import { ExperienceType } from '../../../ObjectInterface';
import DeleteExperienceModal from './DeleteExperienceModal';
import EditExperienceModal from './EditExperienceModal';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    experience: ExperienceType;
    isMyProfile: boolean;
    notifyChange: () => void;
}//


export default function ExperienceCard({ experience, isMyProfile, notifyChange }: Props) {
    const { id, contentName, contentText, description, timestamp } = experience;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    return (
        <div className="card" style={{ display: "flex" }}>
            <div className="card-body">
                <h5 className="card-title">{contentName}</h5>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{description}</p>
                <p className="card-text">{timestamp}</p>

                {isMyProfile && 
                    <>
                        <div>
                            <EditIcon onClick={handleOpenEdit}/> 
                            <DeleteIcon onClick={handleOpenDelete}/>
                        </div>

                        <DeleteExperienceModal 
                        contentID={id}
                        notifyChange={notifyChange} 
                        deleteOpen={deleteOpen}
                        handleOpenDelete={handleOpenDelete}
                        handleCloseDelete={handleCloseDelete}
                        />

                        <EditExperienceModal
                            experience={experience}
                            notifyChange={notifyChange}
                            editOpen={editOpen}
                            handleOpenEdit={handleOpenEdit}
                            handleCloseEdit={handleCloseEdit}
                        />
                    </>
                }
            </div>
        </div>
    )
}
