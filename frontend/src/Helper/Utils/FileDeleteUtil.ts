import { toast } from "react-toastify";
import GenericHandler from "../../Handlers/GenericHandler";
import { GenericHandlerType } from "../../ObjectInterface";

export async function deleteFile(filepath: string){
    const handlerObject: GenericHandlerType = {
        data: JSON.stringify({
            filepath: filepath
        }),
        methodType: "DELETE",
        path: "deleteFile",
    }

    try {
        let answer = (await GenericHandler(handlerObject));
        if (answer.error.length > 0) {
            toast.error('Failed to delete file');
            return;
        }
        
        toast.success('File deleted');

    } catch (e: any) {
        console.error("Frontend Error: " + e);
        toast.error('Failed to delete file');
    }
}