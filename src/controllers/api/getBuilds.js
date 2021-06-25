const getBuildsList = require('../db/getBuildsList');

module.exports = async (req, res) => {
  const dbResponse = await getBuildsList();
  return res.json(dbResponse.data);
};
