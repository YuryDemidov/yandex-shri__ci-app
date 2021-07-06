import getBuildLog from '../db/getBuildLog';

export default async (req) => {
  const buildId = req.params.buildId;
  const dbResponse = await getBuildLog(buildId);
  return dbResponse.data;
};
