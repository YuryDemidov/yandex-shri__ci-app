import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../Modal/Modal';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ModalWrap.module.scss';

export const ModalWrap = ({ modal, modalClass, closeModal }) => {
  useStyles(styles);

  return (
    <div className={`modal-wrap${modal ? '' : ' hidden'}`}>
      <div className="modal-wrap__background" onClick={closeModal} />
      <Modal modalContent={modal} modalClass={modalClass} />
    </div>
  );
};

ModalWrap.propTypes = {
  modal: PropTypes.element,
  modalClass: PropTypes.string,
  closeModal: PropTypes.func,
};
