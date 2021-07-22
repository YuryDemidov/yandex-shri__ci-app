import { Request } from 'express';

import getBuildDetails from '../db/getBuildDetails';
import { INTEGRATION_TEST_PARAM } from '../../config';
import buildDataStub from '../../../../hermione/stubs/buildDataStub';
import { DbBuildModel } from '../../../client/api/types';

export default async (req: Request): Promise<{ data: DbBuildModel }> => {
  if (req.query[INTEGRATION_TEST_PARAM]) {
    return buildDataStub;
  }
  const buildId = req.params.buildId;
  const dbResponse = await getBuildDetails(buildId);
  return dbResponse.data;
};
