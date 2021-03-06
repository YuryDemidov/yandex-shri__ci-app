import fs from 'fs';
import { spawn } from 'child_process';
import streamToString from './streamToString';
import { GitActionError } from '../validators/errors/ApiError';

export default class GitExecutor {
  gitDir: string;

  constructor(gitDir: string) {
    this.gitDir = gitDir;
  }

  cloneRepository(repoName: string) {
    return new Promise<void>((resolve, reject) => {
      fs.existsSync(this.gitDir) && fs.rmSync(this.gitDir, { recursive: true });
      const gitCloneProcess = spawn('git', ['clone', `git@github.com:${repoName}.git`, this.gitDir]);

      gitCloneProcess.on('error', (error) => {
        reject(new GitActionError(`Repository copying error: ${error}`));
      });

      gitCloneProcess.on('close', (code) => {
        console.log(`Repository copying finished with code ${code}`);
        if (!code) {
          resolve();
        }
        reject(new GitActionError(`Repository copying error with code ${code}`));
      });
    });
  }

  async getCommitAuthorName(commitHash: string): Promise<string> {
    const stream = spawn('git', [
      `--git-dir=${this.gitDir}/.git`,
      'show',
      '--quiet',
      '--format=%an',
      commitHash,
    ]).stdout;
    return await streamToString(stream);
  }

  async getCommitMessage(commitHash: string): Promise<string> {
    const stream = spawn('git', [
      `--git-dir=${this.gitDir}/.git`,
      'show',
      '--quiet',
      '--format=%s',
      '-n',
      '1',
      commitHash,
    ]).stdout;
    return await streamToString(stream);
  }

  async getCommitBranch(commitHash: string): Promise<string> {
    const stream = spawn('git', [`--git-dir=${this.gitDir}/.git`, 'branch', '-a', '--contains', commitHash]).stdout;
    const branches = await streamToString(stream);
    return branches.split('\n')[0].replace(/^\*\s+/, '');
  }
}
