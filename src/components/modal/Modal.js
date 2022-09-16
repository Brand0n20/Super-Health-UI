import React from 'react';
import ReactDom from 'react-dom';
import styles from './Modal.module.css';
import { ReactComponent as CloseBtn } from '../../assets/close-icon.svg';

/**
 * @name Modal
 * @param {open} cpen control open status of modal
 * @param {onClose} onClose control close status of modal
 * @param {children} children content on modal
 * @param {className} className imported css if needed
 * @returns a customizable modal with importable css
 */
const Modal = ({
  open, onClose, children, className
}) => {
  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div
        className={styles.overlay_styles}
        onClick={onClose}
        role="button"
        tabIndex="0"
        onKeyPress={onClose}
      />
      <div className={`${styles.modal_styles} ${className}`}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
        >
          <CloseBtn />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  );
};
export default Modal;
