import { Grid } from '@mui/material';
import ComposerPaper from './ComposerPaper';
import { gridStyle } from './inlineStyles';

type ComposerSectionProps = {
    featuredComposers: any[];
}

export default function ComposerSection({ featuredComposers }: ComposerSectionProps) {
    return (
        <>
            <h1 className="header" >Featured Composers</h1>

            <div className="container">
                <Grid container>
                    {
                        featuredComposers?.map((featuredComposer) => {
                            return (
                                <Grid
                                    key={featuredComposer.id}
                                    sx={gridStyle}
                                    item
                                    container
                                    xs={12}
                                    sm={6}
                                    lg={3}
                                    justifyContent="center"
                                >
                                    <ComposerPaper composer={featuredComposer} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </>
    )
}