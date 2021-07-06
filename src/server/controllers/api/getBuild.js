import getBuildDetails from '../db/getBuildDetails';

export default async (req) => {
  const buildId = req.params.buildId;
  const dbResponse = await getBuildDetails(buildId);
  return dbResponse.data;
};
