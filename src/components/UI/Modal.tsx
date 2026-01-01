import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content__header">
          <h2 className="modal-content__title">{title}</h2>
          <button className="modal-content__close" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content__body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
