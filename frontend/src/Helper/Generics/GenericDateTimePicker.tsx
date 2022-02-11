import { DateTimePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material';

type Props = {
    title: string
    type: string
    value: Date | null
    error?: boolean
    isRequired: boolean
    onChange: (newValue: Date | null, type: string) => void;
    errorMessage?: string
}

export default function GenericDateTimePicker({title, value, isRequired, error, onChange, type, errorMessage}: Props) {

    return (
        <div className='modal-field'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    label={title}
                    value={value}
                    onChange={e => onChange(e, type)}
                    renderInput={(params: JSX.IntrinsicAttributes) => <TextField {...params} fullWidth required={isRequired} error={error} helperText={error && (errorMessage || "This is required")} />}
                />
            </LocalizationProvider>
        </div>
    )
}
