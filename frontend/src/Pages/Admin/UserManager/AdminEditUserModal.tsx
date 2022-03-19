import React, { useState } from 'react'
import GenericInputField from '../../../Helper/Generics/GenericInputField';
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType, User } from '../../../ObjectInterface';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../../Helper/Generics/GenericDiscardModal';
import { toast } from 'react-toastify';

type Props = {
    user: User;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function AdminEditUserModal({ user, notifyChange, editOpen, handleCloseEdit }: Props) {
    const [newContentValue, setNewContentValue] = useState<User>(user)
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const { open: discardOpen, handleClick: handleOpenDiscard, handleClose: handleCloseDiscard } = useOpen();

    const onHide = (): void => {
        handleOpenDiscard()
    }

    const handleConfirmDiscard = (): void => {
        handleCloseEdit();
        handleCloseDiscard();
        clearFields();
    }

    const clearFields = (): void => {
        setNewContentValue(user);
    }

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue.email, setEmailError) || error;
        error = checkIfEmpty(newContentValue.username, setUsernameError) || error;

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

    // TODO
    async function confirmEditHandler() {
        console.log("confirm edit user", newContentValue);

        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                ...newContentValue,
                userID: newContentValue.id
            }),
            methodType: "PATCH",
            path: "updateUser",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to update user")
                console.log(answer.error);
                return;
            }

            toast.success("User fields updated")
            notifyChange();

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to update user")
        }

        handleCloseEdit();
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={onHide} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    {() => console.log(newContentValue)}
                    <GenericInputField title="Username" type="username" onChange={handleChange} value={newContentValue.username} isRequired={true} error={usernameError}/>
                    <GenericInputField title="Email" type="email" onChange={handleChange} value={newContentValue.email} isRequired={true} error={emailError}/>
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </div>
    )
}
