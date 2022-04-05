import React, { useState } from 'react'
import { toast } from 'react-toastify';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal';
import { GenericHandlerType } from '../../../ObjectInterface';
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil';
import { Alert } from 'react-bootstrap';


type Props = {
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateGenreModal({ notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newGenreName, setNewGenreName] = useState("");
    const [newImage, setNewImage] = useState<File | null>(null);
    const [newImageFilename, setNewImageFilename] = useState("");

    const [tagNameError, setGenreNameError] = useState(false);
    const [missingImageError, setMissingImageError] = useState(false);

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
        setNewGenreName("")
        setGenreNameError(false);
        setNewImage(null);
        setNewImageFilename("");
    }

    const updateImage = (newFile: File) => {
        setNewImage(newFile);
        setNewImageFilename(newFile.name)
    }

    const deleteImageFile = () => {
        setNewImage(null);
        setNewImageFilename("");
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newGenreName, setGenreNameError) || error;
        error = checkIfEmpty(newImage, setMissingImageError) || error

        return(error)
    }

    function checkIfEmpty(value: string | File | null, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if(!value){
            setError(true);
            return true;
        } else{
            setError(false);
            return false;
        }
    }

    async function confirmCreateHandler() {

        let newContentImagePath = null;
        if (newImage !== null) {
            newContentImagePath = await uploadFile(newImage, newImageFilename, "genre image", "uploadProfileImage")
            if (newContentImagePath === '') {
                toast.error('Failed to create genre');
                return;
            }
        }

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                genre: newGenreName,
                imageFilepath: newContentImagePath,
                // imageFilename: newImageFilename,
            }),
            methodType: "POST",
            path: "addGenre",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error(answer.error);
                return;
            }

            notifyChange();
            toast.success('Genre created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create genre');
        }

        clearFields()
        handleCloseCreate();
    }

    return (
        <div>
            <GenericModal 
                show={createOpen} 
                title={"Create Genre"} 
                onHide={onHide} 
                confirm={confirmCreateHandler} 
                actionText={"Save"} 
                checkForErrors={checkForErrors}
            >
                <div>
                    <GenericInputField title="Genre Name" type="tagName" onChange={setNewGenreName} value={newGenreName} isRequired={true} error={tagNameError} maxLength={parseInt(DefaultValues.maxLengthShort)}/>
                    <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newImageFilename} />
                    {missingImageError && <Alert variant="danger">{"You must upload an image"}</Alert>}
                </div>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard}/>
        </div>
    )
}

