import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../App';
import { Button } from '../Button/Button';
import { TextInput } from '../TextInput/TextInput';
import { MESSAGES } from '../../assets/js/utils/messages';
import { REGEXPS } from '../../assets/js/utils/regexps';

import '../../assets/css/components/settings.css';

export const SettingsContent = () => {
  const { repoName, buildCommand, mainBranch, period } = useContext(AppContext);

  const [message, setMessage] = useState({
    text: '',
    type: 'error',
  });
  const [errorInputs, setErrorInputs] = useState([]);

  const saveSettings = (evt) => {
    evt.preventDefault();
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

    setMessage({
      text: MESSAGES.SUCCESS.send,
      type: 'success',
    });
    console.log(requestBody);
  };

  const hideErrors = () => {
    setMessage({
      text: '',
      type: 'error',
    });
    setErrorInputs([]);
  };

  return (
    <div className="settings">
      <h2 className="settings__title">Settings</h2>
      <p className="settings__description">Configure repository connection and synchronization settings.</p>
      <form className="settings__form" action="#" method="post" onInput={hideErrors}>
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
          <Button content="Save" modifiers={['primary']} type="submit" clickHandler={saveSettings} />
          <Link to="/" className="button button_secondary">
            <span className="button__content">Cancel</span>
          </Link>
        </div>
        {message.text && <p className={`message message_${message.type}`}>{message.text}</p>}
      </form>
    </div>
  );
};
