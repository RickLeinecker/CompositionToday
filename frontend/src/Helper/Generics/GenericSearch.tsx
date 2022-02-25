import { Form, FormControl } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { GenericHandlerType } from "../../ObjectInterface";
import GenericHandler from "../../Handlers/GenericHandler";

type Props = {
    placeHolder: string;
    apiEndpoint: string;
    genre?: string;
    getPayload: (value: any) => void;
}

/**
 * Search which makes calls to api
 * @param placeHolder string to show as a placeholder in search box.
 * @param apiEndpoint string of API endpoint to call.
 * @param genre optional string to narrow search to a genre.
 * @param getPayload optional () => void that allows to get playload.
 * @returns JSX Search box
 */
const GenericSearch = ({ placeHolder, apiEndpoint, genre='', getPayload }: Props) => {
    const [search, setSearch] = useState("");

    const handlerObject: GenericHandlerType = {
        data: JSON.stringify({ searchQuery: search, genre: genre }),
        methodType: "POST",
        path: apiEndpoint,
    }

    const searchComposers = async () => {
        try {
            let answer = await GenericHandler(handlerObject);

            if (!answer.error)
                getPayload(answer.result.map((x: any) => x.item));
            else if (answer.error === "No composers found" || answer.error === "Genre doesn't exist")
                getPayload([]);

        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    }

    const handleSearch = (e: any) => {
        e.preventDefault();
        console.log("SEARCHING:", search);
        searchComposers();
    }

    return (
        <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
                type="search"
                placeholder={placeHolder}
                className="me-2"
                aria-label="Search"
                onChange={e => setSearch(e.target.value)}
                value={search}
            />

            <IconButton color="primary" component="span" onClick={handleSearch}>
                <SearchIcon />
            </IconButton>
        </Form>
    );
}

export default GenericSearch;