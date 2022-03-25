import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { TagType } from '../../ObjectInterface';

type Props = {
    updateTags: (newValue: Array<TagType>) => void;
    defaultValue?: TagType[];
}

export default function GenericTagsPicker({defaultValue, updateTags}: Props) {

    const [tagOptions, setTagOptions] = useState<TagType[]>([]);

    // get tags
    useEffect(() => {
        fetchTags();
        async function fetchTags() {

            try {
                let answer = (await GenericGetHandler("getTags"));
                if (answer.error.length > 0) {
                    // setError(answer.error);
                    return;
                }

                // setError("");
                const result = await answer.result;
                setTagOptions(result);

                // setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
    }, []);
    
  return (
    <div>
        <Autocomplete
            multiple
            id="tags-standard"
            defaultValue={defaultValue || []}
            options={tagOptions}
            onChange={(event, newValue) => updateTags(newValue)}
            getOptionLabel={(option) => option.tagName}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <div className='modal-field'>
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Tags"
                        placeholder="Tags"
                        fullWidth
                    />
                </div>
            )}
        />
    </div>
  )
}
