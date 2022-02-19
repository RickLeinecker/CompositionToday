import TopNavBar from '../TopNavBar';
import GenericInfiniteLoader from '../../Helper/Generics/GenericInfiniteLoader';
import FilterFeed from './FilterFeed';
import SortFeed from './SortFeed';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';

export default function Home() {

    const [sortBy, setSortBy] = useState<string>("newest");
    const [filterByType, setFilterByType] = useState<Array<string>>([]);
    const [key, setKey] = useState<number>(0);
    const currentUid = getAuth().currentUser?.uid;

    function updateSortBy(newValue: string) {
        console.log("sort", newValue)
        setSortBy(newValue);
        setKey(prev => prev + 1);
    }

    function updateFilterBy(newValue: string[]) {
        console.log(newValue);
        setFilterByType(newValue);
        setKey(prev => prev + 1);
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
            <GenericInfiniteLoader key={key} uid={currentUid} contentType={filterByType} sortBy={sortBy} />
        </div>
    )
}
