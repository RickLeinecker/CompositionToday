import React, { useEffect, useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'
import { uploadFile } from '../../../Helper/Utils/FileUploadUtil';
import GenericFileUpload from '../../../Helper/Generics/GenericFileUpload';
import { Alert, Button, Form } from 'react-bootstrap';
import { Divider } from '@mui/material';
import RelatedProjectsCard from '../../RelatedProjects/RelatedProjectsCard';


type Props = {
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function AdminCreateRelatedProjectModal({ notifyChange, createOpen, handleCloseCreate }: Props) {

    const [newContentUrl, setNewContentUrl] = useState("");
    const [newContentImageFilename, setNewContentImageFilename] = useState("");
    const [newContentProjectTitle, setNewContentProjectTitle] = useState("");
    const [newContentDescription, setNewContentDescription] = useState("");
    const [newContentBackgroundColor, setNewContentBackgroundColor] = useState("");
    const [newImage, setNewImage] = useState<Blob | null>(null);
    const [newImageTempPath, setNewImageTempPath] = useState("");
    const [viewPreview, setViewPreview] = useState(false);

    const [missingImageError, setMissingImageError] = useState(false);

    const [urlError, setUrlError] = useState(false);
    const [projectTitleError, setProjectTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    useEffect(() => {
        function getFilepath() {
            newImage && setNewImageTempPath(URL.createObjectURL(newImage))
        }
        getFilepath()
    }, [newImage])

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseCreate();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentUrl("");
        setNewContentImageFilename("");
        setNewContentProjectTitle("");
        setNewContentDescription("");
        setNewImage(null);
    }

    const updateImage = (newFile: File) => {
        setNewImage(newFile);
        setNewContentImageFilename(newFile.name)
    }

    const deleteImageFile = () => {
        setNewImage(null);
        setNewContentImageFilename("");

    }


    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentUrl, setUrlError) || error;
        error = checkIfEmpty(newContentProjectTitle, setProjectTitleError) || error;
        error = checkIfEmpty(newContentDescription, setDescriptionError) || error;
        error = checkIfEmpty(newImage, setMissingImageError) || error

        return (error)
    }

    function checkIfEmpty(value: string | Blob | null, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if (!value) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    }

    async function confirmCreateHandler() {

        let newContentImagePath = null;
        if (newImage !== null) {
            newContentImagePath = await uploadFile(newImage, newContentImageFilename, "related project image", "uploadImage")
            if (newContentImagePath === '') {
                toast.error('Failed to create related project');
                return;
            }
        }

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                url: newContentUrl,
                imageFilepath: newContentImagePath,
                imageFilename: newContentImageFilename,
                projectTitle: newContentProjectTitle,
                description: newContentDescription,
                backgroundColor: newContentBackgroundColor,
            }),
            methodType: "POST",
            path: "addProject",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create related project');
                return;
            }

            notifyChange();
            toast.success('Related project created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create related project');
        }

        clearFields()
        handleCloseCreate();
    }

    const handleColorChange = (event: any) => {
        setNewContentBackgroundColor(event.target.value);
    };

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
                <div>
                    {!viewPreview ?
                        <div>
                            <GenericInputField title="Title" type="title" onChange={setNewContentProjectTitle} value={newContentProjectTitle} isRequired={true} error={projectTitleError} maxLength={parseInt(DefaultValues.maxLengthShort)} />
                            <GenericInputField title="Description" type="description" onChange={setNewContentDescription} value={newContentDescription} isRequired={true} error={descriptionError} maxLength={parseInt(DefaultValues.maxLengthMedium)} />
                            <GenericInputField title="URL" type="url" onChange={setNewContentUrl} value={newContentUrl} isRequired={true} error={urlError} maxLength={parseInt(DefaultValues.maxLengthMedium)} />

                            <div style={{ display: "flex", alignItems: "center", margin: "3%" }}>
                                <p style={{margin: "0%"}}>Color picker:&nbsp;</p>
                                <Form.Control
                                    type="color"
                                    value={newContentBackgroundColor}
                                    onChange={handleColorChange}
                                    title="Choose your color"
                                />
                            </div>

                            <GenericFileUpload updateFile={updateImage} deleteFile={deleteImageFile} type={"image/*"} name="image" filename={newContentImageFilename} />
                            {missingImageError && <Alert variant="danger">{"You must upload an image"}</Alert>}
                            <Button onClick={() => setViewPreview(true)}>
                                View Preview
                            </Button>
                        </div>
                        :
                        <div>
                            <h3>
                                Preview Project
                            </h3>
                            <Divider sx={{ marginBottom: "10px" }} />
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <RelatedProjectsCard
                                    path={newContentUrl || "www.compositiontoday.net"}
                                    img={newImageTempPath || "http://www.compositiontoday.com/images/logo60c.gif"}
                                    altText={newContentDescription || "Missing description"}
                                    backgroundColor={newContentBackgroundColor}
                                    className="john-cage"
                                    title={newContentProjectTitle || "Missing title"}
                                    description={newContentDescription || "Missing description"}
                                />
                            </div>
                            <Button onClick={() => setViewPreview(false)}>
                                Back
                            </Button>
                        </div>
                    }
                </div>

            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}

