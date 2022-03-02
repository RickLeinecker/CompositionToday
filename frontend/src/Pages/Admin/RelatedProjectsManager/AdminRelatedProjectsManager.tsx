import { Button, Divider, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import useOpen from '../../../Helper/CustomHooks/useOpen';
import GenericModal from '../../../Helper/Generics/GenericModal';
import RelatedProjectsCard from '../../RelatedProjects/RelatedProjectsCard';


export default function AdminRelatedProjectsManager() {
	const { open: addOpen, handleClick: handleOpenAdd, handleClose: handleCloseAdd } = useOpen();

	const handleAdd = () => {
		handleOpenAdd();
	}

	return (
		<div>
			<GenericModal
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
			</GenericModal>
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
					{/* John Cage */}
					<RelatedProjectsCard
						path="https://johncagetribute.org/"
						img="resized_john_cage.jpg"
						altText="John Cage Tribute Project"
						className="john-cage"
						title="John Cage"
						description="This is the John Cage Tribute Project."
					/>

					{/* Microtonal */}
					<RelatedProjectsCard
						path="http://microtonality.net/"
						img="music_clip_art.png"
						altText="Microtonal Music"
						className="microtonal"
						title="Microtonal Music Project"
						description="This is the Microtonal Music Project."
					/>

					{/* Schillinger */}
					<RelatedProjectsCard
						path="https://learnschillinger.com/"
						img="schillinger.jpg"
						altText="Learn Schillinger Project"
						className="schillinger"
						title="Learn Schillinger"
						description="This is the Learn Schillinger Project."
					/>

					{/* Miscellaneous Project */}
					<RelatedProjectsCard
						path="#"
						img="temp_thumb3.png"
						altText="Miscellaneous Project"
						className="misc"
						title="Miscellaneous Project"
						description="This is a Miscellaneous Project."
					/>
				</Grid>
			</div>
		</div>
	)
}
