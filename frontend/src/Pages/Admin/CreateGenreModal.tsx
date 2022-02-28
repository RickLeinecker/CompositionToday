import React, { useState } from 'react'
import { toast } from 'react-toastify';
import DefaultValues from '../../Styles/DefaultValues.module.scss'
import useOpen from '../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../Helper/Generics/GenericDiscardModal';
import GenericInputField from '../../Helper/Generics/GenericInputField';
import GenericModal from '../../Helper/Generics/GenericModal';


type Props = {
    notifyChange: () => void;
    createOpen: boolean;
    handleCloseCreate: () => void;
}

export default function CreateGenreModal({ notifyChange, createOpen, handleCloseCreate}: Props) {

    const [newModalName, setNewModalName] = useState("");

    const [tagNameError, setTagNameError] = useState(false);

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
        setNewModalName("")

        setTagNameError(false);
    }

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newModalName, setTagNameError) || error;

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
        // TODO: CALL CREATE GENRE HERE

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
                    <GenericInputField title="Genre Name" type="tagName" onChange={setNewModalName} value={newModalName} isRequired={true} error={tagNameError} maxLength={parseInt(DefaultValues.maxLengthShort)}/>
                </div>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard}/>
        </div>
    )
}

