import getBuildsList from '../db/getBuildsList';

export default async () => {
  const dbResponse = await getBuildsList();
  return dbResponse.data;
};
