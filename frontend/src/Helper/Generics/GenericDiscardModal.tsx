import React from 'react';
import GenericModal from './GenericModal';

type Props = {
    notifyChange: () => void;
    discardOpen: boolean;
    handleCloseDiscard: () => void;
    handleConfirmDiscard: () => void;
}

export default function GenericDiscardModal({ notifyChange, discardOpen, handleCloseDiscard, handleConfirmDiscard}: Props) {
    return (
        <div>
            <GenericModal show={discardOpen} title={"Discard"} onHide={handleCloseDiscard} confirm={handleConfirmDiscard} actionText={"Discard"} >
                <>
                    <p>
                        Are you sure you want to discard this? Changes made won't be saved.
                    </p>
                </>
            </GenericModal>
        </div>
    );
}
