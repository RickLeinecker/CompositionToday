import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';
import { toSqlDatetime } from '../../../Helper/Utils/DateUtils';


type Props = {
    userID: number;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateExperienceModal({ userID, notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentFromDate, setNewContentFromDate] = useState<Date | null>(null);
    const [newContentToDate, setNewContentToDate] = useState<Date | null>(null);

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);

    const checkForErrors = (): boolean => {
        let error = false;
        
        if(!newContentName){
            setNameError(true);
            error = true;
        } else{
            setNameError(false)
        }

        if(!newContentText){
            setTextError(true)
            error = true;
        } else{
            setTextError(false)
        }

        if(!newContentFromDate){
            setFromDateError(true)
            error = true;
        } else{
            setFromDateError(false)
        }

        if(!newContentToDate){
            setToDateError(true)
            error = true;
        } else{
            setToDateError(false)
        }

        return(error)
    }

    async function confirmCreateHandler() {

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID,
                contentName: newContentName,
                contentText: newContentText,
                contentType: "experience",
                description: newContentDescription,
                // fromDate: newContentFromDate?.toISOString().slice(0, -1),
                // toDate: newContentToDate?.toISOString().slice(0, -1),
                fromDate: toSqlDatetime(newContentFromDate),
                toDate: toSqlDatetime(newContentToDate),
            }),
            methodType: "POST",
            path: "createContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create experience');
                return;
            }

            notifyChange();
            toast.success('Experience created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create experience');
        }

        setNewContentName("")
        setNewContentText("")
        setNewContentDescription("")
        setNewContentToDate(null)
        setNewContentFromDate(null)

        setNameError(false);
        setTextError(false);
        setToDateError(false);
        setFromDateError(false);
    }

    return (
        <div>
            <GenericModal 
                show={createOpen} 
                title={"Create"} 
                onHide={handleCloseCreate} 
                confirm={confirmCreateHandler} 
                actionText={"Save"} 
                checkForErrors={checkForErrors}
            >
                <div>
                    <GenericInputField title="Experience Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true} error={nameError}/>
                    <GenericInputField title="Role" type="contentText" onChange={setNewContentText} value={newContentText} isRequired={true} error={textError}/>
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
        </div>
    )
}
