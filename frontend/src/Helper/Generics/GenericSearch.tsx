import { Form, FormControl } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const GenericSearch = () => {
    return (
        <Form className="d-flex">
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />

            <IconButton color="primary" aria-label="upload picture" component="span">
                <SearchIcon />
            </IconButton>
        </Form>
    );
}

export default GenericSearch;