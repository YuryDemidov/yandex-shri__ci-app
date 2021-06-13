const getBuildDetails = require('../db/getBuildDetails');

module.exports = async (req, res, next) => {
  const buildId = req.originalUrl.split('/').pop();

  const dbResponse = await getBuildDetails(buildId);

  return res.json(dbResponse);
};
