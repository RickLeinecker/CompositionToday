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

export default function AdminMakePublisherModal({ userID, notifyChange, publishOpen, handleClosePublish, type}: Props) {

    async function makePublisher(uid: string) {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: uid
            }),
            methodType: "POST",
            path: "createPublisher",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Failed to make user a publisher");
                console.error(answer.error);
                return;
            }

            toast.success("User is now a publisher");
            notifyChange();
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Failed to make user a publisher");
        }
    }

    async function confirmHandler() {
        console.log("make users publishers")
        console.log(userID);
        userID.map((uid: string) => makePublisher(uid));

        handleClosePublish();
    }

    return (
        <div>
            <GenericModal show={publishOpen} title={"Confirm"} onHide={handleClosePublish} confirm={confirmHandler} actionText={"Confirm"} >
                <>
                    <p>
                        Are you sure you want to make these users publishers?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
