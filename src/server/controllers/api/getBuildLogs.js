import getBuildLog from '../db/getBuildLog';

export default async (req) => {
  const urlParts = req.originalUrl.split(`/`);
  const buildId = urlParts[urlParts.length - 2];
  const dbResponse = await getBuildLog(buildId);
  return dbResponse.data;
};
