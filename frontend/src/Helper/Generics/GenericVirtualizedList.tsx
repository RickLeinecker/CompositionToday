import { useContext, useRef } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import ArticleCard from '../../Pages/Profile/Articles/ArticleCard';
import EventCard from '../../Pages/Profile/Events/EventCard';
import ExperienceCard from '../../Pages/Profile/Experience/ExperienceCard';
import MusicCard from '../../Pages/Profile/Music/MusicCard';
import { ProfileContext } from '../../Pages/Profile/ProfileContext';

interface Props {
    bodyStyle?: object;
    individualStyle?: object;
    items: any;
    notifyChange: () => void;
    type: string;
}

export default function GenericVirtualizedList({ bodyStyle, individualStyle, items, notifyChange, type }: Props) {
    const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));
    const { isMyProfile } = useContext(ProfileContext);

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
                                            {type === "experience" && <ExperienceCard experience={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />}
                                            {type === "music" && <MusicCard music={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />}
                                            {type === "event" && <EventCard event={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />}
                                            {type === "article" && <ArticleCard article={result} isMyProfile={isMyProfile} notifyChange={notifyChange} />}
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