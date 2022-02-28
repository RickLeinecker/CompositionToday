import { TagType } from '../../ObjectInterface';

type Props = {
    genre: TagType;
    notifyChange: () => void;
    notifyVirtualizer: () => void;
    clearCache: () => void;
}


export default function AdminGenreCard({ genre, notifyChange, notifyVirtualizer, clearCache }: Props) {
    const { id, tagName, imageFilepath } = genre;

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-text">{tagName}</p>
            </div>
        </div>
    )
}
