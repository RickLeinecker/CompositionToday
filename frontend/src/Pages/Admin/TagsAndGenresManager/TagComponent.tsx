import { Button } from '@mui/material';
import CreateTagModal from './CreateTagModal';
import GenericModal from '../../../Helper/Generics/GenericModal';
import DataGridMaker from '../DataGridMaker';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { TagType } from '../../../ObjectInterface';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import TagAndGenreColumns from '../columnStructure/TagAndGenreColumns';

const TagComponent = () => {
    const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
    const [responseTags, setResponseTags] = useState<Array<TagType>>([]);
    const [tagsChanged, setTagsChanged] = useState<boolean>(false);
    const { open: createTagOpen, handleClick: handleOpenCreateTag, handleClose: handleCloseCreateTag } = useOpen();
    const { open: removeOpen, handleClick: handleOpenRemove, handleClose: handleCloseRemove } = useOpen();

    const notifyChange = () => {
        setTagsChanged(value => !value);
    }

    useEffect(() => {
        async function fetchTags() {
            try {
                let answer: any = (await GenericGetHandler("getTags"));
                if (answer.error.length > 0) {
                    return;
                }

                const result = await answer.result;
                setResponseTags(result);
            } catch (e: any) {
                console.error("Frontend Error: " + e);
            }
        }

        fetchTags();
    }, [tagsChanged])

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

    return (
        <div>
            <p style={{ textDecoration: "underline" }}>
                Tags
            </p>
            <Button variant="contained" onClick={handleOpenCreateTag}>
                Create Tag
            </Button>
            <CreateTagModal notifyChange={notifyChange} createOpen={createTagOpen} handleCloseCreate={handleCloseCreateTag} />

            <DataGridMaker rows={responseTags} columns={TagAndGenreColumns} setSelected={setSelectedTags} CustomToolbar={TagsToolbar} />

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
    );
}

export default TagComponent;