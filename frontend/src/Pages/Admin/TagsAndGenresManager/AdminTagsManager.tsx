import { Button, Divider } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { TagType } from '../../../ObjectInterface';
import CreateGenreModal from './CreateGenreModal';
import CreateTagModal from './CreateTagModal';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from '../../../Helper/Generics/GenericModal';

export default function AdminTagsManager() {
    const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<TagType[]>([]);
    const [tagsChanged, setTagsChanged] = useState<boolean>(false);
    const [responseTags, setResponseTags] = useState<Array<TagType>>([]);
    const [responseGenres, setResponseGenres] = useState<Array<TagType>>([]);
    const [pageSizeTags, setPageSizeTags] = useState<number>(10);
    const [pageSizeGenres, setPageSizeGenres] = useState<number>(10);
    const { open: createTagOpen, handleClick: handleOpenCreateTag, handleClose: handleCloseCreateTag } = useOpen();
    const { open: createGenreOpen, handleClick: handleOpenCreateGenre, handleClose: handleCloseCreateGenre } = useOpen();
    const { open: removeOpen, handleClick: handleOpenRemove, handleClose: handleCloseRemove } = useOpen();

    const notifyChange = () => {
        setTagsChanged(value => !value);
    }

    useEffect(() => {
        async function fetchTags() {
            try {
                let answer = (await GenericGetHandler("getTags"));
                if (answer.error.length > 0) {
                    return;
                }

                const result = await answer.result;
                setResponseTags(result);
            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }
        }

        async function fetchGenres() {
            try {
                let answer = (await GenericGetHandler("getComposerGenres"));
                if (answer.error.length > 0) {
                    return;
                }

                const result = await answer.result;
                setResponseGenres(result);
            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }
        }
        fetchTags();
        fetchGenres();
    }, [tagsChanged])

    const columns = [
        { field: 'id', headerName: 'ID', type: 'number', width: 70 },
        { field: 'tagName', headerName: 'Tags', width: 200 },
    ]

    function TagsToolbar() {
        return (
            <GridToolbarContainer style={{ display: "flex", justifyContent: "space-around" }}>
                {
                    selectedTags.length > 0 &&
                    <Button color="error" variant="contained" onClick={handleOpenRemove} endIcon={<DeleteIcon />}>
                        Delete Tags
                    </Button>
                }
            </GridToolbarContainer>
        );
    }

    function GenresToolbar() {
        return (
            <GridToolbarContainer style={{ display: "flex", justifyContent: "space-around" }}>
                {
                    selectedGenres.length > 0 &&
                    <Button color="error" variant="contained" onClick={handleOpenRemove} endIcon={<DeleteIcon />}>
                        Remove Genres
                    </Button>
                }
            </GridToolbarContainer>
        );
    }

    return (
        <>
            <div>
                <p style={{ textDecoration: "underline" }}>
                    Tags
                </p>
                <Button variant="contained" onClick={handleOpenCreateTag}>
                    Create Tag
                </Button>
                <CreateTagModal notifyChange={notifyChange} createOpen={createTagOpen} handleCloseCreate={handleCloseCreateTag} />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                                display: "none"
                            }
                        }}
                        rows={responseTags}
                        columns={columns}
                        pageSize={pageSizeTags}
                        onPageSizeChange={(newPageSize) => setPageSizeTags(newPageSize)}
                        components={{
                            Toolbar: TagsToolbar,
                        }}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows = responseTags.filter((row) => selectedIDs.has(row.id));
                            setSelectedTags(selectedRows);
                        }}
                        rowsPerPageOptions={[10, 50, 100]}
                        checkboxSelection
                    />

                    <GenericModal
                        show={removeOpen}
                        title={"Delete Tags"}
                        onHide={handleCloseRemove}
                        confirm={() => { }}
                        actionText={"Save"}
                        checkForErrors={() => false}
                    >
                        <div>
                            <pre>
                                {JSON.stringify(selectedTags)}
                            </pre>
                        </div>
                    </GenericModal>
                </div>
            </div>
            <br></br>
            <Divider></Divider>
            <br></br>
            <div>
                <p style={{ textDecoration: "underline" }}>
                    Genres
                </p>
                <Button variant="contained" onClick={handleOpenCreateGenre}>
                    Create Genre
                </Button>
                <CreateGenreModal notifyChange={notifyChange} createOpen={createGenreOpen} handleCloseCreate={handleCloseCreateGenre} />

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                                display: "none"
                            }
                        }}
                        rows={responseGenres}
                        columns={columns}
                        pageSize={pageSizeGenres}
                        onPageSizeChange={(newPageSize) => setPageSizeGenres(newPageSize)}
                        components={{
                            Toolbar: GenresToolbar,
                        }}
                        onSelectionModelChange={(ids) => {
                            const selectedIDs = new Set(ids);
                            const selectedRows = responseTags.filter((row) => selectedIDs.has(row.id));
                            setSelectedGenres(selectedRows);
                        }}
                        rowsPerPageOptions={[10, 50, 100]}
                        checkboxSelection
                    />

                    <GenericModal
                        show={removeOpen}
                        title={"Remove Genre Status"}
                        onHide={handleCloseRemove}
                        confirm={() => { }}
                        actionText={"Save"}
                        checkForErrors={() => false}
                    >
                        <div>
                            <pre>
                                {JSON.stringify(selectedTags)}
                            </pre>
                        </div>
                    </GenericModal>
                </div>
            </div>
        </>
    )
}
