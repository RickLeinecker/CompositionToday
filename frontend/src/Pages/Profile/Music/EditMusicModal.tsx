import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, MusicType, TagType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil'
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { deleteFile } from '../../../Helper/Utils/FileDeleteUtil';
import GenericTagsPicker from '../../../Helper/Generics/GenericTagsPicker';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'
import { Alert } from 'react-bootstrap';

type Props = {
    music: MusicType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditMusicModal({ music, notifyChange, editOpen, handleCloseEdit }: Props) {
    const [newContentValue, setNewContentValue] = useState<MusicType>(music)
    const [newContentSheetMusic, setNewContentSheetMusic] = useState<File | null>(null);
    const [newContentAudio, setNewContentAudio] = useState<File | null>(null);
    const [newContentTags, setNewContentTags] = useState<Array<TagType>>(JSON.parse(newContentValue.tagArray));
    const [audioFileToDelete, setAudioFileToDelete] = useState<string>("");
    const [sheetMusicFileToDelete, setSheetMusicFileToDelete] = useState<string>("");
    const [imageFileToDelete, setImageFileToDelete] = useState<string>("");
    const [newContentImage, setNewContentImage] = useState<File | null>(null);


    const [missingFileError, setMissingFileError] = useState(false);
    const [nameError, setNameError] = useState(false);

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
        setNewContentValue(music);
        setNewContentTags(JSON.parse(newContentValue.tagArray));
    }

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;

        let isFileMissing = false;
        isFileMissing = !newContentValue.audioFilename && !newContentValue.sheetMusicFilename;
        setMissingFileError(isFileMissing)
        error = isFileMissing || error;

        return (error)
    }

    function checkIfEmpty(value: string | null | undefined, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if (!value) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    }

    const updateSheetMusic = (file: File) => {
        setNewContentSheetMusic(file)
        handleChange(file.name, "sheetMusicFilename")
    }

    const updateAudio = (file: File) => {
        setNewContentAudio(file)
        handleChange(file.name, "audioFilename")
    }

    const updateImage = (file: File) => {
        setNewContentImage(file);
        handleChange(file.name, "imageFilename")
    }

    const deleteSheetMusic = () => {
        let fileToDelete = newContentValue.sheetMusicFilepath
        if (fileToDelete !== undefined) {
            setSheetMusicFileToDelete(fileToDelete)
            handleChange("", "sheetMusicFilepath")
        }

        handleChange("", "sheetMusicFilename");
        setNewContentSheetMusic(null)
    }

    const deleteAudio = () => {
        let fileToDelete = newContentValue.audioFilepath
        if (fileToDelete !== undefined) {
            setAudioFileToDelete(fileToDelete)
            handleChange("", "audioFilepath")
        }

        handleChange("", "audioFilename");
        setNewContentAudio(null);
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

    async function confirmEditHandler() {

        let audioFileToDeleteTemp = audioFileToDelete;
        if (audioFileToDeleteTemp !== "" && audioFileToDeleteTemp !== null) {
            deleteFile(audioFileToDeleteTemp);
            setAudioFileToDelete("");
        }

        let sheetMusicFileToDeleteTemp = sheetMusicFileToDelete;
        if (sheetMusicFileToDeleteTemp !== "" && sheetMusicFileToDeleteTemp !== null) {
            deleteFile(sheetMusicFileToDeleteTemp);
            setSheetMusicFileToDelete("");
        }

        let imageFileToDeleteTemp = imageFileToDelete;
        if (imageFileToDeleteTemp !== "" && imageFileToDeleteTemp !== null) {
            deleteFile(imageFileToDeleteTemp);
            setImageFileToDelete("");
        }

        let newContentSheetMusicPath = newContentValue.sheetMusicFilepath;
        if (newContentSheetMusic !== null) {
            newContentSheetMusicPath = await uploadFile(newContentSheetMusic, newContentValue.sheetMusicFilename, "sheet music", "uploadSheetMusic");
            if (newContentSheetMusicPath === '') {
                toast.error('Failed to create music');
                return;
            }
        }

        let newContentAudioPath = newContentValue.audioFilepath;
        if (newContentAudio !== null) {
            newContentAudioPath = await uploadFile(newContentAudio, newContentValue.audioFilename, "audio", "uploadAudio");
            if (newContentAudioPath === '') {
                toast.error('Failed to create music');
                return;
            }
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
                contentType: "music",
                contentName: newContentValue.contentName,
                contentText: newContentValue.contentText,
                description: newContentValue.description,
                imageFilepath: newContentImagePath || "",
                imageFilename: newContentValue.imageFilename,
                sheetMusicFilepath: newContentSheetMusicPath,
                sheetMusicFilename: newContentValue.sheetMusicFilename,
                audioFilepath: newContentAudioPath,
                audioFilename: newContentValue.audioFilename,
                tagArray: newContentTags,
            }),
            methodType: "PATCH",
            path: "updateContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update music")
                return;
            }

            toast.success("Music updated")
            notifyChange();

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update music")
        }

        handleCloseEdit();
    }

    return (
        <div>
            <GenericModal
                show={editOpen}
                title={"Edit Music"}
                onHide={onHide}
                confirm={confirmEditHandler}
                actionText={"Update"}
                checkForErrors={checkForErrors}>
                <>
                    <GenericInputField
                        title="Music Title"
                        type="contentName"
                        onChange={handleChange}
                        value={newContentValue.contentName}
                        isRequired={true}
                        error={nameError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                    />
                    <GenericInputField
                        title="Role/Instrument"
                        type="contentText"
                        onChange={handleChange}
                        value={newContentValue.contentText}
                        isRequired={false}
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
                    <GenericTagsPicker updateTags={updateTags} defaultValue={newContentTags} />
                    <GenericFileUpload updateFile={updateSheetMusic} deleteFile={deleteSheetMusic} type={".pdf"} name="sheet music" filename={newContentValue.sheetMusicFilename}></GenericFileUpload>
                    <GenericFileUpload updateFile={updateAudio} deleteFile={deleteAudio} type={".mp3"} name="audio" filename={newContentValue.audioFilename}></GenericFileUpload>
                    <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newContentValue.imageFilename} />
                    {missingFileError && <Alert variant="danger">{"You must upload at least 1 file"}</Alert>}
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
