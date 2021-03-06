import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { toast } from 'react-toastify';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil';
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Alert } from 'react-bootstrap';
import { GenericHandlerType, TagType } from '../../../ObjectInterface';
import PlacesAutocomplete from './PlacesAutocomplete';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import GenericDateTimePicker from '../../../Helper/Generics/GenericDateTimePicker';
import GenericTagsPicker from '../../../Helper/Generics/GenericTagsPicker';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'

type Props = {
    uid: string;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateEventModal({ uid, notifyChange, createOpen, handleCloseCreate }: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentFromDate, setNewContentFromDate] = useState<Date | null>(null);
    const [newContentToDate, setNewContentToDate] = useState<Date | null>(null);
    const [newContentImage, setNewContentImage] = useState<File | null>(null);
    const [newContentImageFilename, setNewContentImageFilename] = useState("");
    const [newContentTags, setNewContentTags] = useState<Array<TagType> | null>();
    const [newContentLocation, setNewContentLocation] = useState("");
    const [newContentMapsEnabled, setNewContentMapsEnabled] = useState(false);
    const [newContentIsContest, setNewContentIsContest] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [fromDateErrorMessage, setFromDateErrorMessage] = useState("");
    const [toDateErrorMessage, setToDateErrorMessage] = useState("");
    const [toDateError, setToDateError] = useState(false);
    const [missingLocationError, setMissingLocationError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    function updateTags(newValue: Array<TagType>) {
        setNewContentTags(newValue);
    }

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseCreate();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentName("");
        setNewContentDescription("");
        setNewContentToDate(null);
        setNewContentFromDate(null);
        setNewContentImage(null);
        setNewContentImageFilename("");
        setNewContentLocation("");
        setNewContentMapsEnabled(false);
        setNewContentTags(null);

        setNameError(false);
        setToDateError(false);
        setFromDateError(false);
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentName, setNameError) || error;
        error = checkIfEmpty(newContentFromDate, setFromDateError) || error;
        error = checkIfEmpty(newContentToDate, setToDateError) || error;

        error = checkDateError(newContentFromDate, newContentToDate) || error;
        error = checkToDateError(newContentToDate) || error

        let isMissingLoc = false;
        isMissingLoc = newContentMapsEnabled && !newContentLocation
        setMissingLocationError(isMissingLoc);
        error = isMissingLoc || error;

        return (error)
    }

    function checkDateError(from: Date | null, to: Date | null): boolean {
        if (from && to && from.getTime() > to.getTime()) {
            setFromDateError(true);
            setFromDateErrorMessage("Start date must be before end date");
            return true;
        }

        setFromDateErrorMessage("");
        return false;
    }

    function checkToDateError(to: Date | null): boolean {
        if (to && to.getTime() < new Date().getTime()) {
            setToDateErrorMessage("The event cannot end in the past");
            setToDateError(true);
            return true;
        }

        setToDateErrorMessage("");
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

    const updateImage = (newFile: File) => {
        setNewContentImage(newFile);
        setNewContentImageFilename(newFile.name)
    }

    const deleteImageFile = () => {
        setNewContentImage(null);
        setNewContentImageFilename("");
    }

    const updateLocation = (newLocation: string) => {
        setNewContentLocation(newLocation);
    }

    async function confirmCreateHandler() {

        let newContentImagePath = null;
        if (newContentImage !== null) {
            newContentImagePath = await uploadFile(newContentImage, newContentImageFilename, "event image", "uploadImage")
            if (newContentImagePath === '') {
                toast.error('Failed to create event');
                return;
            }
        }

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: uid,
                contentName: newContentName,
                contentType: "event",
                description: newContentDescription,
                fromDate: newContentFromDate?.toISOString().slice(0, 19).replace('T', ' '),
                toDate: newContentToDate?.toISOString().slice(0, 19).replace('T', ' '),
                imageFilepath: newContentImagePath,
                imageFilename: newContentImageFilename,
                location: newContentLocation,
                mapsEnabled: newContentMapsEnabled,
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                tagArray: newContentTags || [],
                isContest: newContentIsContest,
            }),
            methodType: "POST",
            path: "createContentWithTags",
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

        clearFields();
        handleCloseCreate();
    }

    return (
        <>
            <GenericModal
                show={createOpen}
                title={"Create Event"}
                onHide={onHide}
                confirm={confirmCreateHandler}
                actionText={"Save"}
                checkForErrors={checkForErrors}
            >
                <div>
                    <GenericInputField
                        title="Event Title"
                        type="contentName"
                        onChange={setNewContentName}
                        value={newContentName}
                        isRequired={true}
                        error={nameError}
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
                    <FormControlLabel style={{ marginLeft: "1.7%" }} control={
                        <Checkbox
                            checked={newContentIsContest}
                            onChange={() => setNewContentIsContest(!newContentIsContest)}
                        />
                    } label="This event is a contest" />
                    <GenericDateTimePicker
                        title={'Start date'}
                        type={"fromDate"}
                        value={newContentFromDate}
                        isRequired={true}
                        onChange={setNewContentFromDate}
                        error={fromDateError}
                        errorMessage={fromDateErrorMessage}
                    />
                    <GenericDateTimePicker
                        title={'End date'}
                        type={"toDate"}
                        value={newContentToDate}
                        isRequired={true}
                        onChange={setNewContentToDate}
                        error={toDateError}
                        errorMessage={toDateErrorMessage}
                    />
                    <GenericTagsPicker updateTags={updateTags} />
                    <PlacesAutocomplete updateLocation={updateLocation} location={""} />
                    <FormControlLabel
                        control={<Checkbox checked={newContentMapsEnabled}
                            onChange={() => setNewContentMapsEnabled(!newContentMapsEnabled)} />}
                        label="Enable map"
                    />
                    <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newContentImageFilename} />
                    {missingLocationError && <Alert variant="danger">{"You must add a location or uncheck the maps enabled box"}</Alert>}
                </div>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </>
    )
}
