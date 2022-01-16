import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import { toSqlDatetime } from '../../../Helper/Utils/DateUtils';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';


type Props = {
    userID: number;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateEventModal({ userID, notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentFromDate, setNewContentFromDate] = useState<Date | null>(null);
    const [newContentToDate, setNewContentToDate] = useState<Date | null>(null);

    const [nameError, setNameError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentName, setNameError) || error;
        error = checkIfEmpty(newContentFromDate, setFromDateError) || error;
        error = checkIfEmpty(newContentToDate, setToDateError) || error;

        return(error)
    }

    function checkIfEmpty(value: string | Date | null, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if(!value){
            setError(true);
            return true;
        } else{
            setError(false);
            return false;
        }
    }
    
    async function confirmCreateHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID,
                contentName: newContentName,
                contentType: "event",
                description: newContentDescription,
                fromDate: toSqlDatetime(newContentFromDate),
                toDate: toSqlDatetime(newContentToDate),
            }),
            methodType: "POST",
            path: "createContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create event');
                return;
            }

            notifyChange();
            toast.success('Event created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create event');
        }

        setNewContentName("")
        setNewContentDescription("")
        setNewContentToDate(null)
        setNewContentFromDate(null)

        setNameError(false);
        setToDateError(false);
        setFromDateError(false);
    }

    return (
        <GenericModal 
        show={createOpen} 
        title={"Create"} 
        onHide={handleCloseCreate} 
        confirm={confirmCreateHandler} 
        actionText={"Save"} 
        checkForErrors={checkForErrors}
        >
            <div>
                <GenericInputField title="Event Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true} error={nameError}/>
                <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} isRequired={false}/>    
                <GenericDatePicker 
                    title={'Start date'} 
                    type={"fromDate"}
                    value={newContentFromDate} 
                    isRequired={true} 
                    onChange={setNewContentFromDate}
                    error={fromDateError}                    
                />
                <GenericDatePicker 
                    title={'End date'} 
                    type={"toDate"}
                    value={newContentToDate} 
                    isRequired={true} 
                    onChange={setNewContentToDate}
                    error={toDateError}                    
                />
            </div>
        </GenericModal>
    )
}