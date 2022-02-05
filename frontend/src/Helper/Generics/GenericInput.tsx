import { FormControl, InputGroup } from "react-bootstrap";

const GenericInput = (): JSX.Element => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">

                    <InputGroup className="my-4">
                        <InputGroup.Text>Default</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </div>
                <div className="col">

                    <InputGroup className="my-4">
                        <InputGroup.Text>Default</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </div>
            </div>
            <div className="row">
                <div className="col">

                    <InputGroup className="mr-5">
                        <InputGroup.Text>Default</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </div>
                <div className="col">

                    <InputGroup className="mr-5">
                        <InputGroup.Text>Default</InputGroup.Text>
                        <FormControl
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                        />
                    </InputGroup>
                </div>
            </div>
        </div>
    );
}

export default GenericInput;