import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import {
    Paper,
    CardActionArea,
    Grid,
    Link,
    Typography,
} from "@mui/material";

import "./RelatedProjects.scss";
import { RelatedProjectType } from "../../ObjectInterface";
type Props = {
    relatedProject: RelatedProjectType;
};

export default function RelatedProjectsCard({ relatedProject }: Props) {
    const { id, url, imageFilepath, imageFilename, projectTitle, description, backgroundColor } = relatedProject;

    return (
        <>
            <Grid item xs={12} md={6} >
                <Paper elevation={3} sx={{ margin: "auto", maxWidth: 375, maxHeight: 400 }}>
                    <Card sx={{ maxWidth: 375 }}>
                        
                        <CardActionArea href={url}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={imageFilepath}
                                alt={description}
                            />
                        </CardActionArea>
                        <CardContent style={{background: backgroundColor}}>
                            <Typography gutterBottom variant="h5" component="div">
                                <Link href={url} color="inherit" underline="none">
                                    {projectTitle}
                                </Link>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>

            </Grid>
        </>
    );
}
