const { spawn } = require('child_process');
const streamToString = require('./streamToString');

exports.getCommitAuthorName = async (commitHash) => {
  const stream = spawn('git', ['--git-dir=src/repository/.git', 'show', '--quiet', '--format=%an', commitHash]).stdout;
  return await streamToString(stream);
};

exports.getCommitMessage = async (commitHash) => {
  const stream = spawn('git', [
    '--git-dir=src/repository/.git',
    'show',
    '--quiet',
    '--format=%B',
    '-n',
    '1',
    commitHash,
  ]).stdout;
  return await streamToString(stream);
};

exports.getCommitBranch = async (commitHash) => {
  const stream = spawn('git', ['--git-dir=src/repository/.git', 'branch', '-a', '--contains', commitHash]).stdout;
  const branches = await streamToString(stream);
  return branches.split('\n')[0].replace(/^\*\s+/, '');
};
