import React, { useState } from 'react'
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericHandler from '../../../Handlers/GenericHandler';
import { Alert } from 'react-bootstrap';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil'
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';

type Props = {
    userID: number;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateMusicModal({ userID, notifyChange, createOpen, handleCloseCreate }: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentSheetMusic, setNewContentSheetMusic] = useState<File | null>(null);
    const [newContentSheetMusicFilename, setNewContentSheetMusicFilename] = useState("");
    const [newContentAudio, setNewContentAudio] = useState<File | null>(null);
    const [newContentAudioFilename, setNewContentAudioFilename] = useState("");

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseCreate();
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

        setNameError(false);
        setTextError(false);
    }


    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);
    const [missingFileError, setMissingFileError] = useState(false);

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
        error = checkIfEmpty(newContentText, setTextError) || error;

        let isFileMissing = false;
        isFileMissing = !newContentAudio && !newContentSheetMusic;
        setMissingFileError(isFileMissing)
        error = isFileMissing || error;

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

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID,
                contentName: newContentName,
                contentText: newContentText,
                contentType: "music",
                description: newContentDescription,
                sheetMusicFilepath: newContentSheetMusicPath,
                sheetMusicFilename: newContentSheetMusicFilename,
                audioFilepath: newContentAudioPath,
                audioFilename: newContentAudioFilename,
                // timestamp: newContentTimestamp,
            }),
            methodType: "POST",
            path: "createContent",
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
                <>
                    <GenericInputField title="Song Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true} error={nameError} />
                    <GenericInputField title="Title" type="contentText" onChange={setNewContentText} value={newContentText} isRequired={true} error={textError} />
                    <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} isRequired={false} />
                    <GenericFileUpload updateFile={updateSheetMusic} deleteFile={deleteSheetMusicFile} type={".pdf"} name="sheet music" filename={newContentSheetMusicFilename} />
                    <GenericFileUpload updateFile={updateAudio} deleteFile={deleteAudioFile} type={".mp3"} name="audio" filename={newContentAudioFilename} />
                    {missingFileError && <Alert variant="danger">{"You must upload at least 1 file"}</Alert>}
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
