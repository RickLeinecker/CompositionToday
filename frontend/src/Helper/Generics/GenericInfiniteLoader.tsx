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
    const [items, setItems] = useState<any[]>([null]);

    type loadedParam = {
        index: number
    };

    const isItemLoaded = ({ index }: loadedParam): boolean => !!items[index];

    type loadParam = {
        startIndex: number;
        stopIndex: number;
    };

    // return promise from api
    const loadMoreItems = async ({ startIndex, stopIndex }: loadParam) => {
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
            console.log(items);
            setItems(prev => [...prev, ...answer.result]);
            return new Promise((resolve, reject) => { resolve(answer.result); });
        } catch (e: any) {
            console.error("Frontend Error: " + e);
        }
    };

    const noRowsRenderer = () => (
        <div>
            No more items found
        </div>
    );

    const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));

    interface virtualizedType {
        key: any;
        index: number;
        style: any;
        parent: any;
    }

    return (
        <div style={{width: "100%", height: "90vh"}}>
            <AutoSizer>
                {({ height, width }) => (
                    <InfiniteLoader
                        isRowLoaded={isItemLoaded}
                        rowCount={items.length + 50}
                        loadMoreRows={loadMoreItems}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <List
                                ref={registerChild}
                                style={{ scrollbarWidth: "none" }}
                                width={width}
                                height={height}
                                rowHeight={cache.current.rowHeight}
                                deferredMeasurementCache={cache.current}
                                rowCount={!items ? 0 : items.length}
                                onRowsRendered={onRowsRendered}
                                noRowsRenderer={noRowsRenderer}
                                rowRenderer={({ key, index, style, parent }: virtualizedType) => {
                                    const result = items?.[index]!;
                                    const type = "music";
                                    const individualStyle = { padding: "1% 20% 20px" };
                                    const isMyProfile = false;
                                    const notifyChange = () => { };
                                    const clearCache = () => { };

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
                                                {!!result && type === "music" && <MusicCard music={result} isMyProfile={isMyProfile} notifyChange={notifyChange} clearCache={clearCache} />}
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
        </div>
    );
};