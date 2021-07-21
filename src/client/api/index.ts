import axios from 'axios';
import { INTEGRATION_TEST_PARAM, SERVER_URL } from '../../server/config';
import { SettingsChangeData } from './types';

export default class Api {
  integrationTest: string;

  constructor(integrationTest: string) {
    this.integrationTest = integrationTest;
  }

  getSettings() {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/settings`));
  }

  getBuilds() {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/builds`));
  }

  getBuild(id: string) {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/builds/${id}`));
  }

  getBuildLogs(id: string) {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/builds/${id}/logs`));
  }

  changeSettings(data: SettingsChangeData) {
    return axios.post(this._decorateUrl(`${SERVER_URL}/api/settings`), data);
  }

  addBuild(commitHash: string) {
    return axios.post(this._decorateUrl(`${SERVER_URL}/api/builds/${commitHash}`));
  }

  _decorateUrl(url: string): string {
    if (!this.integrationTest) {
      return url;
    }
    const paramsDelimiter = url.includes('?') ? '&' : '?';
    return `${url}${paramsDelimiter}${INTEGRATION_TEST_PARAM}=${this.integrationTest}`;
  }
}
