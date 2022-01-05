import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import GenericHandler from '../../Handlers/GenericHandler';
import useOpen from '../../Helper/CustomHooks/useOpen';
import GenericInputField from '../../Helper/Generics/GenericInputField';
import GenericModal from '../../Helper/Generics/GenericModal'
import { GenericHandlerType, UserProfile } from '../../ObjectInterface';

type Props = {
    userProfile: UserProfile;
    isMyProfile: boolean;
    notifyChange: () => void;
}

export default function EditProfileModal({isMyProfile, userProfile, notifyChange}: Props) {
    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const[newContentValue, setNewContentValue] = useState<UserProfile>(userProfile)

    const handleChange = (newValue: string, type: string) => {
        setNewContentValue(prevState => ({
            ...prevState,
            [type]: newValue
        }));
    }

    async function confirmEditHandler(){
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                userID: newContentValue.userID,
                bio: newContentValue.bio,
                displayName: newContentValue.displayName,
            }),
            methodType: "PATCH",
            path: "updateUserProfile",
        }
        
        try{
            let answer = (await GenericHandler(handlerObject));
            if(answer.error.length > 0){
                // setError(answer.error);
                return;
            }
            
            notifyChange();
            // setError("");
            // setResponse(await answer.result);
            // setLoading(false);
            

        } catch(e: any){
            console.error("Frontend Error: " + e);
            // setError(DefaultValues.apiErrorMessage);
        }
    }

    return (
        <div>
            <GenericModal show={editOpen} title={"Edit"} onHide={handleCloseEdit} confirm={confirmEditHandler} actionText={"Edit"}>
                <>
                    <GenericInputField title="Biography" type="bio" onChange={handleChange} value={newContentValue.bio}/>
                    <GenericInputField title="Display Name" type="displayName" onChange={handleChange} value={newContentValue.displayName}/>
                </>
            </GenericModal>
            {isMyProfile && <Button onClick={handleOpenEdit}>Edit</Button>}
        </div>
    )
}
