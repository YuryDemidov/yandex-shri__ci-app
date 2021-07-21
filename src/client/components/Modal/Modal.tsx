import React from 'react';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Modal.module.scss';

interface ModalProps {
  modalContent?: React.ReactNode;
  modalClass?: string;
}

export const Modal = ({ modalContent, modalClass }: ModalProps): JSX.Element => {
  useStyles(styles);

  return (
    <div className={`modal${modalClass ? ` ${modalClass}` : ''}`}>
      <div className="modal__content">{modalContent}</div>
    </div>
  );
};
