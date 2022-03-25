import React from 'react'
import GenericModal from '../../../Helper/Generics/GenericModal';
import { GenericHandlerType, User } from '../../../ObjectInterface';
import GenericHandler from '../../../Handlers/GenericHandler';
import { toast } from 'react-toastify';

type Props = {
    users: User[];
    notifyChange: () => void;
    deleteOpen: boolean;
    handleCloseDelete: () => void;
    type: string;
}

export default function AdminDeleteUsersModal({ users, notifyChange, deleteOpen, handleCloseDelete, type }: Props) {

    async function fetchDelete(user: User) {
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({
                uid: user.uid
            }),
            methodType: "DELETE",
            path: "deleteUser",
        }

        try {
            let answer = (await GenericHandler(handlerObject));
            if (answer.error.length > 0) {
                toast.error("Unable to remove " + user.username);
                return;
            }

            notifyChange();
            toast.success("Removed " + user.username);
        } catch (e: any) {
            console.error("Frontend Error: " + e);
            toast.error("Unable to remove " + user.username);
        }
    }

    async function confirmDeleteHandler() {
        console.log("delete admins", users[0])

        users.map((user: User) => fetchDelete(user));
        handleCloseDelete();
    }

    return (
        <div>
            <GenericModal show={deleteOpen} title={"Delete"} onHide={handleCloseDelete} confirm={confirmDeleteHandler} actionText={"Delete"} >
                <>
                    <p>
                        Are you sure you want to PERMANENTLY delete these users?
                    </p>
                </>
            </GenericModal>
        </div>
    )
}
