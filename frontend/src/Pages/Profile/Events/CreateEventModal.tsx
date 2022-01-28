import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { toast } from 'react-toastify';
import { toSqlDatetime } from '../../../Helper/Utils/DateUtils';
import GenericDatePicker from '../../../Helper/Generics/GenericDatePicker';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil';
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import { Autocomplete, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { Alert } from 'react-bootstrap';
import { GenericHandlerType, TagType } from '../../../ObjectInterface';
import PlacesAutocomplete from './PlacesAutocomplete';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';


type Props = {
    userID: number;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
    tagOptions: TagType[] | undefined;
}

export default function CreateEventModal({ userID, notifyChange, createOpen, handleCloseCreate, tagOptions}: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentFromDate, setNewContentFromDate] = useState<Date | null>(null);
    const [newContentToDate, setNewContentToDate] = useState<Date | null>(null);
    const [newContentImage, setNewContentImage] = useState<File|null>(null);
    const [newContentImageFilename, setNewContentImageFilename] = useState("");
    const [newContentTags, setNewContentTags] = useState<Array<TagType>>();
    const [newContentLocation, setNewContentLocation] = useState("");
    const [newContentMapsEnabled, setNewContentMapsEnabled] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [fromDateError, setFromDateError] = useState(false);
    const [toDateError, setToDateError] = useState(false);
    const [missingLocationError, setMissingLocationError] = useState(false);

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
        setNewContentName("");
        setNewContentDescription("");
        setNewContentToDate(null);
        setNewContentFromDate(null);
        setNewContentImage(null);
        setNewContentImageFilename("");
        setNewContentLocation("");
        setNewContentMapsEnabled(false);

        setNameError(false);
        setToDateError(false);
        setFromDateError(false);
    }

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentName, setNameError) || error;
        error = checkIfEmpty(newContentFromDate, setFromDateError) || error;
        error = checkIfEmpty(newContentToDate, setToDateError) || error;


        let isMissingLoc = false;
        isMissingLoc = newContentMapsEnabled && !newContentLocation
        setMissingLocationError(isMissingLoc);
        error = isMissingLoc || error;

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
        if(newContentImage !== null){
            newContentImagePath = await uploadFile(newContentImage, newContentImageFilename, "event image", "uploadImage")
            if(newContentImagePath === ''){
                toast.error('Failed to create music');
                return;
            }
        }

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID,
                contentName: newContentName,
                contentType: "event",
                description: newContentDescription,
                fromDate: toSqlDatetime(newContentFromDate),
                toDate: toSqlDatetime(newContentToDate),
                imageFilepath: newContentImagePath,
                imageFilename: newContentImageFilename,
                location: newContentLocation,
                mapsEnabled: newContentMapsEnabled,
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

        clearFields();
        handleCloseCreate();
    }

    return (
        <>
            <GenericModal 
            show={createOpen} 
            title={"Create"} 
            onHide={onHide} 
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
                    <PlacesAutocomplete updateLocation={updateLocation}/> 
                    <FormControlLabel 
                            control={<Checkbox checked={newContentMapsEnabled} 
                            onChange={() => setNewContentMapsEnabled(!newContentMapsEnabled)}/>} 
                            label="Enable map" 
                    />
                    <GenericFileUpload updateFile = {updateImage} deleteFile = {deleteImageFile} type = {"image/*"} name = "image" filename = {newContentImageFilename}/>
                    {missingLocationError && <Alert variant="danger">{"You must add a location or uncheck the maps enabled box"}</Alert>}
                </div>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard}/>
        </>
    )
}
