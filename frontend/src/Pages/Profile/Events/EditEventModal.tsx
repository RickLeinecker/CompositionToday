import React, { useEffect, useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { EventType, GenericHandlerType, TagType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';
import { toSqlDatetime } from '../../../Helper/Utils/DateUtils';
import PlacesAutocomplete from './PlacesAutocomplete';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Alert } from 'react-bootstrap';
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';

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
    const [newContentImage, setNewContentImage] = useState<File | null>(null);
    const [newContentTags, setNewContentTags] = useState<Array<TagType>>();
    const [missingLocationError, setMissingLocationError] = useState(false);
    const [tagOptions, setTagOptions] = useState<TagType[] | undefined>();
    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseEdit();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentValue(event);
    }

    const handleChange = (newValue: string | boolean | File | Date | null, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const updateImage = (file: File) => {
        setNewContentImage(file);
        handleChange(file.name, "imageFilename")
    }

    const deleteImageFile = () => {
        console.log("delete image");
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;
        error = checkIfEmpty(newContentValue.fromDate, setFromDateError) || error;
        error = checkIfEmpty(newContentValue.toDate, setToDateError) || error;

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

    async function confirmEditHandler() {
        let newContentImagePath = null;
        if (newContentImage !== null) {
            newContentImagePath = await uploadFile(newContentImage, newContentValue.imageFilename, "event image", "uploadImage")
            if (newContentImagePath === '') {
                toast.error('Failed to create event');
                return;
            }
        }

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                userID: newContentValue.userID,
                contentType: "event",
                contentName: newContentValue.contentName,
                description: newContentValue.description,
                fromDate: toSqlDatetime(newContentValue.fromDate),
                toDate: toSqlDatetime(newContentValue.toDate),
                imageFilepath: newContentImagePath,
                imageFilename: newContentValue.imageFilename,
                location: newContentValue.location,
                mapsEnabled: newContentValue.mapsEnabled,
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

    // get tags
    useEffect(() => {
        fetchTags();
        async function fetchTags(){
            
            try{
                let answer = (await GenericGetHandler("getTags"));
                if(answer.error.length > 0){
                    // setError(answer.error);
                    return;
                }
                
                // setError("");
                const result = await answer.result;
                setTagOptions(result);

                // setLoading(false);
                

            } catch(e: any){
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
    },[]);

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={onHide} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Experience Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} isRequired={true} error={nameError} />
                    <GenericInputField title="Description" type="description" onChange={handleChange} value={newContentValue.description} isRequired={false} />
                    <GenericDatePicker
                        title={'Start date'}
                        type={"fromDate"}
                        value={newContentValue.fromDate || null}
                        isRequired={true}
                        onChange={handleChange}
                        error={fromDateError}
                    />
                    <GenericDatePicker
                        title={'End date'}
                        type={"toDate"}
                        value={newContentValue.toDate || null}
                        isRequired={true}
                        onChange={handleChange}
                        error={toDateError}
                    />
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={tagOptions!}
                        onChange={(event, newValue) => setNewContentTags(newValue)}
                        getOptionLabel={(option) => option.tagName}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <div className='modal-field'>
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Tags"
                                    placeholder="Tags"
                                    fullWidth
                                />
                            </div>
                        )}
                    />
                    <PlacesAutocomplete updateLocation={handleChange} />
                    <FormControlLabel
                        control={<Checkbox checked={newContentValue.mapsEnabled}
                            onChange={() => handleChange(!newContentValue.mapsEnabled, "mapsEnabled")} />}
                        label="Enable map"
                    />
                    <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newContentValue.imageFilename} />
                    {missingLocationError && <Alert variant="danger">{"You must add a location or uncheck the maps enabled box"}</Alert>}
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard}/>
        </div>
    )
}
