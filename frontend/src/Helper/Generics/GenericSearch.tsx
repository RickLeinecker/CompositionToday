import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useState } from "react";
import { GenericHandlerType } from "../../ObjectInterface";
import GenericHandler from "../../Handlers/GenericHandler";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Link } from 'react-router-dom';

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
const GenericSearch = ({ placeHolder, apiEndpoint, genre = '', getPayload }: Props) => {
    const [options, setOptions] = useState<object[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    const searchComposers = async (query: string) => {
        let handlerObject: GenericHandlerType = {
            data: JSON.stringify({ searchQuery: query, genre: genre }),
            methodType: "POST",
            path: apiEndpoint,
        }

        try {
            setIsLoading(true);
            let answer = await GenericHandler(handlerObject);

            let tempArr = answer.result.map((x: any) => x.item);

            if (!answer.error)
                getPayload(tempArr);
            else if (answer.error === "No composers found" || answer.error === "Genre doesn't exist")
                getPayload([]);

            setOptions(tempArr);
            setIsLoading(false);
        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        searchComposers(search);
    }

    const handleSearch = useCallback((query: string) => {
        query = (query.length < 2) ? "" : query;
        setSearch(query);
        searchComposers(query);
    }, [])

    const handleInputChange = (text: string) => {
        setSearch(text);
    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <>
            <AsyncTypeahead
                id="Composer Search"
                style={{ display: !genre ? "inline-flex" : "inline" }}
                filterBy={filterBy}
                isLoading={isLoading}
                labelKey="firstName" // This uses composer's uid for unique key
                maxResults={10}
                minLength={0}
                open={!genre ? undefined : false}
                onSearch={handleSearch}
                options={options}
                onInputChange={handleInputChange}
                placeholder={placeHolder}
                renderMenuItemChildren={(option: any) => {
                    return (
                        <Link key={option.uid} to={`/profile/${option.username}`} style={{ color: "#000", textDecoration: 'none' }}>
                            <img
                                alt={option.lastName}
                                src={option.profilePicPath}
                                style={{
                                    height: '24px',
                                    marginRight: '10px',
                                    width: '24px',
                                }}
                            />
                            <span>{`${option.displayName}`}</span>
                        </Link>
                    );
                }}
                useCache={false}
            />
            {
                !genre &&
                <IconButton color="primary" component="span" onClick={handleSubmit}>
                    <SearchIcon />
                </IconButton>
            }
        </>
    );
}

export default GenericSearch;