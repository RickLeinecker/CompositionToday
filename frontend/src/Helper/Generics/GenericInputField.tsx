import { TextField } from '@mui/material'
import React from 'react'

type Props = {
    title: string
    type: string
    value: string | undefined
    error?: boolean
    isRequired: boolean
    isMultiline?: boolean
    onChange: (newValue: string, type: string) => void;
}

export default function GenericInputField({title, value, onChange, type, isRequired, error, isMultiline}: Props) {
    return (
        <div className='modal-field'>
            <TextField
                label={title}
                variant="outlined"
                fullWidth
                required={isRequired}
                onChange={e => onChange(e.target.value, type)}
                value={value}
                error={error}
                helperText={(error && isRequired && !value) && "This is required"}
                multiline={isMultiline}
            />
        </div>
    )
}
