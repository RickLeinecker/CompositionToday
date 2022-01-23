import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, MusicType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil'
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';

type Props = {
    music: MusicType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditMusicModal({music, notifyChange, editOpen, handleCloseEdit}: Props) {
    const [newContentValue, setNewContentValue] = useState<MusicType>(music)
    const [newContentSheetMusic, setNewContentSheetMusic] = useState<File|null>(null);
    const [newContentAudio, setNewContentAudio] = useState<File|null>(null);

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;
        error = checkIfEmpty(newContentValue.contentText, setTextError) || error;

        return(error)
    }

    function checkIfEmpty(value: string | null | undefined, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if(!value){
            setError(true);
            return true;
        } else{
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
    
    async function confirmEditHandler() {
        let newContentSheetMusicPath = newContentValue.sheetMusicFilepath;
        if(newContentSheetMusic !== null){
            newContentSheetMusicPath = await uploadFile(newContentSheetMusic, newContentValue.sheetMusicFilename, "sheet music", "uploadSheetMusic");
            if(newContentSheetMusicPath === ''){
                toast.error('Failed to create music');
                return;
            }
        }

        let newContentAudioPath = newContentValue.audioFilepath;
        if(newContentAudio !== null){
            newContentAudioPath = await uploadFile(newContentAudio, newContentValue.audioFilename, "audio", "uploadAudio");
            if(newContentAudioPath === ''){
                toast.error('Failed to create music');
                return;
            }
        }

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                userID: newContentValue.userID,
                contentType: "music",
                contentName: newContentValue.contentName,
                contentText: newContentValue.contentText,
                description: newContentValue.description,
                sheetMusicFilepath: newContentSheetMusicPath,
                sheetMusicFilename: newContentValue.sheetMusicFilename,
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
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Music Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} isRequired={true} error={nameError}/>
                    <GenericInputField title="Title" type="contentText" onChange={handleChange} value={newContentValue.contentText} isRequired={true} error={textError}/>
                    <GenericInputField title="Description" type="description" onChange={handleChange} value={newContentValue.description} isRequired={false}/>
                    <GenericFileUpload updateFile = {updateSheetMusic} type = {".pdf"} name = "sheet music" filename = {newContentValue.sheetMusicFilename}></GenericFileUpload>
                    <GenericFileUpload updateFile = {updateAudio} type = {".mp3"} name = "audio" filename = {newContentValue.audioFilename}></GenericFileUpload>
                </>
            </GenericModal>
        </div>
    )
}
