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
import useOpen from "../../../Helper/CustomHooks/useOpen";
import AdminDeleteRelatedProjectmodal from "./AdminDeleteRelatedProjectModal";


type Props = {
    id: number;
    path: string;
    img: string;
    className: string;
    title: string;
    altText: string;
    description: string;
    notifyChange: () => void;
};

export default function AdminRelatedProjectsCard({ img, path, className, title, altText, description, id, notifyChange }: Props) {

    const { open: editOpen, handleClick: handleOpenEdit, handleClose: handleCloseEdit } = useOpen();
    const { open: deleteOpen, handleClick: handleOpenDelete, handleClose: handleCloseDelete } = useOpen();

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
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <IconButton onClick={handleOpenEdit}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={handleOpenDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>

                        </CardContent>
                    </Card>
                </Paper>

            </Grid>

            <AdminDeleteRelatedProjectmodal
                projectID={id}
                notifyChange={notifyChange}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                type={"related project"}
            />
        </>
    );
}
