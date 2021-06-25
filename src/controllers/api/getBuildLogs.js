const getBuildLog = require('../db/getBuildLog');

module.exports = async (req, res) => {
  const urlParts = req.originalUrl.split(`/`);
  const buildId = urlParts[urlParts.length - 2];

  const dbResponse = await getBuildLog(buildId);

  return res.json(dbResponse.data);
};
