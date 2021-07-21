import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getStateSettings, updateSettings } from '../../store/settingsSlice';
import { Button } from '../Button/Button';
import { HeaderTitle } from '../Header/HeaderTitle';
import { PageContent } from '../PageContent/PageContent';
import { PageHeader } from '../PageHeader/PageHeader';
import { TextInput } from '../TextInput/TextInput';
import { MESSAGES } from '../../assets/js/utils/constants/messages';

import useStyles from 'isomorphic-style-loader/useStyles';
import styles from './Settings.module.scss';

import { SettingsChangeData } from '../../api/types';

declare global {
  interface Window {
    performance: {
      measure: any;
    };
  }
}

interface SettingsPageProps {
  loadData: () => void; // TODO
}

export const SettingsPage = ({ loadData }: SettingsPageProps): JSX.Element => {
  const dispatch = useDispatch();
  const settings = useSelector(getStateSettings);
  const [message, setMessage] = useState({
    text: '',
    type: 'error',
  });
  const [errorInputs, setErrorInputs] = useState<string[]>([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  useStyles(styles);

  useEffect(() => {
    dispatch(loadData());
  }, [loadData, dispatch, settings]);

  const { repoName, buildCommand, mainBranch, period } = settings || {};

  const saveSettings = useCallback(
    (evt) => {
      evt.preventDefault();
      window.performance.mark('settings-submit-start');

      if (!isDataChanged) {
        setMessage({
          text: MESSAGES.ERROR.noChanges,
          type: 'error',
        });
        window.performance.clearMarks();
        return;
      }

      const requestBody: Partial<SettingsChangeData> = {};
      const formData = new FormData(evt.target.form);
      let isFormValid = true;
      let hasRepoChanged = false;

      for (const [key, value] of formData) {
        if (typeof value !== 'string') {
          continue;
        }

        if ((key === 'repoName' || key === 'buildCommand') && !value.trim()) {
          setMessage({
            text: MESSAGES.ERROR.required,
            type: 'error',
          });
          setErrorInputs((state) => [...state, key]);
          isFormValid = false;
        }

        if (key === 'repoName') {
          hasRepoChanged = value !== repoName;
        }

        if (key === 'period' && /\D/.test(value)) {
          setMessage({
            text: MESSAGES.ERROR.nonNumberPeriod,
            type: 'error',
          });
          setErrorInputs((state) => [...state, key]);
          isFormValid = false;
        }

        if (key === 'buildCommand' || key === 'repoName' || key === 'mainBranch') {
          requestBody[key] = value;
        } else if (key === 'period') {
          requestBody[key] = +value;
        }
      }

      if (!isFormValid) {
        window.performance.clearMarks();
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

      hasRepoChanged &&
        setMessage({
          text: `Copying your repo. Be patient...`,
          type: '',
        });

      window.performance.mark('settings-submit-end');
      window.perf_counter.send(
        'settingsSubmit',
        +window.performance
          .measure('settings-submit', 'settings-submit-start', 'settings-submit-end')
          .duration.toFixed(3)
      );

      // @ts-ignore
      dispatch(updateSettings(requestBody))
        // @ts-ignore
        .then((data) => {
          if (data.error) {
            throw data.error;
          }
          setMessage({
            text: MESSAGES.SUCCESS.send,
            type: 'success',
          });
        })
        .catch((error: Error) => {
          setMessage({
            text: error.message,
            type: 'error',
          });
        })
        .finally(() => {
          window.performance.mark('settings-response');
          window.perf_counter.send(
            'settingsChange',
            +window.performance
              .measure('settings-change', 'settings-submit-start', 'settings-response')
              .duration.toFixed(3)
          );
          window.performance.clearMarks();

          setIsDataChanged(false);
          setIsRequestSent(false);
        });
    },
    [dispatch, setMessage, setIsDataChanged, setIsRequestSent, isDataChanged]
  );

  const handleFormInput = useCallback(() => {
    setMessage({
      text: '',
      type: 'error',
    });
    setErrorInputs([]);
    setIsDataChanged(true);
  }, [setMessage, setErrorInputs, isDataChanged, setIsDataChanged]);

  return (
    <>
      <PageHeader
        renderHeaderLeft={() => <HeaderTitle text="School CI server" isDim />}
        renderHeaderRight={() => null}
      />
      <PageContent>
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
      </PageContent>
    </>
  );
};
