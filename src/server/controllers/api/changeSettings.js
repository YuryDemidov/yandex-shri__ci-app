import getConfig from '../db/getConfig';
import changeConfig from '../db/changeConfig';
import isConfigSchemaValid from '../../validators/middlewares/isConfigSchemaValid';
import GitExecutor from '../../utils/gitExecutor';
import { BadRequestApiError } from '../../validators/errors/ApiError';
import { REPO_PATH } from '../../config';

export default async (req, res, next) => {
  try {
    if (!isConfigSchemaValid(req.body)) {
      next(new BadRequestApiError("Request body doesn't match the API schema"));
    }
    const dbResponse = await getConfig();
    const previousConfig = dbResponse.data;

    if (!previousConfig.data || previousConfig.data.repoName !== req.body.repoName) {
      const gitExecutor = new GitExecutor(REPO_PATH);
      await gitExecutor.cloneRepository(req.body.repoName);
    }
    await changeConfig(req.body);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
