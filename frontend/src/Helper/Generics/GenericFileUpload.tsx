import { Button } from '@mui/material';

type Props = {
    updateFile: (file: File) => void;
    type: string;
    name: string;
    filename: string | undefined; 
}

export default function GenericFileUpload({updateFile, type, name, filename}: Props) {

    const fileSelectedHandler = (event: any) => {
        updateFile(event.target.files[0]);
    }

    return(
        <div>
            <Button variant="contained" component="label">
                Upload {name}
                <input type="file" accept={type} onChange={fileSelectedHandler} hidden/>
            </Button>
            {filename}
        </div>
    )
}
