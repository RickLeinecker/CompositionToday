import React, { useState } from 'react'
import GenericHandler from '../../Handlers/GenericHandler';
import GenericInputField from '../../Helper/Generics/GenericInputField';
import GenericModal from '../../Helper/Generics/GenericModal'
import { GenericHandlerType, UserProfile } from '../../ObjectInterface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenericFileUpload from '../../Helper/Generics/GenericFileUpload';
import { uploadFile } from '../../Helper/Utils/FileUploadUtil';
import useOpen from '../../Helper/CustomHooks/useOpen';
import GenericDiscardModal from '../../Helper/Generics/GenericDiscardModal';
import DefaultValues from '../../Styles/DefaultValues.module.scss'

type Props = {
    userProfile: UserProfile;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}


export default function EditProfileModal({ userProfile, notifyChange, editOpen, handleCloseEdit }: Props) {

    const [newContentValue, setNewContentValue] = useState<UserProfile>(userProfile)
    const [newProfilePic, setNewProfilePic] = useState<File | null>(null);

    const [displayNameError, setDisplayNameError] = useState(false);
    const [bioError, setBioError] = useState(false);
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
        setNewContentValue(userProfile);
    }

    const checkForErrors = (): boolean => {
        let error = false;

        error = checkIfEmpty(newContentValue.displayName, setDisplayNameError) || error;
        error = checkIfEmpty(newContentValue.bio, setBioError) || error;

        return (error)
    }

    function checkIfEmpty(value: string | undefined, setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if (!value) {
            setError(true);
            return true;
        } else {
            setError(false);
            return false;
        }
    }

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    async function confirmEditHandler() {

        let newProfilePicPath = userProfile.profilePicPath;
        if (newProfilePic !== null) {
            newProfilePicPath = await uploadFile(newProfilePic, newProfilePic?.name, "image", "uploadImage")
            if (newProfilePicPath === '') {
                toast.error('Failed to update profile pic');
                return;
            }
        }

        console.log("here is the new profile pic path: " + newProfilePicPath);
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID: newContentValue.userID,
                bio: newContentValue.bio,
                displayName: newContentValue.displayName,
                profilePicPath: newProfilePicPath,
            }),
            methodType: "PATCH",
            path: "updateUserProfile",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Profile failed to update');
                return;
            }

            notifyChange();
            toast.success('Profile updated');

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Profile failed to update');
        }

        handleCloseEdit();
    }

    const updateProfilePic = (file: File) => {
        setNewProfilePic(file)
    }

    return (
        <>
            <GenericModal
                show={editOpen}
                title={"Edit"}
                onHide={onHide}
                confirm={confirmEditHandler}
                actionText={"Edit"}
                checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Display Name" type="displayName" onChange={handleChange} value={newContentValue.displayName} isRequired={true} error={displayNameError} maxLength={parseInt(DefaultValues.maxLengthShort)}/>
                    <GenericInputField title="Biography" type="bio" onChange={handleChange} value={newContentValue.bio} isRequired={true} error={bioError} isMultiline={true} maxLength={parseInt(DefaultValues.maxLengthMedium)} />
                    <GenericFileUpload updateFile={updateProfilePic} type={"image/*"} name="profile picture" filename={""} />
                </>
            </GenericModal>
            <GenericDiscardModal notifyChange={notifyChange} discardOpen={discardOpen} handleCloseDiscard={handleCloseDiscard} handleConfirmDiscard={handleConfirmDiscard} />
        </>
    )
}
