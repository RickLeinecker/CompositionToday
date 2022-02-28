import { useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import AdminGenreCard from './AdminGenreCard';
import AdminTagCard from './AdminTagCard';

interface Props {
    bodyStyle?: object;
    individualStyle?: object;
    items: any;
    notifyChange: () => void;
    type: string;
}

export default function AdminTagsVirtualizedList({ bodyStyle, individualStyle, items, notifyChange, type }: Props) {
    const [rerender, setRerender] = useState<boolean>(false);
    const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));

    useEffect(() => {
        clearCache();
    }, [items])

    const notifyVirtualizer = () => setRerender(value => !value);

    // This helps resize new/removed data for window
    const clearCache = () => cache.current.clearAll();

    interface virtualizedType {
        key: any;
        index: number;
        style: any;
        parent: any;
    }

    return (
        <div style={bodyStyle}>
            <AutoSizer>
                {
                    ({ width, height }) => (
                        <List
                            style={{ scrollbarWidth: "none" }}
                            width={width}
                            height={height}
                            rowHeight={cache.current.rowHeight}
                            deferredMeasurementCache={cache.current}
                            rowCount={!items ? 0 : items.length}
                            rowRenderer={({ key, index, style, parent }: virtualizedType) => {
                                const result = items?.[index]!;

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
                                                {type === "tag" && <AdminTagCard tag={result} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache} />}
                                                {type === "genre" && <AdminGenreCard genre={result} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache}/>}
                                            </div>
                                        )}
                                    </CellMeasurer>
                                )
                            }}
                        />
                    )
                }
            </AutoSizer>
        </div>
    );
}