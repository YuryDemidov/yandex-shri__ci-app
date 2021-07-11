import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal } from '../Modal/Modal';
import { closeModal } from '../../store/modalSlice';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ModalWrap.module.scss';

export const ModalWrap = ({ modal, modalClass }) => {
  const dispatch = useDispatch();
  useStyles(styles);

  return (
    <div className={`modal-wrap${modal ? '' : ' hidden'}`}>
      <div className="modal-wrap__background" onClick={() => dispatch(closeModal())} />
      <Modal modalContent={modal} modalClass={modalClass} />
    </div>
  );
};

ModalWrap.propTypes = {
  modal: PropTypes.element,
  modalClass: PropTypes.string,
};
