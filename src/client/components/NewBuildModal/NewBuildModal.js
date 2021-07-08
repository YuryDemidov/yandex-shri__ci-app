import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { requestBuild } from '../../store/buildsSlice';
import { closeModal, getModalState, hideModalError, showModalError } from '../../store/modalSlice';
import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import { MESSAGES } from '../../assets/js/utils/messages';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './NewBuildModal.module.scss';

export const NewBuildModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { errorMessage } = useSelector(getModalState);
  useStyles(styles);

  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch, closeModal]);

  const showError = (text) => {
    dispatch(showModalError(text));
  };

  const runBuild = useCallback(
    (evt) => {
      evt.preventDefault();
      const commitHash = evt.target.form.commitHash.value;

      if (!commitHash) {
        showError(MESSAGES.ERROR.required);
        return;
      }

      dispatch(
        requestBuild({
          commitHash,
          history,
          onError: (error) => showError(error.message || error),
          onSuccess: close,
        })
      );
    },
    [dispatch, history, requestBuild, showError, close]
  );

  return (
    <>
      <h3 className="modal__title">New build</h3>
      <form className="modal__form" onInput={() => dispatch(hideModalError())}>
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
          <Button content="Cancel" modifiers={['secondary']} clickHandler={close} />
        </div>
        {errorMessage && <p className="message message_error">{errorMessage}</p>}
      </form>
    </>
  );
};
