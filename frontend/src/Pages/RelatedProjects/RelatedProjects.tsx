import TopNavBar from "../TopNavBar";
import GenericSearch from "../../Helper/Generics/GenericSearch";
import * as React from "react";
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

export default function RelatedProjects() {
  return (
    <>
      <TopNavBar />
      <Container className="related-projects-container" maxWidth="lg">
        <h1 id="related-projects-header">Related Projects</h1>
        <GenericSearch />
        <Grid
            columns={13}
          container
          justifyContent="center"
          className="grid-container"
          rowSpacing={{ xs: 2, sm: 2, md: 4, lg: 4 }}
          columnSpacing={{ xs: 1 }}
        >
          {/* John Cage */}
          <Grid item xs={12} sm={6} md={5}>
            <Paper elevation={3} sx={{ maxWidth: 375, height: 350 }}>
              <Card sx={{ maxWidth: 375, height: 350 }}>
                <CardActionArea href="https://johncagetribute.org/">
                  <CardMedia
                    component="img"
                    height="250"
                    image="resized_john_cage.jpg"
                    alt="John Cage Tribute Project"
                  />
                </CardActionArea>
                <CardContent className="related-projects john-cage">
                  <Typography gutterBottom variant="h5" component="div">
                    <Link
                      href="https://johncagetribute.org/"
                      color="inherit"
                      underline="none"
                    >
                      John Cage
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the John Cage Tribute Project.
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* MicroTonal */}
          <Grid item xs={12} sm={6} md={5}>
            <Paper elevation={3} sx={{ maxWidth: 375, height: 350 }}>
              <Card sx={{ maxWidth: 375, height: 350 }}>
                <CardActionArea href="http://microtonality.net/">
                  <CardMedia
                    component="img"
                    height="250"
                    image="music_clip_art.png"
                    alt="Microtonal Music"
                  />
                </CardActionArea>
                <CardContent className="related-projects microtonal">
                  <Typography gutterBottom variant="h5" component="div">
                    <Link
                      href="http://microtonality.net/"
                      color="inherit"
                      underline="none"
                      className="related-projects"
                    >
                      Microtonal Music Project
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the Microtonal Music Project.
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* Schillinger */}
          <Grid item xs={12} sm={6} md={5}>
            <Paper elevation={3} sx={{ maxWidth: 375, height: 350 }}>
              <Card sx={{ maxWidth: 375, height: 350 }}>
                <CardActionArea href="https://learnschillinger.com/">
                  <CardMedia
                    component="img"
                    height="250"
                    image="schillinger.jpg"
                    alt="Learn Schillinger Project"
                  />
                </CardActionArea>
                <CardContent className="related-projects schillinger">
                  <Typography gutterBottom variant="h5" component="div">
                    <Link
                      href="https://learnschillinger.com/"
                      color="inherit"
                      underline="none"
                      className="related-projects"
                    >
                      Learn Schillinger
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is the Learn Schillinger Project.
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>

          {/* Miscellaneous Project */}
          <Grid item xs={12} sm={6} md={5}>
            <Paper elevation={3} sx={{ maxWidth: 375, height: 350 }}>
              <Card sx={{ maxWidth: 375, height: 350 }}>
                <CardActionArea href="#">
                  <CardMedia
                    component="img"
                    height="250"
                    image="temp_thumb3.png"
                    alt="Miscellaneous Project"
                  />
                </CardActionArea>
                <CardContent className="related-projects misc">
                  <Typography gutterBottom variant="h5" component="div">
                    <Link
                      href="#"
                      color="inherit"
                      underline="none"
                      className="related-projects"
                    >
                      Miscellaneous Project
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a Miscellaneous Project.
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
    </>
  );
}
