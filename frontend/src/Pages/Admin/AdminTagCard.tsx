import { TagType } from '../../ObjectInterface';

type Props = {
    tag: TagType;
    notifyChange: () => void;
    notifyVirtualizer: () => void;
    clearCache: () => void;
}


export default function AdminTagCard({ tag, notifyChange, notifyVirtualizer, clearCache }: Props) {
    const { id, tagName} = tag;

    return (
        <div>
          {tagName}
        </div>
    )
}
