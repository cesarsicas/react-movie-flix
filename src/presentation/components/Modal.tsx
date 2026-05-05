import React from "react";
import ReactDOM from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Element with id 'modal-root' not found.");
    return null;
  }

  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(14,13,10,0.88)",
        backdropFilter: "blur(4px)",
        padding: 16,
      }}
      onClick={onClose}
    >
      <div
        className="panel"
        style={{
          width: "100%",
          maxWidth: 560,
          overflow: "hidden",
          boxShadow: "6px 6px 0 rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Channel strip header */}
        {title && (
          <div className="channel-strip">
            <span className="font-crt" style={{ color: "var(--amber)" }}>◈</span>
            <span>{title}</span>
            <button
              onClick={onClose}
              className="btn btn-sm btn-ghost"
              style={{ padding: "2px 8px" }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}

        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
