import getConfig from '../db/getConfig';

export default async () => {
  const dbResponse = await getConfig();
  return dbResponse.data;
};
