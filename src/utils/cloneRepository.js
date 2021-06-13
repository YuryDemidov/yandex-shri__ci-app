const { spawn } = require('child_process');

module.exports = (repoName) => {
  const gitCloneProcess = spawn('git', ['clone', repoName, 'src/repository']);

  gitCloneProcess.on('close', (code) => {
    console.log(`Repository copying finished with code ${code}`);
  });
};
