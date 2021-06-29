import React from 'react';
import PropTypes from 'prop-types';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Modal.module.scss';

export const Modal = ({ modalContent, modalClass }) => {
  useStyles(styles);

  return (
    <div className={`modal${modalClass ? ` ${modalClass}` : ''}`}>
      <div className="modal__content">{modalContent}</div>
    </div>
  );
};

Modal.propTypes = {
  modalContent: PropTypes.element,
  modalClass: PropTypes.string,
};
