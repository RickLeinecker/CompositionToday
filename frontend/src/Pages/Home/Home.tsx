import TopNavBar from '../TopNavBar';
import '../Showcase/ShowcaseStyle.scss';
import GenericInfiniteLoader from '../../Helper/Generics/GenericInfiniteLoader';
import FilterFeed from './FilterFeed';
import SortFeed from './SortFeed';
import { useState } from 'react';

export default function Home() {

    const [sortBy, setSortBy] = useState<string>("");
    const [filterByType, setFilterByType] = useState<Array<string>>([]);

    function updateSortBy(newValue: string){
        setSortBy(newValue);
    }

    function updateFilterBy(newValue: string[]){
        console.log(newValue);
        setFilterByType(newValue);
    }

    return (
        <div>
            <TopNavBar />
            <div className='container'>
                <div style={{position: "relative", display: "flex", justifyContent: "right", marginTop: "1%"}}>
                    <div style={{marginRight: "1%"}}>
                        <FilterFeed filterByType={filterByType} updateFilterBy={updateFilterBy}/>
                    </div>
                    <div>
                        <SortFeed sortBy={sortBy || ""} updateSortBy={updateSortBy}/>
                    </div>
                </div>
            </div>
            <GenericInfiniteLoader/>
        </div>
    )
}
