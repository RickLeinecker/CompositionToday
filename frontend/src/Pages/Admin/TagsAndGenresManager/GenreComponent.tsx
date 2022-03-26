import { Button } from '@mui/material';
import GenericModal from '../../../Helper/Generics/GenericModal';
import CreateGenreModal from './CreateGenreModal';
import DataGridMaker from '../DataGridMaker';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { TagType } from '../../../ObjectInterface';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import TagAndGenreColumns from '../columnStructure/TagAndGenreColumns';
import RemoveGenreModal from './RemoveGenreModal';

const GenreComponent = () => {
    const [selectedGenres, setSelectedGenres] = useState<TagType[]>([]);
    const [responseGenres, setResponseGenres] = useState<Array<TagType>>([]);
    const [genresChanged, setGenresChanged] = useState<boolean>(false);
    const { open: createGenreOpen, handleClick: handleOpenCreateGenre, handleClose: handleCloseCreateGenre } = useOpen();
    const { open: removeGenreOpen, handleClick: handleOpenRemoveGenre, handleClose: handleCloseRemoveGenre } = useOpen();

    const notifyChange = () => {
        setGenresChanged(value => !value);
    }

    useEffect(() => {
        async function fetchGenres() {
            try {
                let answer: any = (await GenericGetHandler("getComposerGenres"));
                if (answer.error.length > 0) {
                    return;
                }

                const result = await answer.result;
                setResponseGenres(result);
            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }
        }

        fetchGenres();
    }, [genresChanged])

    function GenresToolbar() {
        return (
            <GridToolbarContainer style={{ display: "flex", justifyContent: "space-around" }}>
                {
                    selectedGenres.length > 0 &&
                    <Button color="error" variant="contained" onClick={handleOpenRemoveGenre} endIcon={<DeleteIcon />}>
                        Remove Genres
                    </Button>
                }
            </GridToolbarContainer>
        );
    }

    return (
        <div>
            <p style={{ textDecoration: "underline" }}>
                Genres
            </p>
            <Button variant="contained" onClick={handleOpenCreateGenre}>
                Create Genre
            </Button>
            <CreateGenreModal notifyChange={notifyChange} createOpen={createGenreOpen} handleCloseCreate={handleCloseCreateGenre} />
            <RemoveGenreModal selectedGenres={selectedGenres} notifyChange={notifyChange} removeOpen={removeGenreOpen} handleCloseRemove={handleCloseRemoveGenre}/>

            <DataGridMaker rows={responseGenres} columns={TagAndGenreColumns} setSelected={setSelectedGenres} CustomToolbar={GenresToolbar} />
        </div>
    );
}

export default GenreComponent;