import getBuildDetails from '../db/getBuildDetails';

export default async (req) => {
  const buildId = req.originalUrl.split('/').pop();
  const dbResponse = await getBuildDetails(buildId);
  return dbResponse.data;
};
