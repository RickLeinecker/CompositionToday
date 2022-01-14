import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material';
import React, { useState } from 'react'

type Props = {
    title: string
    value: Date | null
    error?: boolean
    isRequired: boolean
    onChange: (newValue: Date | null) => void;
}

export default function GenericDatePicker({title, value, isRequired, error, onChange}: Props) {

    return (
        <div className='modal-field'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={title}
                    value={value}
                    onChange={e => onChange(e)}
                    renderInput={(params: JSX.IntrinsicAttributes) => <TextField {...params} fullWidth required={isRequired} error={error} helperText={error && "This is required"} />}
                />
            </LocalizationProvider>
        </div>
    )
}
