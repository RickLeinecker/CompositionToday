import TopNavBar from '../TopNavBar';
import GenericInfiniteLoader from '../../Helper/Generics/GenericInfiniteLoader';
import FilterFeed from './FilterFeed';
import SortFeed from './SortFeed';
import { useEffect, useState } from 'react';
import { GenericHandlerType } from '../../ObjectInterface';
import GenericHandler from "../../Handlers/GenericHandler";
import { getAuth } from 'firebase/auth';

export default function Home() {

    const [sortBy, setSortBy] = useState<string>("newest");
    const [filterByType, setFilterByType] = useState<Array<string>>(["music", "event", "article"]);
    const [rerender, setRerender] = useState<boolean>(false);
    const currentUid = getAuth().currentUser?.uid;

    useEffect(() => {
        setRerender(prev => !prev);
    }, [filterByType, sortBy]);

    function updateSortBy(newValue: string) {
        setSortBy(newValue);
    }

    function updateFilterBy(newValue: string[]) {
        console.log(newValue);
        setFilterByType(newValue);
    }

    return (
        <div>
            <TopNavBar />
            <div className='container'>
                <div style={{ position: "relative", display: "flex", justifyContent: "right", marginTop: "1%" }}>
                    <div style={{ marginRight: "1%" }}>
                        <FilterFeed filterByType={filterByType} updateFilterBy={updateFilterBy} />
                    </div>
                    <div>
                        <SortFeed sortBy={sortBy || ""} updateSortBy={updateSortBy} />
                    </div>
                </div>
            </div>
            <GenericInfiniteLoader uid={currentUid} contentType={filterByType} sortBy={sortBy} />
        </div>
    )
}
