import { ExperienceType } from '../../../ObjectInterface';
import DeleteExperienceModal from './DeleteExperienceModal';
import EditExperienceModal from './EditExperienceModal';
import EditIcon from '@mui/icons-material/Edit';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import './ExperienceStyle.scss';
import { useState } from 'react';

type Props = {
    experience: ExperienceType;
    isMyProfile: boolean;
    notifyChange: () => void;
}


export default function ExperienceCard({ experience, isMyProfile, notifyChange }: Props) {
    const { id, contentName, contentText, description, fromDate, toDate } = experience;
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();
    const[showOptions, setShowOptions] = useState<boolean>(false);
    

    const startDate =  !fromDate ? undefined : new Date(fromDate);
    const endDate = !toDate ? undefined : new Date(toDate);
    // console.log(!!fromDate && new Date(fromDate))

    return (
        <div className="card" onMouseOver={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>
            {isMyProfile && showOptions && 
                <>
                    <div className="card-icons">
                        <EditIcon onClick={handleOpenEdit}/> 
                        <DeleteIcon onClick={handleOpenDelete}/>
                    </div>

                    <DeleteExperienceModal 
                    contentID={id}
                    notifyChange={notifyChange} 
                    deleteOpen={deleteOpen}
                    handleCloseDelete={handleCloseDelete}
                    />

                    <EditExperienceModal
                        experience={experience}
                        notifyChange={notifyChange}
                        editOpen={editOpen}
                        handleCloseEdit={handleCloseEdit}
                    />
                </>
            }
            <div className="card-body">
                <h1 className="card-title">{contentName}</h1>
                <p className="card-text">{contentText}</p>
                <p className="card-text">{"Start date: " + startDate?.toDateString()}</p>
                <p className="card-text">{"End date: " + endDate?.toDateString()}</p>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}
