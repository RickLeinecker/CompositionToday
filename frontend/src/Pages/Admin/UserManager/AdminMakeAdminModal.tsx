import React from 'react'
import GenericHandler from '../../../Handlers/GenericHandler';
import GenericModal from '../../../Helper/Generics/GenericModal';
import { GenericHandlerType } from '../../../ObjectInterface';

type Props = {
    userID: string[];
    notifyChange: () => void;
    adminOpen: boolean;
    handleCloseAdmin: () => void;
    type: string;
}

export default function AdminMakeAdminModal({ userID, notifyChange, adminOpen, handleCloseAdmin, type }: Props) {

    async function fetchData(user: string) {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({ uid: user }),
            methodType: "POST",
            path: "makeAdmin",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                return;
            }

            return await answer.result;
        } catch (e: any) {
            console.error("Could not make user:", user, "an admin.");
            console.error("Frontend Error: " + e);
        }

        return false;
    }

    async function confirmDeleteHandler() {
        console.log("make users admins")
        console.log(userID);
        userID.map((uid: string) => fetchData(uid));
        handleCloseAdmin();
    }

    return (
        <div>
            <GenericModal show={adminOpen} title={"Confirm"} onHide={handleCloseAdmin} confirm={confirmDeleteHandler} actionText={"Confirm"} >
                <>
                    <p>
                        Are you sure you want to make these users administrators?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
