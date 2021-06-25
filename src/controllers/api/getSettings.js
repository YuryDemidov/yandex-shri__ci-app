const getConfig = require('../db/getConfig');

module.exports = async (req, res) => {
  const dbResponse = await getConfig();
  return res.json(dbResponse.data);
};
