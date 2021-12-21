import React from 'react'
import { Button } from 'react-bootstrap';
import GenericHandler from '../../../Handlers/GenericHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericModal from '../../../Helper/Generics/GenericModal'
import { GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    contentID: number;
    isMyProfile: boolean;
}

export default function DeleteExperienceModal({contentID, isMyProfile}: Props) {

    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

    async function confirmDeleteHandler(){
        console.log("HERE WE DELETE");
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({contentID}),
            methodType: "DELETE",
            path: "deleteContent",
        }
                
        try{
            let answer = (await GenericHandler(handlerObject));
            if(answer.error.length > 0){
                // setError(answer.error);
                return;
            }
            
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
            {isMyProfile && 
                <>
                    <Button onClick={handleOpenDelete}>Delete</Button>
                </>
            }
            <GenericModal show={deleteOpen} title={"Delete"} onHide={handleCloseDelete} confirm={confirmDeleteHandler} actionText={"Delete"} >
                <>
                    <p>
                        Are you sure you want to delete this?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
