import { toast } from "react-toastify";
import GenericModal from "../../../Helper/Generics/GenericModal";
import { GenericHandlerType, TagType } from "../../../ObjectInterface";
import GenericHandler from '../../../Handlers/GenericHandler';

interface Props {
	selectedGenres: TagType[];
    notifyChange: () => void;
    removeOpen: boolean;
    handleCloseRemove: () => void;
}

const RemoveGenreModal = ({selectedGenres, notifyChange, removeOpen, handleCloseRemove}: Props) => {
	async function fetchRemove(genre: TagType) {
		const handlerObject: GenericHandlerType = {
			data: JSON.stringify({
				tagID: genre.id
			}),
			methodType: "POST",
			path: "removeGenre",
		}

		try {
			let answer = (await GenericHandler(handlerObject));
			if (answer.error.length > 0) {
				toast.error("Failed to remove " + genre.tagName);
				console.error(answer.error);
				return;
			}

			toast.success("Successfully removed " + genre.tagName);
			notifyChange();
		} catch (e: any) {
			console.error("Frontend Error: " + e);
			toast.error("Failed to remove " + genre.tagName);
		}
	}

	function confirmDeleteHandler() {
		console.log("delete genre", selectedGenres);

		selectedGenres.map((genre: TagType) => fetchRemove(genre));

		handleCloseRemove();
	}

	return (
		<GenericModal
			show={removeOpen}
			title={"Remove Genre Status"}
			onHide={handleCloseRemove}
			confirm={confirmDeleteHandler}
			actionText={"Remove"}
			checkForErrors={() => false}
		>
			<div>
				<pre>
					{JSON.stringify(selectedGenres)}
				</pre>
			</div>
		</GenericModal>
	);
}

export default RemoveGenreModal;