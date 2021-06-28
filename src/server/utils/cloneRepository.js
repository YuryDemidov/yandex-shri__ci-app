import fs from 'fs';
import { spawn } from 'child_process';
import { GitActionError } from '../validators/errors/ApiError';

export default (repoName) => {
  return new Promise((resolve, reject) => {
    const repoPath = 'src/server/repository';
    const gitCloneProcess = spawn('git', ['clone', `git@github.com:${repoName}.git`, repoPath]);

    gitCloneProcess.on('spawn', () => {
      fs.existsSync(repoPath) && fs.rmSync(repoPath, { recursive: true });
    });

    gitCloneProcess.on('error', (error) => reject(new GitActionError(`Repository copying error: ${error}`)));

    gitCloneProcess.on('close', (code) => {
      console.log(`Repository copying finished with code ${code}`);
      if (!code) {
        resolve();
      }
      reject(new GitActionError(`Repository copying error with code: ${code}`));
    });
  });
};
