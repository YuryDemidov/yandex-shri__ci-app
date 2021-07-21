import React from 'react';
import { useDispatch } from 'react-redux';

import { Modal } from '../Modal/Modal';
import { closeModal } from '../../store/modalSlice';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './ModalWrap.module.scss';

interface ModalWrapProps {
  modal?: React.ReactNode;
  modalClass?: string;
}

export const ModalWrap = ({ modal, modalClass }: ModalWrapProps): JSX.Element => {
  const dispatch = useDispatch();
  useStyles(styles);

  return (
    <div className={`modal-wrap${modal ? '' : ' hidden'}`}>
      <div className="modal-wrap__background" onClick={() => dispatch(closeModal())} />
      <Modal modalContent={modal} modalClass={modalClass} />
    </div>
  );
};
