import requestBuild from '../db/requestBuild';
import isBuildSchemaValid from '../../validators/isBuildSchemaValid';
import GitExecutor from '../../utils/gitExecutor';
import { BadRequestApiError } from '../../validators/errors/ApiError';
import { REPO_PATH } from '../../config';

export default async (req, res, next) => {
  const gitExecutor = new GitExecutor(REPO_PATH);
  const commitHash = req.params.commitHash;
  const buildData = {
    commitHash,
  };

  try {
    buildData.authorName = await gitExecutor.getCommitAuthorName(commitHash).then((author) => author.trim());
    buildData.commitMessage = await gitExecutor.getCommitMessage(commitHash).then((message) => message.trim());
    buildData.branchName = await gitExecutor.getCommitBranch(commitHash);
    if (!isBuildSchemaValid(buildData)) {
      next(new BadRequestApiError('Could not find the commit data for the provided hash'));
    }

    const { data } = await requestBuild(buildData);

    return res.json(data);
  } catch (e) {
    next(e);
  }
};
