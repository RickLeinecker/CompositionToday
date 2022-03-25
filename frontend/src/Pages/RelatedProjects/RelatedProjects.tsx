import {
	Container,
	Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import GenericGetHandler from "../../Handlers/GenericGetHandler";
import { RelatedProjectType } from "../../ObjectInterface";
import "./RelatedProjects.scss";
import RelatedProjectsCard from "./RelatedProjectsCard";

export default function RelatedProjects() {
	const [response, setResponse] = useState<Array<RelatedProjectType> | undefined>(undefined);

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
	}, []);

	return (
		<>
			<Container className="related-projects-container" maxWidth="lg">
				<Grid
					columns={13}
					container
					justifyContent="center"
					className="grid-container"
					rowSpacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}
					columnSpacing={{ xs: 1 }}
					marginBottom="4rem"
				>
					{response?.map(project =>
						<RelatedProjectsCard
							relatedProject={project}
							key={project.id}
						/>
					)}
				</Grid>
			</Container>

		</>
	);
}
