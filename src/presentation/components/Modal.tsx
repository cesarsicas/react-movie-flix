import React from "react";
import ReactDOM from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  if (!props.isOpen) return null;

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    console.error(
      "The element with id 'modal-root' was not found. The modal cannot be rendered.",
    );
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="bg-opacity-50 bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={props.onClose}
    >
      <div
        className="w-full max-w-xl scale-100 transform overflow-hidden rounded-lg bg-white opacity-100 shadow-xl transition-all duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {props.title && (
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {props.title}
            </h2>
            <button
              onClick={props.onClose}
              className="text-2xl leading-none text-gray-400 transition-colors hover:text-gray-600"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        )}

        <div className="p-4">{props.children}</div>

        {/*
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200" onClick={props.onClose}>
                Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Save
            </button>
        </div>
        */}
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
