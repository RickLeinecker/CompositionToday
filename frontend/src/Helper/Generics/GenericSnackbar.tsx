import { Alert, Snackbar } from '@mui/material'
import React from 'react'

type Props = {
    resetToast: () => void;
    toastType: string;
}

export default function GenericSnackbar({toastType, resetToast}: Props) {

    const [open, setOpen] = React.useState(true);
    
  
    const handleClose = () => {
      setOpen(false);
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </div>
    )
}
