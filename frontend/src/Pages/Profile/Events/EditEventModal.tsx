import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { EventType, GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';
import { toSqlDatetime } from '../../../Helper/Utils/DateUtils';

type Props = {
    event: EventType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditEvent({event, notifyChange, editOpen, handleCloseEdit}: Props) {
    const [newContentValue, setNewContentValue] = useState<EventType>(event)

    const [nameError, setNameError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const handleDateChange = (newValue: Date | null, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;
        error = checkIfEmpty(newContentValue.fromDate, setFromDateError) || error;
        error = checkIfEmpty(newContentValue.toDate, setToDateError) || error;

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
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                userID: newContentValue.userID,
                contentType: "event",
                contentName: newContentValue.contentName,
                description: newContentValue.description,
                fromDate: toSqlDatetime(newContentValue.fromDate),
                toDate: toSqlDatetime(newContentValue.toDate),
            }),
            methodType: "PATCH",
            path: "updateContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update event")
                return;
            }

            toast.success("Event updated")
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update event")
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Experience Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} isRequired={true} error={nameError}/>
                    <GenericInputField title="Description" type="description" onChange={handleChange} value={newContentValue.description} isRequired={false}/>
                    <GenericDatePicker 
                        title={'Start date'} 
                        type={"fromDate"}
                        value={newContentValue.fromDate || null} 
                        isRequired={true} 
                        onChange={handleDateChange}
                        error={fromDateError}                    
                    />
                    <GenericDatePicker 
                        title={'End date'} 
                        type={"toDate"}
                        value={newContentValue.toDate || null}  
                        isRequired={true} 
                        onChange={handleDateChange}
                        error={toDateError}               
                    />
                </>
            </GenericModal>
        </div>
    )
}
