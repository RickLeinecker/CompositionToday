import React from 'react'
import { toast } from 'react-toastify';
import GenericModal from '../../../Helper/Generics/GenericModal';
import { GenericHandlerType } from '../../../ObjectInterface';
import GenericHandler from '../../../Handlers/GenericHandler';

type Props = {
    userID: string[];
    notifyChange: () => void;
    publishOpen: boolean;
    handleClosePublish: () => void;
    type: string;
}

export default function AdminRemovePublisherModal({ userID, notifyChange, publishOpen, handleClosePublish, type}: Props) {

    async function removePublisher(uid: string) {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: uid
            }),
            methodType: "POST",
            path: "removePublisher",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to remove as publisher");
                console.error(answer.error);
                return;
            }

            toast.success("User is not a anymore publisher");
			notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to remove as publisher");
        }
    }

    async function confirmDeleteHandler() {
        console.log("remove users publishers")
        console.log(userID);
        userID.map((uid: string) => removePublisher(uid));

        handleClosePublish();
    }

    return (
        <div>
            <GenericModal show={publishOpen} title={"Confirm"} onHide={handleClosePublish} confirm={confirmDeleteHandler} actionText={"Remove"} >
                <>
                    <p>
                        Are you sure you want to remove these users' status as publishers?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
