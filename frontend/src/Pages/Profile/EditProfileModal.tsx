import React, { useState } from 'react'
import GenericHandler from '../../Handlers/GenericHandler';
import GenericInputField from '../../Helper/Generics/GenericInputField';
import GenericModal from '../../Helper/Generics/GenericModal'
import { GenericHandlerType, UserProfile } from '../../ObjectInterface';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GenericHandlerFile from '../../Handlers/GenericHanderFile';
import { Button } from '@mui/material';

type Props = {
    userProfile: UserProfile;
    notifyChange: () => void;
    editOpen: boolean;
    handleCloseEdit: () => void;
}

export default function EditProfileModal({userProfile, notifyChange, editOpen, handleCloseEdit}: Props) {
    const[newContentValue, setNewContentValue] = useState<UserProfile>(userProfile)
    const[newProfilePic, setNewProfilePic] = useState<File | null>(null);

    const [displayNameError, setDisplayNameError] = useState(false);
    const [bioError, setBioError] = useState(false);

    const checkForErrors = (): boolean => {
        let error = false;
        
        error = checkIfEmpty(newContentValue.displayName, setDisplayNameError) || error;
        error = checkIfEmpty(newContentValue.bio, setBioError) || error;

        return(error)
    }

    function checkIfEmpty(value: string | undefined , setError: React.Dispatch<React.SetStateAction<boolean>>): boolean {
        if(!value){
            setError(true);
            return true;
        } else{
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

    async function confirmEditHandler(){

        let newProfilePicPath = userProfile.profilePicPath;
        if(newProfilePic !== null){
            newProfilePicPath = await fileUploadHandler();
            if(newProfilePicPath === ''){
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
        
        try{
            let answer = (await GenericHandler(handlerObject));
            if(answer.error.length > 0){
                toast.error('Profile failed to update');
                return;
            }
            
            notifyChange();
            toast.success('Profile updated');

        } catch(e: any){
            console.error("Frontend Error: " + e);
            toast.error('Profile failed to update');
        }
    }

    const fileSelectedHandler = (event: any) => {
        setNewProfilePic(event.target.files[0])
    }

    const fileUploadHandler = async (): Promise<string> => {
        const fd = new FormData()
        fd.append("userFile", newProfilePic || "", newProfilePic?.name);
        

        const handlerObject: GenericHandlerType = {
            data: fd,
            methodType: "POST",
            path: "uploadImage",
        }

        try {
            let answer = (await GenericHandlerFile(handlerObject));
            if (answer.error.length > 0) {
                toast.error('Failed to upload picture');
                console.log("here is error: " + answer.error);
                return "";
            }

            notifyChange();
            return(answer.result[0].filepath);

        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error('Failed to upload picture');
            return "";
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"} checkForErrors={checkForErrors}>
                <>
                    <GenericInputField title="Display Name" type="displayName" onChange={handleChange} value={newContentValue.displayName} isRequired={true} error={displayNameError}/>
                    <GenericInputField title="Biography" type="bio" onChange={handleChange} value={newContentValue.bio} isRequired={true} error={bioError}/>
                    <Button
                        variant="contained"
                        component="label"
                        >
                        Change profile picture
                        <input type="file" accept="image/*" onChange={fileSelectedHandler} hidden/>
                    </Button>
                </>
            </GenericModal>
        </div>
    )
}
