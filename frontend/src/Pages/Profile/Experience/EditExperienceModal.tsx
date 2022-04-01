import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { ExperienceType, GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';
import { Checkbox, FormControlLabel } from '@mui/material';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'

type Props = {
    experience: ExperienceType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditExperienceModal({ experience, notifyChange, editOpen, handleCloseEdit }: Props) {
    const [newContentValue, setNewContentValue] = useState<ExperienceType>(experience)

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [fromDateErrorMessage, setFromDateErrorMessage] = useState("");
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseEdit();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentValue(experience);
    }

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

        error = (!newContentValue.isDateCurrent && checkDateError(newContentValue.fromDate, newContentValue.toDate)) || error;

        return (error)
    }

    function checkIfEmpty(value: string | Date | null | undefined, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if (!value) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    }

    function checkDateError(from: Date | null, to: Date | null): boolean {
        if (from && to) {
            // from and to are strings for some reason
            to = new Date(to);
            from = new Date(from);
            if (from.getDate() > to.getDate()) {
                setFromDateError(true);
                setFromDateErrorMessage("Start date must be before end date");
                return true;
            }
        }
        setFromDateErrorMessage("");
        return false;
    }


    async function confirmEditHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                uid: newContentValue.uid,
                contentType: "experience",
                contentName: newContentValue.contentName,
                contentText: newContentValue.contentText,
                description: newContentValue.description,
                // fromDate: newContentValue.fromDate?.toISOString().slice(0, 19).replace('T', ' '),
                // toDate: newContentValue.toDate?.toISOString().slice(0, 19).replace('T', ' '),
                fromDate: new Date(newContentValue?.fromDate?.toString()!).toISOString().slice(0, 19).replace('T', ' '),
                toDate: newContentValue.toDate ? new Date(newContentValue?.toDate?.toString()!).toISOString().slice(0, 19).replace('T', ' ') : null,
                isDateCurrent: newContentValue.isDateCurrent,
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

        handleCloseEdit();
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit Experience"} onHide={onHide} confirm={confirmEditHandler} actionText={"Update"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField
                        title="Experience Title"
                        type="contentName"
                        onChange={handleChange}
                        value={newContentValue.contentName}
                        isRequired={true}
                        error={nameError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                    />
                    <GenericInputField
                        title="Role"
                        type="contentText"
                        onChange={handleChange}
                        value={newContentValue.contentText}
                        isRequired={true}
                        error={textError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                    />
                    <GenericInputField
                        title="Description"
                        type="description"
                        onChange={handleChange}
                        value={newContentValue.description}
                        isRequired={false}
                        isMultiline={true}
                        maxLength={parseInt(DefaultValues.maxLengthLong)}
                    />
                    <GenericDatePicker
                        title={'Start date'}
                        type={"fromDate"}
                        value={newContentValue.fromDate || null}
                        isRequired={true}
                        onChange={handleChange}
                        error={fromDateError}
                        errorMessage={fromDateErrorMessage}
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
                        control={<Checkbox checked={!!newContentValue.isDateCurrent}
                            onChange={() => handleChange(!newContentValue.isDateCurrent, "isDateCurrent")} />}
                        label="I currently hold this position"
                    />
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
