import React, { useState } from 'react'
import { toast } from 'react-toastify';
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import useOpen from '../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../Helper/Generics/GenericDiscardModal';
import GenericInputField from '../../Helper/Generics/GenericInputField';
import GenericModal from '../../Helper/Generics/GenericModal';
import { GenericHandlerType } from '../../ObjectInterface';
import GenericHandler from '../../Handlers/GenericHandler';


type Props = {
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateGenreModal({ notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newGenreName, setNewGenreName] = useState("");

    const [tagNameError, setGenreNameError] = useState(false);

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
    }

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newGenreName, setGenreNameError) || error;

        return(error)
    }

    function checkIfEmpty(value: string, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
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
                tagName: newGenreName,
            }),
            methodType: "POST",
            path: "createGenre",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to create genre');
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
                title={"Create"} 
                onHide={onHide} 
                confirm={confirmCreateHandler} 
                actionText={"Save"} 
                checkForErrors={checkForErrors}
            >
                <div>
                    <GenericInputField title="Genre Name" type="tagName" onChange={setNewGenreName} value={newGenreName} isRequired={true} error={tagNameError} maxLength={parseInt(DefaultValues.maxLengthShort)}/>
                </div>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard}/>
        </div>
    )
}

