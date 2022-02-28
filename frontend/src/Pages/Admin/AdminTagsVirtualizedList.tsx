import { useContext, useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { ProfileContext } from '../../Pages/Profile/ProfileContext';
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
    const { isMyProfile } = useContext(ProfileContext);

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
                                                {type === "tag" && <AdminTagCard tags={result} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache} />}
                                                {type === "genre" && <AdminTagCard tags={result} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache} isGenre={true}/>}
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