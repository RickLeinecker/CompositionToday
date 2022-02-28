import { TagType } from '../../ObjectInterface';

type Props = {
    tags: TagType;
    notifyChange: () => void;
    notifyVirtualizer: () => void;
    clearCache: () => void;
    isGenre?: boolean;
}


export default function AdminTagCard({ tags, isGenre, notifyChange, notifyVirtualizer, clearCache }: Props) {
    const { id, tagName} = tags;

    return (
        <div>
          {tagName}
        </div>
    )
}
