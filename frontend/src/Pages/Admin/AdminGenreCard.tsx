import { TagType } from '../../ObjectInterface';

type Props = {
    genre: TagType;
    notifyChange: () => void;
    notifyVirtualizer: () => void;
    clearCache: () => void;
}


export default function AdminGenreCard({ genre, notifyChange, notifyVirtualizer, clearCache }: Props) {
    const { id, tagName } = genre;

    return (
        <div>
          {tagName}
        </div>
    )
}
