import { Button, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react'
import useOpen from '../../../Helper/CustomHooks/useOpen';
import RelatedProjectsCard from '../../RelatedProjects/RelatedProjectsCard';
import { RelatedProjectType } from '../../../ObjectInterface';
import GenericGetHandler from '../../../Handlers/GenericGetHandler';
import AdminCreateRelatedProjectModal from './AdminCreateRelatedProjectModal';


export default function AdminRelatedProjectsManager() {
	const { open: addOpen, handleClick: handleOpenAdd, handleClose: handleCloseAdd } = useOpen();
	const [response, setResponse] = useState<Array<RelatedProjectType> | undefined>(undefined);
	const [hasChanged, setHasChanged] = useState(false);

	const handleAdd = () => {
		handleOpenAdd();
	}

	const notifyChange = () => { setHasChanged(value => !value); }

    // get tags
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
			{/* <GenericModal
				show={addOpen}
				title={"Add A New Project"}
				onHide={handleCloseAdd}
				confirm={() => { }}
				actionText={"Save"}
				checkForErrors={() => false}
			>
				<div>
					<h3>
						Preview Project
					</h3>
					<Divider sx={{ marginBottom: "10px" }} />
					<div style={{ display: "flex", justifyContent: "space-around" }}>
						<RelatedProjectsCard
							path="https://johncagetribute.org/"
							img="resized_john_cage.jpg"
							altText="John Cage Tribute Project"
							className="john-cage"
							title="John Cage"
							description="This is the John Cage Tribute Project."
						/>
					</div>
				</div>
			</GenericModal> */}
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
						<RelatedProjectsCard
							path={project.url}
							img={project.imageFilepath}
							altText={project.description}
							className="john-cage"
							title={project.projectTitle}
							description={project.description}
						/>
					)}
				</Grid>
			</div>
		</div>
	)
}
