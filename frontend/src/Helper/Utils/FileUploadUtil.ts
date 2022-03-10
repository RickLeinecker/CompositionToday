import { toast } from "react-toastify";
import { GenericHandlerType } from "../../ObjectInterface";
import GenericHandlerFile from '../../Handlers/GenericHanderFile'

export async function uploadFile(newFile: File | Blob, newFileName: string | undefined, type: string, path: string): Promise<string>{
    const fd = new FormData()
    fd.append("userFile", newFile || "", newFileName);
    

    const handlerObject: GenericHandlerType = {
        data: fd,
        methodType: "POST",
        path: path,
    }

    try {
        let answer = (await GenericHandlerFile(handlerObject));
        if (answer.error.length > 0) {
            toast.error('Failed to upload ' + type);
            return "";
        }

        return(answer.result[0].filepath);

    } catch (e: any) {
        console.error("Frontend Error: " + e);
        toast.error('Failed to upload ' + type);
        return "";
    }
}
