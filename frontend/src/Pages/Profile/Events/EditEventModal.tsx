import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { EventType, GenericHandlerType, TagType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import PlacesAutocomplete from './PlacesAutocomplete';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Alert } from 'react-bootstrap';
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import GenericDateTimePicker from '../../../Helper/Generics/GenericDateTimePicker';
import { deleteFile } from '../../../Helper/Utils/FileDeleteUtil';
import GenericTagsPicker from '../../../Helper/Generics/GenericTagsPicker';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'

type Props = {
    event: EventType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditEvent({ event, notifyChange, editOpen, handleCloseEdit }: Props) {
    const [newContentValue, setNewContentValue] = useState<EventType>(event)

    const [nameError, setNameError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);
    const [fromDateErrorMessage, setFromDateErrorMessage] = useState("");
    const [toDateErrorMessage, setToDateErrorMessage] = useState("");
    const [newContentImage, setNewContentImage] = useState<File | null>(null);
    const [newContentTags, setNewContentTags] = useState<Array<TagType>>(JSON.parse(newContentValue.tagArray));
    const [missingLocationError, setMissingLocationError] = useState(false);
    const [imageFileToDelete, setImageFileToDelete] = useState<string>("");
    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    function updateTags(newValue: Array<TagType>) {
        setNewContentTags(newValue);
    }

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseEdit();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentValue(event);
        setNewContentTags(JSON.parse(newContentValue.tagArray));
    }

    const handleChange = (newValue: string | boolean | File | Date | null, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
        console.table(newContentValue)
    }

    const updateImage = (file: File) => {
        setNewContentImage(file);
        handleChange(file.name, "imageFilename")
    }

    const deleteImageFile = () => {
        let fileToDelete = newContentValue.imageFilepath
        if (fileToDelete !== undefined) {
            setImageFileToDelete(fileToDelete)
            handleChange("", "imageFilepath")
        }

        handleChange("", "imageFilename");
        setNewContentImage(null)
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;
        error = checkIfEmpty(newContentValue.fromDate, setFromDateError) || error;
        error = checkIfEmpty(newContentValue.toDate, setToDateError) || error;

        error = checkDateError(newContentValue.fromDate, newContentValue.toDate) || error;
        error = checkToDateError(newContentValue.toDate) || error;

        let isMissingLoc = false;
        isMissingLoc = newContentValue.mapsEnabled && !newContentValue.location;
        setMissingLocationError(isMissingLoc);
        error = isMissingLoc || error;

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
            if (from.getTime() > to.getTime()) {
                setFromDateError(true);
                setFromDateErrorMessage("Start date must be before end date");
                return true;
            }
        }
        setFromDateErrorMessage("");
        return false;
    }

    function checkToDateError(to: Date | null): boolean {
        if (to && new Date(to).getTime() < new Date().getTime()) {
            setToDateErrorMessage("The event cannot end in the past");
            setToDateError(true);
            return true;
        }

        setToDateErrorMessage("");
        return false;
    }

    async function confirmEditHandler() {

        let imageFileToDeleteTemp = imageFileToDelete;
        if (imageFileToDeleteTemp !== "" && imageFileToDeleteTemp !== null) {
            deleteFile(imageFileToDeleteTemp);
            setImageFileToDelete("");
        }

        let newContentImagePath = newContentValue.imageFilepath;
        if (newContentImage !== null) {
            newContentImagePath = await uploadFile(newContentImage, newContentValue.imageFilename, "event image", "uploadImage")
            if (newContentImagePath === '') {
                toast.error('Failed to update event');
                return;
            }
        }

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                uid: newContentValue.uid,
                contentType: "event",
                contentName: newContentValue.contentName,
                description: newContentValue.description,
                // fromDate: newContentValue.fromDate?.toISOString().slice(0, 19).replace('T', ' '),
                // toDate: newContentValue.toDate?.toISOString().slice(0, 19).replace('T', ' '),
                fromDate: new Date(newContentValue?.fromDate?.toString()!).toISOString().slice(0, 19).replace('T', ' '),
                toDate: new Date(newContentValue?.toDate?.toString()!).toISOString().slice(0, 19).replace('T', ' '),
                imageFilepath: newContentImagePath || "",
                imageFilename: newContentValue.imageFilename,
                location: newContentValue.location,
                mapsEnabled: newContentValue.mapsEnabled,
                tagArray: newContentTags,
                isContest: newContentValue.isContest,
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

        handleCloseEdit();
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit Event"} onHide={onHide} confirm={confirmEditHandler} actionText={"Update"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField
                        title="Event Title"
                        type="contentName"
                        onChange={handleChange}
                        value={newContentValue.contentName}
                        isRequired={true}
                        error={nameError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                    />
                    <GenericInputField
                        title="Description"
                        type="description"
                        onChange={handleChange}
                        value={newContentValue.description}
                        isMultiline={true}
                        isRequired={false}
                        maxLength={parseInt(DefaultValues.maxLengthLong)}
                    />
                    <FormControlLabel style={{marginLeft: "1.7%"}}
                        control={<Checkbox checked={!!newContentValue.isContest}
                            onChange={() => handleChange(!newContentValue.isContest, "isContest")} />}
                        label="This event is a contest"
                    />
                    <GenericDateTimePicker
                        title={'Start date'}
                        type={"fromDate"}
                        value={newContentValue.fromDate || null}
                        isRequired={true}
                        onChange={handleChange}
                        error={fromDateError}
                        errorMessage={fromDateErrorMessage}
                    />
                    <GenericDateTimePicker
                        title={'End date'}
                        type={"toDate"}
                        value={newContentValue.toDate || null}
                        isRequired={true}
                        onChange={handleChange}
                        error={toDateError}
                        errorMessage={toDateErrorMessage}
                    />
                    <GenericTagsPicker updateTags={updateTags} defaultValue={newContentTags} />
                    <PlacesAutocomplete location={newContentValue.location} updateLocation={handleChange} />
                    <FormControlLabel
                        control={<Checkbox checked={!!newContentValue.mapsEnabled}
                            onChange={() => handleChange(!newContentValue.mapsEnabled, "mapsEnabled")} />}
                        label="Enable map"
                    />
                    <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newContentValue.imageFilename} />
                    {missingLocationError ? <Alert variant="danger">{"You must add a location or uncheck the maps enabled box"}</Alert> : <></>}
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
