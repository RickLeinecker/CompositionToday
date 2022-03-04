import GenericInfiniteLoader from '../../Helper/Generics/GenericInfiniteLoader';
import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import './HomeStyle.scss';
import HomeHeader from './HomeHeader';
import { TagType } from '../../ObjectInterface';

export default function Home() {

    const [sortBy, setSortBy] = useState<string>("newest");
    const [filterByType, setFilterByType] = useState<Array<string>>([]);
    const [filterByTags, setFilterByTags] = useState<TagType[]>([]);
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

    function updateTags(newValue: Array<TagType>) {
        console.log("here we get the tags", newValue);
        setFilterByTags(newValue);
        setKey(prev => prev + 1);
    }

    return (
        <div>
            <div className='container-home'>
                {
                    getAuth().currentUser?.isAnonymous ?
                        <></>
                        :
                        <HomeHeader
                            updateFilterBy={updateFilterBy}
                            updateSortBy={updateSortBy}
                            updateTags={updateTags}
                            tags={filterByTags}
                            sortBy={sortBy}
                            uid={currentUid || ""}
                        />
                }

            </div>
            <GenericInfiniteLoader key={key} uid={currentUid} contentType={filterByType} tags={filterByTags} sortBy={sortBy} />
        </div>
    )
}
