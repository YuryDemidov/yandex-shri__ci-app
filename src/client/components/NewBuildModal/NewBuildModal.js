import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { requestBuild } from '../../store/buildsSlice';
import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import { MESSAGES } from '../../assets/js/utils/messages';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './NewBuildModal.module.scss';

export const NewBuildModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState('');

  useStyles(styles);

  const closeModalHandler = () => {
    closeModal();
    setErrorMessage('');
  };

  const runBuild = (evt) => {
    evt.preventDefault();
    const commitHash = evt.target.form.commitHash.value;

    if (!commitHash) {
      setErrorMessage(MESSAGES.ERROR.required);
      return;
    }

    dispatch(requestBuild({ commitHash, history, errorHandler: (error) => setErrorMessage(error.message || error) }));
    // closeModalHandler();
  };

  return (
    <>
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
          <Button content="Cancel" modifiers={['secondary']} clickHandler={closeModalHandler} />
        </div>
        {errorMessage && <p className="message message_error">{errorMessage}</p>}
      </form>
    </>
  );
};

NewBuildModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
