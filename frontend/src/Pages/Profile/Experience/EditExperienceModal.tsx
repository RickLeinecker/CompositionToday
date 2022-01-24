import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';
import { toSqlDatetime } from '../../../Helper/Utils/DateUtils';
import { Checkbox, FormControlLabel } from '@mui/material';

type Props = {
    experience: ExperienceType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditExperienceModal({experience, notifyChange, editOpen, handleCloseEdit}: Props) {
    const [newContentValue, setNewContentValue] = useState<ExperienceType>(experience)

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);

    const handleChange = (newValue: string | Date | null | boolean, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;
        error = checkIfEmpty(newContentValue.contentText, setTextError) || error;
        error = checkIfEmpty(newContentValue.fromDate, setFromDateError) || error;
        error = (checkIfEmpty(newContentValue.toDate, setToDateError) && !newContentValue.isDateCurrent) || error;

        return(error)
    }

    function checkIfEmpty(value: string | Date | null | undefined, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if(!value){
            setError(true);
            return true;
        } else{
            setError(false);
            return false;
        }
    }

    async function confirmEditHandler() {
        console.log(newContentValue.isDateCurrent);
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                userID: newContentValue.userID,
                contentType: "experience",
                contentName: newContentValue.contentName,
                contentText: newContentValue.contentText,
                description: newContentValue.description,
                // fromDate: newContentValue.fromDate?.toISOString().slice(0, -1),
                fromDate: toSqlDatetime(newContentValue.fromDate),
                toDate: toSqlDatetime(newContentValue.toDate),
                isDateCurrent: newContentValue.isDateCurrent,
                // toDate: newContentValue.toDate?.toISOString().slice(0, -1),
            }),
            methodType: "PATCH",
            path: "updateContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update experience")
                return;
            }

            toast.success("Experience updated")
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update experience")
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Experience Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} isRequired={true} error={nameError}/>
                    <GenericInputField title="Role" type="contentText" onChange={handleChange} value={newContentValue.contentText} isRequired={true} error={textError}/>
                    <GenericInputField title="Description" type="description" onChange={handleChange} value={newContentValue.description} isRequired={false}/>
                    <GenericDatePicker 
                        title={'Start date'} 
                        type={"fromDate"}
                        value={newContentValue.fromDate || null} 
                        isRequired={true} 
                        onChange={handleChange}
                        error={fromDateError}                    
                    />
                    {!newContentValue.isDateCurrent &&
                        <GenericDatePicker 
                            title={'End date'} 
                            type={"toDate"}
                            value={newContentValue.toDate || null}  
                            isRequired={true} 
                            onChange={handleChange}
                            error={toDateError}               
                        />
                    }
                    <FormControlLabel 
                        control={<Checkbox checked={newContentValue.isDateCurrent} 
                        onChange={() => handleChange(!newContentValue.isDateCurrent, "isDateCurrent")}/>} 
                        label="I currently hold this position" 
                    />
                </>
            </GenericModal>
        </div>
    )
}
