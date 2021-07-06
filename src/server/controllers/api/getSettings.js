import getConfig from '../db/getConfig';

import { INTEGRATION_TEST_PARAM } from '../../config';
import settingsStub from '../../../../hermione/stubs/settingsStub';

export default async (req) => {
  if (req.query[INTEGRATION_TEST_PARAM]) {
    return settingsStub;
  }
  const dbResponse = await getConfig();
  return dbResponse.data;
};
