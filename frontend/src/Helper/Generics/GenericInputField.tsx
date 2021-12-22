import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

type Props = {
    title: string
    type: string
    value: string | undefined
    onChange: (newValue: string, type: string) => void;
}

export default function GenericInputField({title, value, onChange, type}: Props) {
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">{title}</InputGroup.Text>
                <FormControl
                aria-label="Default"
                value={value}
                onChange={e => onChange(e.target.value, type)}
                aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
        </div>
    )
}
