import { useEffect, useState } from "react";
import { useRef } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader, InfiniteLoaderChildProps, List } from 'react-virtualized';
import GenericHandler from "../../Handlers/GenericHandler";
import { GenericHandlerType, TagType } from "../../ObjectInterface";
import ArticleCard from '../../Pages/Profile/Articles/ArticleCard';
import EventCard from '../../Pages/Profile/Events/EventCard';
import MusicCard from '../../Pages/Profile/Music/MusicCard';

type Props = {
    uid: string | undefined;
    contentType: string[];
    tags: TagType[];
    sortBy: string;
}

export default function GenericInfiniteLoader({ uid, contentType, tags, sortBy }: Props) {
    const [items, setItems] = useState<any[]>([null]);
    const [rerender, setRerender] = useState<boolean>(false);
    const virtualizedRef = useRef<List | null>(null);

    console.log("did change", items, tags)

    type loadedParam = {
        index: number
    };

    const isItemLoaded = ({ index }: loadedParam): boolean => !!items[index];

    type loadParam = {
        startIndex: number;
        stopIndex: number;
    };

    useEffect(() => {
        return () => {};
    })

    // return promise from api
    const loadMoreItems = async ({ startIndex, stopIndex }: loadParam) => {
        console.log(sortBy, contentType);
        console.log(startIndex, stopIndex);
        const handlerObject: GenericHandlerType = {
            data: JSON.stringify({ uid: uid, contentTypeArray: contentType, tagArray: tags, sortBy: sortBy, startIndex: startIndex, endIndex: stopIndex }),
            methodType: "POST",
            path: "getHomefeedContentInBatches",
        }

        try {
            let answer = await GenericHandler(handlerObject);

            console.log("Api Call", startIndex, stopIndex);
            // answer.then(res => { setItems(res.result) }).catch(err => err);
            console.log(answer);
            console.log(items);
            setItems(prev => {
                let temp = [...prev, ...answer.result];
                return [...new Set<string>(temp.map(x => JSON.stringify(x)))].map(x => JSON.parse(x));
            });
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

    // This helps resize new/removed data for window
    const clearCache = () => cache.current.clearAll();

    const notifyVirtualizer = () => setRerender(prev => !prev);

    interface virtualizedType {
        key: any;
        index: number;
        style: any;
        parent: any;
    }

    return (
        <div style={{ width: "100%", height: "90vh" }}>
            <AutoSizer>
                {({ height, width }) => (
                    <InfiniteLoader
                        isRowLoaded={isItemLoaded}
                        rowCount={items.length + 50}
                        loadMoreRows={loadMoreItems}
                    >
                        {({ onRowsRendered, registerChild }: InfiniteLoaderChildProps) => (
                            <List
                                ref={(ref) => {
                                    // Save ref for public methods if needed
                                    virtualizedRef.current = ref;

                                    // Pass it on to InfiniteLoader as well
                                    registerChild(ref)
                                }}
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
                                    const type = result?.contentType;
                                    const individualStyle = { padding: "1% 20% 20px" };
                                    const isMyProfile = false;
                                    // console.log("scrolling")
                                    // virtualizedRef.current?.recomputeRowHeights();

                                    return (
                                        <CellMeasurer
                                            key={key}
                                            cache={cache.current}
                                            parent={parent}
                                            columnIndex={0}
                                            rowIndex={index}
                                        >
                                            {({ measure, registerChild }) => (
                                                <div ref={registerChild} onLoad={measure} style={{ ...style, ...individualStyle }}>
                                                    {!!result && type === "music" && <MusicCard music={result} isMyProfile={isMyProfile} notifyChange={notifyVirtualizer} notifyVirtualizer={notifyVirtualizer} clearCache={clearCache} />}
                                                    {!!result && type === "event" && <EventCard event={result} isMyProfile={isMyProfile} notifyChange={notifyVirtualizer} notifyVirtualizer={notifyVirtualizer} clearCache={clearCache}/>}
                                                    {!!result && type === "article" && <ArticleCard article={result} isMyProfile={isMyProfile} notifyChange={notifyVirtualizer} notifyVirtualizer={notifyVirtualizer} clearCache={clearCache}/>}
                                                </div>
                                            )}
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