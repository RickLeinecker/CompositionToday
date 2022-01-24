import { Button, Chip } from '@mui/material';

type Props = {
    updateFile: (file: File) => void;
    deleteFile?: () => void;
    type: string;
    name: string;
    filename: string | undefined; 
}

export default function GenericFileUpload({updateFile, type, name, filename, deleteFile}: Props) {

    const fileSelectedHandler = (event: any) => {
        updateFile(event.target.files[0]);
    }

    return(
        <div>
            <Button variant="contained" component="label">
                Upload {name}
                <input type="file" accept={type} onChange={fileSelectedHandler} hidden/>
            </Button>
            {filename && <Chip label={filename} onDelete={deleteFile}/>}
        </div>
    )
}
