import getConfig from '../db/getConfig';

import { INTEGRATION_TEST_PARAM } from '../../config';
import settingsStub from '../../../../hermione/stubs/settingsStub';
import emptySettingsStub from '../../../../hermione/stubs/emptySettingsStub';

export default async (req) => {
  switch (req.query[INTEGRATION_TEST_PARAM]) {
    case '1':
      return settingsStub;
    case '2':
      return emptySettingsStub;
  }
  const dbResponse = await getConfig();
  return dbResponse.data;
};
