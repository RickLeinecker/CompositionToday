import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
    Paper,
    CardActionArea,
    Container,
    Grid,
    Link,
    Typography,
} from "@mui/material";

import "./RelatedProjects.scss";
type Props = {
    path: string;
    img: string;
    className: string;
    title: string;
    altText: string;
    description: string;
};

export default function RelatedProjectsCard({ img, path, className, title, altText, description }: Props) {
    return (
        <>
            <Grid item xs={12} sm={6} md={5}>
                <Paper elevation={3} sx={{ maxWidth: 375, height: 350 }}>
                    <Card sx={{ maxWidth: 375, height: 350 }}>
                        <CardActionArea href={path}>
                            <CardMedia
                                component="img"
                                height="250"
                                image={img}
                                alt={altText}
                            />
                        </CardActionArea>
                        <CardContent className={`related-projects ${className}`}>
                            <Typography gutterBottom variant="h5" component="div">
                                <Link href={path} color="inherit" underline="none">
                                    {title}
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
