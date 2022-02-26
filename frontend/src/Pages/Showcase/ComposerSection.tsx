import { Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import ComposerPaper from './ComposerPaper';
import { gridStyle } from './inlineStyles';

type ComposerSectionProps = {
    header: string;
    featuredComposers: any[];
    genre?: string;
}

export default function ComposerSection({ header, featuredComposers, genre }: ComposerSectionProps) {
    const [composers, setComposers] = useState(featuredComposers);
    const bottomRef = useRef<HTMLHeadingElement>(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        setComposers(featuredComposers);
    }, [featuredComposers])

    console.log("featured", featuredComposers);
    console.log("Composers", composers);
    return (
        <>
            <h1 className="header" >{header}</h1>

            {
                header !== "Featured Composers" &&
                <GenericSearch
                    placeHolder={`Search ${header}`}
                    apiEndpoint='searchComposers'
                    genre={genre}
                    getPayload={(value: any) => { setComposers(value); scrollToBottom(); }}
                />
            }

            <div ref={bottomRef} className="container">
                <Grid container>
                    {
                        composers?.map((composer) => {
                            return (
                                <Grid
                                    key={composer.id}
                                    sx={gridStyle}
                                    item
                                    container
                                    xs={12}
                                    sm={6}
                                    lg={3}
                                    justifyContent="center"
                                >
                                    <ComposerPaper composer={composer} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </div>
        </>
    )
}