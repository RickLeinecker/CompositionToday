import { Button } from '@mui/material';
import CreateTagModal from './CreateTagModal';
import DataGridMaker from '../DataGridMaker';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { TagType } from '../../../ObjectInterface';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import TagAndGenreColumns from '../columnStructure/TagAndGenreColumns';
import RemoveTagModal from './RemoveTagModal';

const TagComponent = () => {
    const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
    const [responseTags, setResponseTags] = useState<Array<TagType>>([]);
    const [tagsChanged, setTagsChanged] = useState<boolean>(false);
    const { open: createTagOpen, handleClick: handleOpenCreateTag, handleClose: handleCloseCreateTag } = useOpen();
    const { open: removeTagOpen, handleClick: handleOpenRemoveTag, handleClose: handleCloseRemoveTag } = useOpen();

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
                    <Button color="error" variant="contained" onClick={handleOpenRemoveTag} endIcon={<DeleteIcon />}>
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
            <RemoveTagModal selectedTags={selectedTags} notifyChange={notifyChange} removeOpen={removeTagOpen} handleCloseRemove={handleCloseRemoveTag}/>

            <DataGridMaker rows={responseTags} columns={TagAndGenreColumns} setSelected={setSelectedTags} CustomToolbar={TagsToolbar} />
        </div>
    );
}

export default TagComponent;