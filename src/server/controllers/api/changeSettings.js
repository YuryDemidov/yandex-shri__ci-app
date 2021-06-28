import getConfig from '../db/getConfig';
import changeConfig from '../db/changeConfig';
import isConfigSchemaValid from '../../validators/middlewares/isConfigSchemaValid';
import cloneRepository from '../../utils/cloneRepository';
import { BadRequestApiError } from '../../validators/errors/ApiError';

export default async (req, res, next) => {
  try {
    if (!isConfigSchemaValid(req.body)) {
      throw new BadRequestApiError("Request body doesn't match the API schema");
    }
    const dbResponse = await getConfig();
    const previousConfig = dbResponse.data;

    if (!previousConfig.data || previousConfig.data.repoName !== req.body.repoName) {
      await cloneRepository(req.body.repoName);
    }
    await changeConfig(req.body);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
