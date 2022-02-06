import { useEffect, useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import GenericSearch from '../../Helper/Generics/GenericSearch';
import TopNavBar from '../TopNavBar';
import GenericHandler from '../../Handlers/GenericHandler';
import GenericGetHandler from '../../Handlers/GenericGetHandler';
import { toast } from 'react-toastify';
import { GenericHandlerType, genreType } from '../../ObjectInterface';
import { PlayerContext } from './PlayerContext';
import ComposerSection from './ComposerSection';
import GenreSection from './GenreSection';
import './ShowcaseStyle.scss';

export default function Showcase() {
    const [genres, setGenres] = useState<genreType[]>([]);
    const [genreClicked, setGenreClicked] = useState<string>("");
    const [featuredComposers, setFeaturedComposers] = useState<any[]>([]);
    const [stopAllPlayers, setStopAllPlayers] = useState<boolean>(false);
    const bottomRef = useRef<HTMLHeadingElement>(null);

    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        getFeaturedComposers();
        getGenres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getComposersByGenre(genreClicked);
        scrollToBottom();
        // console.log("Changed")
    }, [genreClicked])

    const shuffleArray = (array: object[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    const getGenres = async () => {
        try {
            let answer = await GenericGetHandler("getComposerGenres");
            let list: genreType[] = answer.result;
            // console.log(list)
            shuffleArray(list);
            // console.log(list)

            setGenres(list.slice(0, 4));
        } catch (e: any) {
            toast.error('Failed to retrieve data');
        }
    }

    const getFeaturedComposers = async () => {
        try {
            let answer = await GenericGetHandler("getComposersForShowcase");

            setFeaturedComposers(answer.result);
        } catch (e: any) {
            toast.error('Failed to retrieve data');
        }
    }

    const getComposersByGenre = async (genre: string) => {
        if (!genre)
            return;

        try {
            const handlerObject: GenericHandlerType = {
                data: JSON.stringify({ genre: genre }),
                methodType: "POST",
                path: "getComposersByGenre",
            };

            let answer = await GenericHandler(handlerObject);
            // let list: any[] = answer.result;
            // console.log(list)
            // shuffleArray(list);
            // console.log(list)

            // setFeaturedComposers(list.slice(0, 4));
        } catch (e: any) {
            toast.error('Failed to retrieve data');
        }
    }

    return (
        <>
            <PlayerContext.Provider value={{ stopAllPlayers, setStopAllPlayers }} >
                <Container>
                    <h1>Showcase</h1>
                    <GenericSearch />

                    <ComposerSection featuredComposers={featuredComposers} />

                    <GenreSection genres={genres} setGenreClicked={setGenreClicked} />

                    {!!genreClicked && <h1 ref={bottomRef} className='header'>Composers of {genreClicked}</h1>}
                </Container>
            </PlayerContext.Provider>
        </>
    )
}
