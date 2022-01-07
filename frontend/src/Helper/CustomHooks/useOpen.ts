import { useState } from "react";

/**
 * Custom hook to quickly get necessary values to start opening
 * and closing modals. THIS BEST WORKS WITH GenericModal.
 * @returns open, handleModalOpen, handleModalClose
 */
export default function useOpen() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return { open, handleClick, handleClose };
}