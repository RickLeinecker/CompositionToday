import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericHandlerFile from '../../../Handlers/GenericHanderFile';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, MusicType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

type Props = {
    music: MusicType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditMusicModal({music, notifyChange, editOpen, handleCloseEdit}: Props) {
    const [newContentValue, setNewContentValue] = useState<MusicType>(music)
    const [newContentSheetMusic, setNewContentSheetMusic] = useState<File|null>(null);

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);

    const handleChange = (newValue: string, type: string) => {
        console.log(newContentValue.sheetMusicFilename)
        console.table(newContentValue)
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

    const fileSelectedHandler = (event: any) => {
        setNewContentSheetMusic(event.target.files[0])
        handleChange(event.target.files[0].name, "sheetMusicFilename")
    }

    const fileUploadHandler = async (): Promise<string> => {
        const fd = new FormData()
        fd.append("userFile", newContentSheetMusic || "", newContentValue.sheetMusicFilename);
        

        const handlerObject: GenericHandlerType = {
            data: fd,
            methodType: "POST",
            path: "upload",
        }

        try {
            let answer = (await GenericHandlerFile(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to upload file');
                return "";
            }

            notifyChange();
            return(answer.result[0].filepath);

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to upload file');
            return "";
        }
    }
    
    async function confirmEditHandler() {
        let newContentSheetMusicPath = newContentValue.audioFilepath;
        if(newContentSheetMusic !== null){
            newContentSheetMusicPath = await fileUploadHandler();
            if(newContentSheetMusicPath === ''){
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
                    <Button
                        variant="contained"
                        component="label"
                        >
                        Upload File
                        <input type="file" accept=".pdf" onChange={fileSelectedHandler} hidden/>
                    </Button>
                    <p>{newContentValue.sheetMusicFilename}</p>
                    {/* <a href={newContentValue.sheetMusicFilepath}>{newContentValue.sheetMusicFilename}</a> */}
                </>
            </GenericModal>
        </div>
    )
}
