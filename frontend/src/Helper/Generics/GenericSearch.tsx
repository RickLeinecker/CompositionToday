import { Form, FormControl } from "react-bootstrap";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useCallback, useState } from "react";
import { GenericHandlerType } from "../../ObjectInterface";
import GenericHandler from "../../Handlers/GenericHandler";
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const SEARCH_URI = 'https://api.github.com/search/users';

const AsyncExample = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<object[]>([]);

    const handleSearch = (query: string) => {
        setIsLoading(true);

        fetch(`${SEARCH_URI}?q=${query}+in:login&page=1&per_page=50`)
            .then((resp) => resp.json())
            .then(({ items }) => {
                const options = items.map((i: any) => ({
                    avatar_url: i.avatar_url,
                    id: i.id,
                    login: i.login,
                }));

                setOptions(options);
                setIsLoading(false);
            });
    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="login"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for a Composition Today User..."
            renderMenuItemChildren={(option: any, props) => (
                <>
                    <img
                        alt={option.login}
                        src={option.avatar_url}
                        style={{
                            height: '24px',
                            marginRight: '10px',
                            width: '24px',
                        }}
                    />
                    <span>{option.login}</span>
                </>
            )}
        />
    );
};

const AsyncComposerInput = () => {

}

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
        console.log(handlerObject.data)
        try {
            setIsLoading(true);
            let answer = await GenericHandler(handlerObject);

            let tempArr = answer.result.map((x: any) => x.item);

            if (!answer.error)
                getPayload(tempArr);
            else if (answer.error === "No composers found" || answer.error === "Genre doesn't exist")
                getPayload([]);

            console.log("tempArr", tempArr)
            setOptions(tempArr);
            setIsLoading(false);
        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("SEARCHING:", search);
        searchComposers(search);
    }

    const handleSearch = useCallback((query: string) => {
        query = (query.length < 2) ? "" : query;
        setSearch(query);
        console.log("QUERYING:", query);
        searchComposers(query);
    }, [])

    const handleInputChange = (text: string) => {
        setSearch(text);
    };
    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <div onSubmit={handleSubmit}>
            {/* <FormControl
                type="search"
                placeholder={placeHolder}
                className="me-2"
                aria-label="Search"
                onChange={e => setSearch(e.target.value)}
                value={search}
            /> */}
            {/* <AsyncExample /> */}
            <AsyncTypeahead
                id="Composer Search"
                // className="me-2"
                style={{ display: !genre ? "inline-flex" : "inline" }}
                filterBy={filterBy}
                isLoading={isLoading}
                labelKey="firstName" // This uses composer's uid for unique key
                maxResults={10}
                minLength={0}
                open={!genre ? undefined : false}
                onSearch={handleSearch}
                options={options}
                // onChange={(e: any) => setSearch(e.target.value)}
                onInputChange={handleInputChange}
                placeholder={placeHolder}
                renderMenuItemChildren={(option: any, props) => {
                    console.log(option);
                    return (
                        <div key={option.uid}>
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
                        </div>
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
        </div>
    );
}

export default GenericSearch;