import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import { MESSAGES } from '../../assets/js/utils/messages';

import useStyles from 'isomorphic-style-loader/useStyles';
import './Modal.module.scss';
import './ModalWrap.module.scss';
import styles from './NewBuildModal.module.scss';

export const NewBuildModal = ({ show, setShow }) => {
  const [errorMessage, setErrorMessage] = useState('');

  useStyles(styles);

  if (!show) {
    return null;
  }

  const closeModal = () => {
    setShow(false);
    setErrorMessage('');
  };

  const runBuild = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target.form);
    const requestBody = {};

    for (let [key, value] of formData) {
      if (key === 'commitHash' && !value) {
        setErrorMessage(MESSAGES.ERROR.required);
        return;
      }
      requestBody[key] = value;
    }

    alert(`Received data: ${JSON.stringify(requestBody)}`);
  };

  return (
    <div className="modal new-build-modal">
      <div className="modal__content">
        <h3 className="modal__title">New build</h3>
        <form className="modal__form" onInput={() => setErrorMessage('')}>
          <TextInput
            id="commitHash"
            className={`modal__input${errorMessage ? ' text-input_invalid' : ''}`}
            name="commitHash"
            labelTextBefore="Enter the commit hash which you want to build."
            placeholder="Commit hash"
            isRequired
            hasClearButton
          />
          <div className="modal__buttons">
            <Button content="Run build" modifiers={['primary']} type="submit" clickHandler={runBuild} />
            <Button content="Cancel" modifiers={['secondary']} clickHandler={closeModal} />
          </div>
          {errorMessage && <p className="message message_error">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

NewBuildModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
};
