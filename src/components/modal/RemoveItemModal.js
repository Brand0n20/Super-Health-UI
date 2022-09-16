import React from 'react';
import styles from './RemoveItemModal.module.css';
import Modal from './Modal';

/**
 * @name RemoveItemModal
 * @description - A modal to confirm the removal of an item from the shopping cart
 * @author - Andrew Salerno
 */
const RemoveItemModal = ({
  open, onCancel, onProceed, title
}) => (
  <Modal open={open} onClose={onCancel} className={styles.custom_modal_style}>
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.textColor}>Are you sure you want to remove</p>
          <p className={styles.textColor}>{title}</p>
          <p className={styles.textColor}>from your shopping cart?</p>
        </div>
        <div className={styles.button_container}>
          <button className={styles.proceed} type="button" onClick={onProceed}>
            Proceed
          </button>
          <button className={styles.cancel} type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </>
  </Modal>
);

export default RemoveItemModal;
