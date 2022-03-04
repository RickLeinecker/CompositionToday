import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, RelatedProjectType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'
import { deleteFile } from '../../../Helper/Utils/FileDeleteUtil';
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil';
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import { Alert } from 'react-bootstrap';

type Props = {
    relatedProject: RelatedProjectType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function AdminEditRelatedProjectModal({ relatedProject, notifyChange, editOpen, handleCloseEdit }: Props) {
    const [newContentValue, setNewContentValue] = useState<RelatedProjectType>(relatedProject)

    const [urlError, setUrlError] = useState(false);
    const [projectTitleError, setProjectTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const [newContentImage, setNewContentImage] = useState<File | null>(null);
    const [imageFileToDelete, setImageFileToDelete] = useState<string>("");
    const [missingImageError, setMissingImageError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const updateImage = (file: File) => {
        setNewContentImage(file);
        handleChange(file.name, "imageFilename")
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

    const handleConfirmDiscard = (): void => {
        handleCloseEdit();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentValue(relatedProject);
    }

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue.url, setUrlError) || error;
        error = checkIfEmpty(newContentValue.projectTitle, setProjectTitleError) || error;
        error = checkIfEmpty(newContentValue.description, setDescriptionError) || error;
        error = checkIfEmpty(newContentImage, setMissingImageError) || error;

        return (error)
    }

    function checkIfEmpty(value: string | null | undefined | File, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if (!value) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    }

    async function confirmEditHandler() {
        let imageFileToDeleteTemp = imageFileToDelete;
        if (imageFileToDeleteTemp !== "" && imageFileToDeleteTemp !== null) {
            deleteFile(imageFileToDeleteTemp);
            setImageFileToDelete("");
        }

        let newContentImagePath = newContentValue.imageFilepath;
        if (newContentImage !== null) {
            newContentImagePath = await uploadFile(newContentImage, newContentValue.imageFilename, "event image", "uploadImage")
            if (newContentImagePath === '') {
                toast.error('Failed to update related project');
                return;
            }
        }
        
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                projectID: newContentValue.id,
                url: newContentValue.url,
                imageFilepath: newContentImagePath || "",
                imageFilename: newContentValue.imageFilename,
                projectTitle: newContentValue.projectTitle,
                description: newContentValue.description,
            }),
            methodType: "PATCH",
            path: "editProject",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update related project")
                return;
            }

            toast.success("Related project updated")
            notifyChange();

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update related project")
        }

        handleCloseEdit();
    }

    return (
        <div>
            <GenericModal
                show={editOpen}
                title={"Edit"}
                onHide={onHide}
                confirm={confirmEditHandler}
                actionText={"Edit"}
                checkForErrors={checkForErrors}>
                <>
                    <GenericInputField
                        title="Title"
                        type="projectTitle"
                        onChange={handleChange}
                        value={newContentValue.projectTitle}
                        isRequired={true}
                        error={projectTitleError}
                        maxLength={parseInt(DefaultValues.maxLengthShort)}
                    />
                    <GenericInputField
                        title="Description"
                        type="description"
                        onChange={handleChange}
                        value={newContentValue.description}
                        isRequired={true}
                        error={descriptionError}
                        maxLength={parseInt(DefaultValues.maxLengthMedium)}
                    />
                    <GenericInputField
                        title="URL"
                        type="url"
                        onChange={handleChange}
                        value={newContentValue.url}
                        isRequired={true}
                        error={urlError}
                        maxLength={parseInt(DefaultValues.maxLengthMedium)}
                    />
                    <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newContentValue.imageFilename} />
                    {missingImageError && <Alert variant="danger">{"You must upload an image"}</Alert>}
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
