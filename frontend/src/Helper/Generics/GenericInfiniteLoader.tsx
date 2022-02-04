import { useState } from "react";
import { useRef } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, List } from 'react-virtualized';
import GenericHandler from "../../Handlers/GenericHandler";
import { GenericHandlerType } from "../../ObjectInterface";
import ArticleCard from '../../Pages/Profile/Articles/ArticleCard';
import EventCard from '../../Pages/Profile/Events/EventCard';
import ExperienceCard from '../../Pages/Profile/Experience/ExperienceCard';
import MusicCard from '../../Pages/Profile/Music/MusicCard';

export default function GenericInfiniteLoader() {
    const [items, setItems] = useState<any[]>([]);

    if (items.length === 0) {
        setItems(Array.from({ length: 500 }).map(_ => null));
    }

    type loadedParam = {
        index: number
    };
    const isItemLoaded = ({ index }: loadedParam): boolean => index < items.length && items[index] !== null;

    type loadParam = {
        startIndex: number;
        stopIndex: number;
    };
    const loadMoreItems = async ({ startIndex, stopIndex }: loadParam) => {
        // return promise from api
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({ contentType: "music", startIndex: startIndex, endIndex: stopIndex }),
            methodType: "POST",
            path: "getContentByTypeInBatches",
        }

        try {
            let answer = await GenericHandler(handlerObject);

            console.log("Api Call", startIndex, stopIndex);
            // answer.then(res => { setItems(res.result) }).catch(err => err);
            console.log(answer);
            setItems(answer.result);
            return answer.result;
        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    };

    const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));

    // This helps resize new/removed items for window
    cache.current.clearAll();

    interface virtualizedType {
        key: any;
        index: number;
        style: any;
        parent: any;
    }

    return (
        <AutoSizer>
            {({ height, width }) => (
                <InfiniteLoader
                    isRowLoaded={isItemLoaded}
                    rowCount={items.length}
                    loadMoreRows={loadMoreItems}
                // isItemLoaded={isItemLoaded}
                // itemCount={items.length}
                // loadMoreItems={loadMoreItems}
                >
                    {({ onRowsRendered, registerChild }) => (
                        <List
                            ref={registerChild}
                            style={{ scrollbarWidth: "none" }}
                            width={width}
                            height={700}
                            rowHeight={cache.current.rowHeight}
                            deferredMeasurementCache={cache.current}
                            rowCount={!items ? 0 : items.length}
                            onRowsRendered={onRowsRendered}
                            rowRenderer={({ key, index, style, parent }: virtualizedType) => {
                                const result = items?.[index]!;
                                const type = "music";
                                const individualStyle = { padding: "1% 1% 20px" };
                                const isMyProfile = false;
                                const notifyChange = () => { };
                                console.log(result)
                                // console.log(style)
                                // console.log(cache.current.rowHeight)

                                return (
                                    <CellMeasurer
                                        key={key}
                                        cache={cache.current}
                                        parent={parent}
                                        columnIndex={0}
                                        rowIndex={index}
                                    >
                                        <div style={{ ...style, ...individualStyle }}>
                                            {/* {type === "experience" && <ExperienceCard experience={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />} */}
                                            {!!result && type === "music" && <MusicCard music={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />}
                                            {/* {!!result && type === "event" && <EventCard event={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />} */}
                                            {/* {type === "article" && <ArticleCard article={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />} */}
                                        </div>
                                    </CellMeasurer>
                                )
                            }}
                        />
                    )}
                </InfiniteLoader>
            )}
        </AutoSizer>
    );
};