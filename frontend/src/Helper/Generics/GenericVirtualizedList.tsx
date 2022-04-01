import { useContext, useEffect, useRef, useState } from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import CommentCard from '../../Pages/Comments/CommentCard';
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
    const [rerender, setRerender] = useState<boolean>(false);
    const cache = useRef(new CellMeasurerCache({ fixedWidth: true }));
    const { isMyProfile } = useContext(ProfileContext);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        clearCache();
        return () => {};
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

    function checkIfFirstRender(): boolean{
        if(type === "comment" && isFirstRender){
            return true;
        }

        return false;
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
                            scrollToIndex={checkIfFirstRender() ? items.length : undefined}
                            onRowsRendered={() => setIsFirstRender(false)}
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
                                            // ExperienceCard doesn't need norifyVirtualizer because it has not expandable comments
                                            <div ref={registerChild} onLoad={measure} style={{ ...style, ...individualStyle }}>
                                                {type === "experience" && <ExperienceCard experience={result} isMyProfile={isMyProfile} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache} />}
                                                {type === "music" && <MusicCard music={result} isMyProfile={isMyProfile} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache} />}
                                                {type === "event" && <EventCard event={result} isMyProfile={isMyProfile} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache} />}
                                                {type === "article" && <ArticleCard article={result} isMyProfile={isMyProfile} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} clearCache={clearCache} />}
                                                {type === "comment" && <CommentCard commentType={result} isMyProfile={isMyProfile} notifyVirtualizer={notifyVirtualizer} notifyChange={notifyChange} />}
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