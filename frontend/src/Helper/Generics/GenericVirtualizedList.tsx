import { useRef } from 'react'
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import EventCard from '../../Pages/Profile/Events/EventCard';
import ExperienceCard from '../../Pages/Profile/Experience/ExperienceCard';
import MusicCard from '../../Pages/Profile/Music/MusicCard';

interface Props {
    bodyStyle?: object;
    individualStyle?: object;
    items: any;
    notifyChange: () => void;
    type: string;
}

export default function GenericVirtualizedList({ bodyStyle, individualStyle, items, notifyChange, type }: Props) {
    const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));

    // This helps resize new/removed data for window
    cache.current.clearAll();

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
                                        <div style={{ ...style, ...individualStyle }}>
                                            {type === "experience" && <ExperienceCard experience={result} isMyProfile={true} notifyChange={notifyChange} />}
                                            {type === "music" && <MusicCard music={result} isMyProfile={true} notifyChange={notifyChange} />}
                                            {type === "event" && <EventCard event={result} isMyProfile={true} notifyChange={notifyChange} />}
                                            {/* {type === "article" && <ArticleCard article={result} isMyProfile={true} notifyChange={notifyChange} />} */}
                                        </div>
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