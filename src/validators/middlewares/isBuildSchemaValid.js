module.exports = (build) => {
  return (
    build &&
    build.commitMessage &&
    typeof build.commitMessage === 'string' &&
    build.commitHash &&
    typeof build.commitHash === 'string' &&
    build.branchName &&
    typeof build.branchName === 'string' &&
    build.authorName &&
    typeof build.authorName === 'string'
  );
};
