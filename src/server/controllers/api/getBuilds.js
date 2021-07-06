import getBuildsList from '../db/getBuildsList';

import { INTEGRATION_TEST_PARAM } from '../../config';
import buildsListStub from '../../../../hermione/stubs/buildsListStub';

export default async (req) => {
  if (req.query[INTEGRATION_TEST_PARAM]) {
    return buildsListStub;
  }
  const dbResponse = await getBuildsList();
  return dbResponse.data;
};
