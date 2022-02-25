import TopNavBar from "../TopNavBar";
import GenericSearch from "../../Helper/Generics/GenericSearch";
import {
	Container,
	Grid,
} from "@mui/material";
import "./RelatedProjects.scss";
import RelatedProjectsCard from "./RelatedProjectsCard";

export default function RelatedProjects() {
	return (
		<>
			<TopNavBar />
			<Container className="related-projects-container" maxWidth="lg">
				<h1 id="related-projects-header">Related Projects</h1>
				<GenericSearch placeHolder="Search Related Projects" apiEndpoint='searchComposers' getPayload={(value: any) => {}} />
				<Grid
					columns={13}
					container
					justifyContent="center"
					className="grid-container"
					rowSpacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}
					columnSpacing={{ xs: 1 }}
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
			</Container>

		</>
	);
}
