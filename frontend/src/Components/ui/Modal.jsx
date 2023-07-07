import React from "react";
import "../../styles/Modal.css";

export default function Modal({ closeModal, children }) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={closeModal}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
}
