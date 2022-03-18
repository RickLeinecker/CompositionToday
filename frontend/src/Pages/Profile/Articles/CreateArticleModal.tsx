import React, { useState } from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, TagType } from '../../../ObjectInterface';
import { toast } from 'react-toastify';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import RichTextEditor from '../../../Helper/Editor/RichTextEditor';
import GenericTagsPicker from '../../../Helper/Generics/GenericTagsPicker';


type Props = {
    uid: string;
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateArticleModal({ uid, notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newContentName, setNewContentName] = useState("");
    const [newContentText, setNewContentText] = useState("");
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
        handleCloseCreate();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentName("")
        setNewContentText("")

        setNameError(false);
        setTextError(false);
    }

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
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: uid,
                contentName: newContentName,
                contentText: newContentText,
                contentType: "article",
                timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
            }),
            methodType: "POST",
            path: "createContent",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create article');
                return;
            }

            notifyChange();
            toast.success('Article created');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to create article');
        }

        clearFields()
        handleCloseCreate();
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
                <div>
                    <GenericInputField title="Title" type="contentName" onChange={setNewContentName} value={newContentName} isRequired={true} error={nameError}/>
                    <RichTextEditor handleChange={setNewContentText} content={undefined}/>
                    <GenericTagsPicker updateTags={updateTags}/>
                </div>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard}/>
        </div>
    )
}

