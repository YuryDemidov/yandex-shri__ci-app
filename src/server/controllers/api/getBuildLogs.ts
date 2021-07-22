import { Request } from 'express';

import getBuildLog from '../db/getBuildLog';
import { INTEGRATION_TEST_PARAM } from '../../config';
import buildLogStub from '../../../../hermione/stubs/buildLogStub';
import { BuildLog } from '../../../client/api/types';

export default async (req: Request): Promise<BuildLog> => {
  if (req.query[INTEGRATION_TEST_PARAM]) {
    return buildLogStub;
  }
  const buildId = req.params.buildId;
  const dbResponse = await getBuildLog(buildId);
  return dbResponse.data;
};
