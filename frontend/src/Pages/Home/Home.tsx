import TopNavBar from '../TopNavBar';
import GenericInfiniteLoader from '../../Helper/Generics/GenericInfiniteLoader';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import './HomeStyle.scss';
import HomeHeader from './HomeHeader';

export default function Home() {

    const [sortBy, setSortBy] = useState<string>("newest");
    const [filterByType, setFilterByType] = useState<Array<string>>([]);
    const [key, setKey] = useState<number>(0);
    const currentUid = getAuth().currentUser?.uid;

    function updateSortBy(newValue: string) {
        setSortBy(newValue);
        setKey(prev => prev + 1);
    }

    function updateFilterBy(newValue: string) {
        let tempArr = filterByType;

        if (tempArr.includes(newValue)) {
            tempArr = tempArr.filter(e => e !== newValue);
        }
        else {
            tempArr.push(newValue)
        }
        setFilterByType(tempArr);
        setKey(prev => prev + 1);
    }

    return (
        <div>
            <TopNavBar />
            <div className='container-home'>
                <HomeHeader updateFilterBy={updateFilterBy} updateSortBy={updateSortBy} sortBy={sortBy} uid={currentUid || ""}/>
            </div>
            <GenericInfiniteLoader key={key} uid={currentUid} contentType={filterByType} sortBy={sortBy} />
        </div>
    )
}
