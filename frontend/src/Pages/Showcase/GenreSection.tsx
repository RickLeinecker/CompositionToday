import GenrePaper from './GenrePaper';
import { Grid } from '@mui/material';
import { gridStyle } from './inlineStyles';
import { genreType } from '../../ObjectInterface';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './CarouselStyle.scss';

type GenreSectionProps = {
    genres: genreType[];
    setGenreClicked: React.Dispatch<React.SetStateAction<string>>;
}


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};//

export default function GenreSection({ genres, setGenreClicked }: GenreSectionProps) {
    return (
        <>
            <h1 className="header">Discover Composers By Genre</h1>

            {/* Use an API that randomly selects genre types */}
            <div className="container" >
                <Grid container>
                    <Carousel
                        swipeable={false}
                        // draggable={false}
                        responsive={responsive}
                        // ssr={true} // means to render carousel on server-side.
                        // centerMode
                        infinite
                        // autoPlay
                        autoPlaySpeed={5000}
                        keyBoardControl
                        // customTransition="all 500"
                        // transitionDuration={3000}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-card-item"
                    >

                        {
                            genres?.map((genre) => {
                                return (
                                    <Grid
                                        key={genre.tagName}
                                        sx={gridStyle}
                                        item
                                        container
                                        xs={12}
                                        sm={6}
                                        lg={3}
                                        justifyContent="center"
                                    >
                                        <GenrePaper genre={genre} setGenreClicked={setGenreClicked} />
                                    </Grid>
                                )
                            })
                        }
                    </Carousel>
                </Grid>
            </div>
        </>
    )
}