import { Button, Divider } from '@mui/material';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { TagType } from '../../../ObjectInterface';
import AdminTagsVirtualizedList from './AdminTagsVirtualizedList'
import CreateGenreModal from './CreateGenreModal';
import CreateTagModal from './CreateTagModal';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericModal from '../../../Helper/Generics/GenericModal';


export default function AdminTagsManager() {

    const [selected, setSelected] = useState<TagType[]>([]);
    const [tagsChanged, setTagsChanged] = useState<boolean>(false);
    const [responseTags, setResponseTags] = useState<Array<TagType>>([]);
    const [responseGenres, setResponseGenres] = useState<Array<TagType>>([]);
    const [pageSize, setPageSize] = useState<number>(10);
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
                    // setError(answer.error);
                    return;
                }

                // setError("");
                const result = await answer.result;
                setResponseTags(result);

                // setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
        async function fetchGenres() {
            try {
                let answer = (await GenericGetHandler("getComposerGenres"));
                if (answer.error.length > 0) {
                    // setError(answer.error);
                    return;
                }

                // setError("");
                const result = await answer.result;
                setResponseGenres(result);

                // setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
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
                    selected.length === 1 &&
                    <Button color="error" variant="contained" onClick={handleOpenRemove} endIcon={<DeleteIcon />}>
                        Remove Admin
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
                <Button onClick={handleOpenCreateTag}>
                    Create Tag
                </Button>
                <CreateTagModal notifyChange={notifyChange} createOpen={createTagOpen} handleCloseCreate={handleCloseCreateTag} />
                {/* <div style={{ width: "60%", margin: "0 auto" }}>
                    <AdminTagsVirtualizedList
                        bodyStyle={{ width: "100%", height: "30vh" }}
                        individualStyle={{ padding: "0.5% 1%" }}
                        items={responseTags}
                        notifyChange={notifyChange}
                        type={"tag"}
                    />
                </div> */}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
                                display: "none"
                            }
                        }}
                        rows={responseTags}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        components={{
                            Toolbar: TagsToolbar,
                        }}
                        // onSelectionModelChange={(ids) => {
                        //     const selectedIDs = new Set(ids);
                        //     const selectedRows = responseTags.filter((row) => selectedIDs.has(row.id));
                        //     setSelected(selectedRows);
                        // }}
                        rowsPerPageOptions={[10, 50, 100]}
                        checkboxSelection
                    />

                    <GenericModal
                        show={removeOpen}
                        title={"Demote Admin to User"}
                        onHide={handleCloseRemove}
                        confirm={() => { }}
                        actionText={"Save"}
                        checkForErrors={() => false}
                    >
                        <div>
                            <pre>
                                {JSON.stringify(selected)}
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
                <Button onClick={handleOpenCreateGenre}>
                    Create Genre
                </Button>
                <CreateGenreModal notifyChange={notifyChange} createOpen={createGenreOpen} handleCloseCreate={handleCloseCreateGenre} />
                <div style={{ width: "60%", margin: "0 auto" }}>
                    <AdminTagsVirtualizedList
                        bodyStyle={{ width: "100%", height: "30vh" }}
                        individualStyle={{ padding: "0.5% 1%" }}
                        items={responseGenres}
                        notifyChange={notifyChange}
                        type={"genre"}
                    />
                </div>

            </div>
        </>
    )
}
