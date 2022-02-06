import { Button, Form } from "react-bootstrap";
import GenericFormGroup from "./GenericFormGroup";

const GenericForm = (): JSX.Element => {
    return (
        <Form>
            {/* <GenericFormGroup label="Email" /> */}
            <GenericFormGroup label="Password" />
            <GenericFormGroup label="" />

            <Button className="w-100" type="submit">
                Log in
            </Button>
        </Form>
    );
}

export default GenericForm;