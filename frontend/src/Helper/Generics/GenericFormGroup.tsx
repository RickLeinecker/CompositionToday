import { Form } from "react-bootstrap";

interface FormGroupProps {
    label: string;
    styleForm?: string;
}

/**
 * GenericFormGroup acts as a helper to GenericForm. Returns an
 * individual input for the GenericForm to utilize.
 * @param label string that will label the input
 * @param styleForm [Optional] string that is a BootStrap className
 * @returns JSX for usable input group
 */
const GenericFormGroup = (props: FormGroupProps): JSX.Element => {
    const { label, styleForm = "w-50 mb-4" } = props;
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control className={styleForm} type="email" required />
        </Form.Group>
    );
}

export default GenericFormGroup;