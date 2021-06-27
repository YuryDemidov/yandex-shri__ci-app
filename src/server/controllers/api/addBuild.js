import requestBuild from '../db/requestBuild';
import isBuildSchemaValid from '../../validators/middlewares/isBuildSchemaValid';
import { getCommitBranch, getCommitMessage, getCommitAuthorName } from '../../utils/gitCommands';
import { BadRequestApiError } from '../../validators/errors/ApiError';

export default async (req, res, next) => {
  const commitHash = req.originalUrl.split(`/`).pop();
  const buildData = {
    commitHash,
  };

  try {
    buildData.authorName = await getCommitAuthorName(commitHash).then((author) => author.trim());
    buildData.commitMessage = await getCommitMessage(commitHash).then((message) => message.trim());
    buildData.branchName = await getCommitBranch(commitHash);
    if (!isBuildSchemaValid(buildData)) {
      throw new BadRequestApiError("Request body doesn't match the API schema");
    }

    await requestBuild(buildData);

    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
