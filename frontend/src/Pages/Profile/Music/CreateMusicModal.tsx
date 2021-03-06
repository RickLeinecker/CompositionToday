import React, { useState } from 'react'
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, TagType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericHandler from '../../../Handlers/GenericHandler';
import { Alert } from 'react-bootstrap';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil'
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import GenericTagsPicker from '../../../Helper/Generics/GenericTagsPicker';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'
import { Checkbox, FormControlLabel } from '@mui/material';

type Props = {
    uid: string;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateMusicModal({ uid, notifyChange, createOpen, handleCloseCreate }: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentSheetMusic, setNewContentSheetMusic] = useState<File | null>(null);
    const [newContentTags, setNewContentTags] = useState<Array<TagType> | null>(null);
    const [newContentSheetMusicFilename, setNewContentSheetMusicFilename] = useState("");
    const [newContentAudio, setNewContentAudio] = useState<File | null>(null);
    const [newContentAudioFilename, setNewContentAudioFilename] = useState("");
    const [newContentImage, setNewContentImage] = useState<File | null>(null);
    const [newContentImageFilename, setNewContentImageFilename] = useState("");
    const [newContentIsFeaturedSong, setNewContentIsFeaturedSong] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [missingFileError, setMissingFileError] = useState(false);
    const [missingAudioError, setMissingAudioError] = useState(false);

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
        setNewContentText("");
        setNewContentDescription("");
        setNewContentSheetMusic(null);
        setNewContentSheetMusicFilename("");
        setNewContentAudio(null);
        setNewContentAudioFilename("");
        setNewContentTags(null);
        setNewContentImage(null);
        setNewContentImageFilename("");

        setNameError(false);
    }

    const updateImage = (newFile: File) => {
        setNewContentImage(newFile);
        setNewContentImageFilename(newFile.name)
    }

    const deleteImageFile = () => {
        setNewContentImage(null);
        setNewContentImageFilename("");
    }

    const updateSheetMusic = (newFile: File) => {
        setNewContentSheetMusic(newFile);
        setNewContentSheetMusicFilename(newFile?.name)
    }

    const updateAudio = (newFile: File) => {
        setNewContentAudio(newFile);
        setNewContentAudioFilename(newFile.name)
    }

    const deleteAudioFile = () => {
        setNewContentAudio(null);
        setNewContentAudioFilename("");
    }

    const deleteSheetMusicFile = () => {
        setNewContentSheetMusic(null);
        setNewContentSheetMusicFilename("");
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentName, setNameError) || error;

        let isFileMissing = false;
        isFileMissing = !newContentAudio && !newContentSheetMusic;
        setMissingFileError(isFileMissing)
        error = isFileMissing || error;

        let isAudioMissing = newContentIsFeaturedSong && !newContentAudio;
        setMissingAudioError(isAudioMissing)
        error = isAudioMissing || error;

        return (error)
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

        let newContentSheetMusicPath = null;
        if (newContentSheetMusic !== null) {
            newContentSheetMusicPath = await uploadFile(newContentSheetMusic, newContentSheetMusicFilename, "sheet music", "uploadSheetMusic")
            if (newContentSheetMusicPath === '') {
                toast.error('Failed to create music');
                return;
            }
        }

        let newContentAudioPath = null;
        if (newContentAudio !== null) {
            newContentAudioPath = await uploadFile(newContentAudio, newContentAudioFilename, "audio", "uploadAudio")
            if (newContentAudioPath === '') {
                toast.error('Failed to create music');
                return;
            }
        }

        let newContentImagePath = null;
        if (newContentImage !== null) {
            //"uploadProfileImage" enforces 1x1 aspect ratio
            newContentImagePath = await uploadFile(newContentImage, newContentImageFilename, "image", "uploadProfileImage")
            if (newContentImagePath === '') {
                toast.error('Failed to create music');
                return;
            }
        }

        console.log("isFeatued: " + newContentIsFeaturedSong)

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: uid,
                contentName: newContentName,
                contentText: newContentText,
                contentType: "music",
                description: newContentDescription,
                imageFilepath: newContentImagePath,
                imageFilename: newContentImageFilename,
                sheetMusicFilepath: newContentSheetMusicPath,
                sheetMusicFilename: newContentSheetMusicFilename,
                audioFilepath: newContentAudioPath,
                audioFilename: newContentAudioFilename,
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
                tagArray: newContentTags || [],
                isFeaturedSong: newContentIsFeaturedSong,
            }),
            methodType: "POST",
            path: "createContentWithTags",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create music');
                return;
            }

            notifyChange();
            toast.success('Music created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create music');
        }

        clearFields();
        handleCloseCreate();

    }

    return (
        <div>
            <GenericModal
                show={createOpen}
                title={"Create Music"}
                onHide={onHide}
                confirm={confirmCreateHandler}
                actionText={"Save"}
                checkForErrors={checkForErrors}
            >
                <>
                    <GenericInputField
                        title="Song Title"
                        type="contentName"
                        onChange={setNewContentName}
                        value={newContentName}
                        isRequired={true}
                        error={nameError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                    />
                    <GenericInputField
                        title="Role/Instrument"
                        type="contentText"
                        onChange={setNewContentText}
                        value={newContentText}
                        isRequired={false}
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
                    <GenericTagsPicker updateTags={updateTags} />
                    <FormControlLabel style={{marginLeft: "1.7%"}} control={
                        <Checkbox
                            checked={newContentIsFeaturedSong}
                            onChange={() => setNewContentIsFeaturedSong(!newContentIsFeaturedSong)}
                        />
                    } label="Make this your featured song" />
                    {missingAudioError && <Alert variant="danger">{"You must upload audio to make it your featured music"}</Alert>}

                    <GenericFileUpload updateFile={updateSheetMusic} deleteFile={deleteSheetMusicFile} type={".pdf"} name="sheet music" filename={newContentSheetMusicFilename} />
                    <GenericFileUpload updateFile={updateAudio} deleteFile={deleteAudioFile} type={".mp3"} name="audio" filename={newContentAudioFilename} />
                    <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newContentImageFilename} />
                    {missingFileError && <Alert variant="danger">{"You must upload sheet music or audio"}</Alert>}
                    
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
