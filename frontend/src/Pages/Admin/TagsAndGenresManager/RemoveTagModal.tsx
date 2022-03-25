import { toast } from "react-toastify";
import GenericModal from "../../../Helper/Generics/GenericModal";
import { GenericHandlerType, TagType } from "../../../ObjectInterface";
import GenericHandler from '../../../Handlers/GenericHandler';

type Props = {
	selectedTags: TagType[];
    notifyChange: () => void;
    removeOpen: boolean;
    handleCloseRemove: () => void;
}

const RemoveTagModal = ({ selectedTags, notifyChange, removeOpen, handleCloseRemove}: Props) => {
	async function fetchRemove(tag: TagType) {
		const handlerObject: GenericHandlerType = {
			data: JSON.stringify({
				tagID: tag.id
			}),
			methodType: "DELETE",
			path: "deleteTag",
		}

		try {
			let answer = (await GenericHandler(handlerObject));
			if (answer.error.length > 0) {
				toast.error("Failed to delete " + tag.tagName);
				console.error(answer.error);
				return;
			}

			toast.success("Successfully deleted " + tag.tagName);
			notifyChange();
		} catch (e: any) {
			console.error("Frontend Error: " + e);
			toast.error("Failed to delete " + tag.tagName);
		}
	}

	function confirmDeleteHandler() {
		console.log("delete admins", selectedTags)

		selectedTags.map((tag: TagType) => fetchRemove(tag));

		handleCloseRemove();
	}

	return (
		<GenericModal
			show={removeOpen}
			title={"Delete Tags"}
			onHide={handleCloseRemove}
			confirm={confirmDeleteHandler}
			actionText={"Delete"}
			checkForErrors={() => false}
		>
			<div>
				<pre>
					{JSON.stringify(selectedTags)}
				</pre>
			</div>
		</GenericModal>
	);
}

export default RemoveTagModal;