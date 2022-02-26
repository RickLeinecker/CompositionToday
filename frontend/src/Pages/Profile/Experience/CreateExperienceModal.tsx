import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';
import { Checkbox, FormControlLabel } from '@mui/material';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'


type Props = {
    uid: string;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateExperienceModal({ uid, notifyChange, createOpen, handleCloseCreate }: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentFromDate, setNewContentFromDate] = useState<Date | null>(null);
    const [newContentToDate, setNewContentToDate] = useState<Date | null>(null);
    const [newContentIsDateCurrent, setNewContentIsDateCurrent] = useState<boolean>(false);

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [fromDateErrorMessage, setFromDateErrorMessage] = useState("");
    const [toDateError, setToDateError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseCreate();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentName("")
        setNewContentText("")
        setNewContentDescription("")
        setNewContentToDate(null)
        setNewContentFromDate(null)
        setNewContentIsDateCurrent(false)

        setNameError(false);
        setTextError(false);
        setToDateError(false);
        setFromDateError(false);
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentName, setNameError) || error;
        error = checkIfEmpty(newContentText, setTextError) || error;
        error = checkIfEmpty(newContentFromDate, setFromDateError) || error;
        error = (checkIfEmpty(newContentToDate, setToDateError) && !newContentIsDateCurrent) || error;

        error = (!newContentIsDateCurrent && checkDateError(newContentFromDate, newContentToDate)) || error;

        return (error)
    }

    function checkDateError(from: Date | null, to: Date | null): boolean {
        if (from && to && from.getDate() > to.getDate()) {
            setFromDateError(true);
            setFromDateErrorMessage("Start date must be before end date");
            return true;
        }
        setFromDateErrorMessage("");
        return false;
    }


    function checkIfEmpty(value: string | Date | null, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if (!value) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    }

    async function confirmCreateHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: uid,
                contentName: newContentName,
                contentText: newContentText,
                contentType: "experience",
                description: newContentDescription,
                fromDate: newContentFromDate?.toISOString().slice(0, 19).replace('T', ' '),
                toDate: newContentToDate?.toISOString().slice(0, 19).replace('T', ' '),
                isDateCurrent: newContentIsDateCurrent,
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

        clearFields()
        handleCloseCreate();
    }

    return (
        <div>
            <GenericModal
                show={createOpen}
                title={"Create"}
                onHide={onHide}
                confirm={confirmCreateHandler}
                actionText={"Save"}
                checkForErrors={checkForErrors}
            >
                <div>
                    <GenericInputField
                        title="Experience Title"
                        type="contentName"
                        onChange={setNewContentName}
                        value={newContentName}
                        isRequired={true}
                        error={nameError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                        
                    />
                    <GenericInputField
                        title="Role"
                        type="contentText"
                        onChange={setNewContentText}
                        value={newContentText}
                        isRequired={true}
                        error={textError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                    />
                    <GenericInputField
                        title="Description"
                        type="description"
                        onChange={setNewContentDescription}
                        value={newContentDescription}
                        isRequired={false}
                        isMultiline={true}
                        maxLength={parseInt(DefaultValues.maxLengthLong)}
                    />
                    <GenericDatePicker
                        title={'Start date'}
                        type={"fromDate"}
                        value={newContentFromDate}
                        isRequired={true}
                        onChange={setNewContentFromDate}
                        error={fromDateError}
                        errorMessage={fromDateErrorMessage}
                    />
                    {!newContentIsDateCurrent &&
                        <GenericDatePicker
                            title={'End date'}
                            type={"toDate"}
                            value={newContentToDate}
                            isRequired={true}
                            onChange={setNewContentToDate}
                            error={toDateError}
                        />
                    }
                    <FormControlLabel
                        control={<Checkbox checked={newContentIsDateCurrent}
                            onChange={() => setNewContentIsDateCurrent(!newContentIsDateCurrent)} />}
                        label="I currently hold this position"
                    />
                </div>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}

