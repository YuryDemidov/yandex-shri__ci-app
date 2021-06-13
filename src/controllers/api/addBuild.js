const requestBuild = require('../db/requestBuild');
const isBuildSchemaValid = require('../../validators/middlewares/isBuildSchemaValid');
const { getCommitBranch, getCommitMessage, getCommitAuthorName } = require('../../utils/gitCommands');
const { BadRequestApiError } = require('../../validators/errors/ApiError');

module.exports = async (req, res, next) => {
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
