import TopNavBar from '../TopNavBar';
import '../Showcase/ShowcaseStyle.scss';
import GenericInfiniteLoader from '../../Helper/Generics/GenericInfiniteLoader';

export default function Home() {
    return (
        <>
            <TopNavBar />
            <GenericInfiniteLoader />
        </>
    )
}
