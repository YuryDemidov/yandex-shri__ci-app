import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getStateSettings, updateSettings } from '../../store/settingsSlice';
import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import { MESSAGES } from '../../assets/js/utils/messages';
import { REGEXPS } from '../../assets/js/utils/regexps';

export const SettingsContent = ({ loadData }) => {
  const dispatch = useDispatch();
  const settings = useSelector(getStateSettings);
  const [message, setMessage] = useState({
    text: '',
    type: 'error',
  });
  const [errorInputs, setErrorInputs] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  useEffect(() => {
    dispatch(loadData());
  }, [loadData, dispatch, settings]);

  const { repoName, buildCommand, mainBranch, period } = settings || {};

  const saveSettings = (evt) => {
    evt.preventDefault();

    if (!isDataChanged) {
      setMessage({
        text: MESSAGES.ERROR.noChanges,
        type: 'error',
      });
      return;
    }

    const requestBody = {};
    const formData = new FormData(evt.target.form);
    let isFormValid = true;

    for (let [key, value] of formData) {
      if ((key === 'repoName' || key === 'buildCommand') && !value.trim()) {
        setMessage({
          text: MESSAGES.ERROR.required,
          type: 'error',
        });
        setErrorInputs((state) => [...state, key]);
        isFormValid = false;
      }

      if (key === 'period' && REGEXPS.nonNumber.test(value)) {
        setMessage({
          text: MESSAGES.ERROR.nonNumberPeriod,
          type: 'error',
        });
        setErrorInputs((state) => [...state, key]);
        isFormValid = false;
      }

      requestBody[key] = value;
    }

    if (!isFormValid) {
      return;
    }

    // Without this defaults server responds with validation error with 400 status
    if (!requestBody.mainBranch) {
      requestBody.mainBranch = 'master';
    }
    if (!requestBody.period) {
      requestBody.period = 60;
    }

    setIsRequestSent(true);

    dispatch(updateSettings(requestBody))
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        setMessage({
          text: MESSAGES.SUCCESS.send,
          type: 'success',
        });
      })
      .catch((error) => {
        setMessage({
          text: error.message,
          type: 'error',
        });
      })
      .finally(() => {
        setIsDataChanged(false);
        setIsRequestSent(false);
      });
  };

  const handleFormInput = () => {
    setMessage({
      text: '',
      type: 'error',
    });
    setErrorInputs([]);
    setIsDataChanged(true);
  };

  return (
    <div className="settings">
      <h2 className="settings__title">Settings</h2>
      <p className="settings__description">Configure repository connection and synchronization settings.</p>
      <form className="settings__form" action="#" method="post" onInput={handleFormInput}>
        <TextInput
          id="repoName"
          className={errorInputs.includes('repoName') ? 'text-input_invalid' : ''}
          name="repoName"
          initialValue={repoName}
          placeholder="user-name/repo-name"
          labelTextBefore="GitHub repository"
          isRequired
          hasClearButton
        />
        <TextInput
          id="buildCommand"
          className={errorInputs.includes('buildCommand') ? 'text-input_invalid' : ''}
          name="buildCommand"
          initialValue={buildCommand}
          placeholder="npm run build"
          labelTextBefore="Build command"
          isRequired
          hasClearButton
        />
        <TextInput
          id="mainBranch"
          name="mainBranch"
          initialValue={mainBranch}
          placeholder="branch-name"
          labelTextBefore="Main branch"
          hasClearButton
        />
        <TextInput
          id="period"
          name="period"
          initialValue={period}
          type="number"
          className={`text-input_inline${errorInputs.includes('period') ? ' text-input_invalid' : ''}`}
          placeholder="10"
          labelTextBefore="Synchronize every"
          labelTextAfter="minutes"
        />
        <div className="settings__buttons">
          <Button
            content="Save"
            modifiers={['primary']}
            type="submit"
            clickHandler={saveSettings}
            disabled={isRequestSent}
          />
          <Link to="/" className={`button button_secondary${isRequestSent ? ' button_disabled' : ''}`}>
            <span className="button__content">Cancel</span>
          </Link>
        </div>
        {message.text && <p className={`message message_${message.type}`}>{message.text}</p>}
      </form>
    </div>
  );
};

SettingsContent.propTypes = {
  loadData: PropTypes.func.isRequired,
};
