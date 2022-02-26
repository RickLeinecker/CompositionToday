import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { ArticleType, GenericHandlerType, TagType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import GenericTagsPicker from '../../../Helper/Generics/GenericTagsPicker';
import DefaultValues from '../../../Styles/DefaultValues.module.scss'

type Props = {
    article: ArticleType;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditArticleModal({ article, notifyChange, editOpen, handleCloseEdit }: Props) {
    const [newContentValue, setNewContentValue] = useState<ArticleType>(article)
    const [newContentTags, setNewContentTags] = useState<Array<TagType>>();

    const [nameError, setNameError] = useState(false);
    const [textError, setTextError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    function updateTags(newValue: Array<TagType>){
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
        setNewContentValue(article);
    }

    const handleChange = (newValue: string | Date | null | boolean, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue.contentName, setNameError) || error;
        error = checkIfEmpty(newContentValue.contentText, setTextError) || error;

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

    async function confirmEditHandler() {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                contentID: newContentValue.id,
                uid: newContentValue.uid,
                contentType: "article",
                contentName: newContentValue.contentName,
                contentText: newContentValue.contentText,
            }),
            methodType: "PATCH",
            path: "updateContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update article")
                return;
            }

            toast.success("Article updated")
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update article")
        }

        handleCloseEdit();
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={onHide} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Title" type="contentName" onChange={handleChange} value={newContentValue.contentName} isRequired={true} error={nameError} maxLength={parseInt(DefaultValues.maxLengthShort)}/>
                    <GenericInputField title="Content" type="contentText" onChange={handleChange} value={newContentValue.contentText} isRequired={true} error={textError} isMultiline={true} maxLength={parseInt(DefaultValues.maxLengthMassive)}/>
                    <GenericTagsPicker updateTags={updateTags}/>
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
