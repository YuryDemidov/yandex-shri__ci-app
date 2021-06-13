const getConfig = require('../db/getConfig');
const changeConfig = require('../db/changeConfig');
const isConfigSchemaValid = require('../../validators/middlewares/isConfigSchemaValid');
const cloneRepository = require('../../utils/cloneRepository');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
  try {
    if (!isConfigSchemaValid(req.body)) {
      throw new BadRequestApiError("Request body doesn't match the API schema");
    }

    const dbResponse = await getConfig();
    const previousConfig = dbResponse.data;
    await changeConfig(req.body);

    if (!previousConfig.data || previousConfig.data.repoName !== req.body.repoName) {
      cloneRepository(req.body.repoName);
    }
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
