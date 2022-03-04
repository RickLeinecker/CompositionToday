import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import useOpen from '../../../Helper/CustomHooks/useOpen';
import { RelatedProjectType } from '../../../ObjectInterface';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import AdminCreateRelatedProjectModal from './AdminCreateRelatedProjectModal';
import AdminRelatedProjectsCard from './AdminRelatedProjectsCard';


export default function AdminRelatedProjectsManager() {
	const { open: addOpen, handleClick: handleOpenAdd, handleClose: handleCloseAdd } = useOpen();
	const [response, setResponse] = useState<Array<RelatedProjectType> | undefined>(undefined);
	const [hasChanged, setHasChanged] = useState(false);

	const handleAdd = () => {
		handleOpenAdd();
	}

	const notifyChange = () => { setHasChanged(value => !value); }

    // get projects
    useEffect(() => {
        fetchProjects();
        async function fetchProjects() {

            try {
                let answer = (await GenericGetHandler("getProjects"));
                if (answer.error.length > 0) {
                    // setError(answer.error);
                    return;
                }

                // setError("");
                const result = await answer.result;
                setResponse(result);

                // setLoading(false);


            } catch (e: any) {
                console.error("Frontend Error: " + e);
                // setError(DefaultValues.apiErrorMessage);
            }
        }
    }, [hasChanged]);

	return (
		<div>
			<AdminCreateRelatedProjectModal
				createOpen={addOpen}
				handleCloseCreate={handleCloseAdd}
				notifyChange={notifyChange}
			/>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Button color={"primary"} variant="contained" endIcon={<AddIcon />} onClick={handleAdd} >
					Add A New Project
				</Button>
			</div>
			<div>
				<Grid
					columns={13}
					container
					justifyContent="center"
					alignItems="center"
					className="grid-container"
					rowSpacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}
					columnSpacing={{ xs: 1 }}
					marginBottom="4rem"
				>
					{response?.map(project => 
						<AdminRelatedProjectsCard
							relatedProject={project}
							notifyChange={notifyChange}
						/>
					)}
				</Grid>
			</div>
		</div>
	)
}
