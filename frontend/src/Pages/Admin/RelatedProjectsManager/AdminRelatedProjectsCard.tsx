import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../RelatedProjects/RelatedProjects.scss";
import {
    Paper,
    CardActionArea,
    Grid,
    Link,
    Typography,
    IconButton,
} from "@mui/material";


type Props = {
    path: string;
    img: string;
    className: string;
    title: string;
    altText: string;
    description: string;
};

export default function AdminRelatedProjectsCard({ img, path, className, title, altText, description }: Props) {
    return (
        <>
            <Grid item xs={12} md={6} >
                <Paper elevation={3} sx={{ margin: "auto", maxWidth: 375, maxHeight: 400 }}>
                    <Card sx={{ maxWidth: 375 }}>
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
                            <div style={{ display:"flex", justifyContent:"flex-end"}}>
                                <IconButton>
                                    <EditIcon />
                                </IconButton>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                        </CardContent>
                    </Card>
                </Paper>

            </Grid>
        </>
    );
}
