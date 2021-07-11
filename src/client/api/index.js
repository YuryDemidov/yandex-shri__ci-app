import axios from 'axios';
import { INTEGRATION_TEST_PARAM, SERVER_URL } from '../../server/config';

export default class Api {
  constructor(integrationTest) {
    this.integrationTest = integrationTest;
  }

  getSettings() {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/settings`));
  }

  getBuilds() {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/builds`));
  }

  getBuild(id) {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/builds/${id}`));
  }

  getBuildLogs(id) {
    return axios.get(this._decorateUrl(`${SERVER_URL}/api/builds/${id}/logs`));
  }

  changeSettings(data) {
    return axios.post(this._decorateUrl(`${SERVER_URL}/api/settings`), data);
  }

  addBuild(commitHash) {
    return axios.post(this._decorateUrl(`${SERVER_URL}/api/builds/${commitHash}`));
  }

  _decorateUrl(url) {
    if (!this.integrationTest) {
      return url;
    }
    const paramsDelimiter = url.includes('?') ? '&' : '?';
    return `${url}${paramsDelimiter}${INTEGRATION_TEST_PARAM}=${this.integrationTest}`;
  }
}
