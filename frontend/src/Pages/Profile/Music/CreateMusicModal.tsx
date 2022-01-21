import React, { useState } from 'react'
import GenericHandlerFile from '../../../Handlers/GenericHanderFile';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericHandler from '../../../Handlers/GenericHandler';
import { Button } from '@mui/material';


type Props = {
    userID: number;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateMusicModal({ userID, notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentSheetMusic, setNewContentSheetMusic] = useState<File|null>(null);
    const [newContentSheetMusicFilename, setNewContentSheetMusicFilename] = useState("");

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentName, setNameError) || error;
        error = checkIfEmpty(newContentText, setTextError) || error;

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

    async function confirmCreateHandler() {

        let newContentSheetMusicPath = null;
        if(newContentSheetMusic !== null){
            newContentSheetMusicPath = await fileUploadHandler();
            if(newContentSheetMusicPath === ''){
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

        setNewContentName("");
        setNewContentText("");
        setNewContentDescription("");
        setNewContentSheetMusic(null);
        setNewContentSheetMusicFilename("");

        setNameError(false);
        setTextError(false);
    }

    const fileSelectedHandler = (event: any) => {
        setNewContentSheetMusic(event.target.files[0])
        setNewContentSheetMusicFilename(event.target.files[0].name)
    }

    const fileUploadHandler = async (): Promise<string> => {
        const fd = new FormData()
        fd.append("userFile", newContentSheetMusic || "", newContentSheetMusicFilename);
        

        const handlerObject: GenericHandlerType = {
            data: fd,
            methodType: "POST",
            path: "uploadSheetMusic",
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

    return (
        <GenericModal 
        show={createOpen} 
        title={"Create"} 
        onHide={handleCloseCreate} 
        confirm={confirmCreateHandler} 
        actionText={"Save"} 
        checkForErrors={checkForErrors}
        >
            <>
                <GenericInputField title="Song Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true} error={nameError}/>
                <GenericInputField title="Title" type="contentText" onChange={setNewContentText} value={newContentText} isRequired={true} error={textError}/>
                <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} isRequired={false}/>
                <Button
                    variant="contained"
                    component="label"
                    >
                    Upload File
                    <input type="file" accept=".pdf" onChange={fileSelectedHandler} hidden/>
                </Button>
                <p>{newContentSheetMusicFilename}</p>
                
            </>
        </GenericModal>
    )
}
