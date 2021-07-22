import { NextFunction, Request, Response } from 'express';

import requestBuild from '../db/requestBuild';
import isBuildSchemaValid from '../../validators/isBuildSchemaValid';
import GitExecutor from '../../utils/gitExecutor';
import { BadRequestApiError } from '../../validators/errors/ApiError';
import { REPO_PATH } from '../../config';
import { BuildParamsRequestData } from '../../../client/api/types';

export default async (req: Request, res: Response, next: NextFunction) => {
  const gitExecutor = new GitExecutor(REPO_PATH);
  const commitHash = req.params.commitHash;
  const buildData = {
    commitHash,
  } as BuildParamsRequestData;

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
