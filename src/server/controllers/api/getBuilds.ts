import { Request } from 'express';

import getBuildsList from '../db/getBuildsList';
import { INTEGRATION_TEST_PARAM } from '../../config';
import buildsListStub from '../../../../hermione/stubs/buildsListStub';
import { DbBuildModel } from '../../../client/api/types';

export default async (req: Request): Promise<{ data: DbBuildModel[] }> => {
  if (req.query[INTEGRATION_TEST_PARAM]) {
    return buildsListStub;
  }
  const dbResponse = await getBuildsList();
  return dbResponse.data;
};
