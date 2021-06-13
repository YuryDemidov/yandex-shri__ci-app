module.exports = (config) => {
  return (
    config &&
    config.repoName &&
    typeof config.repoName === 'string' &&
    config.buildCommand &&
    typeof config.buildCommand === 'string' &&
    config.mainBranch &&
    typeof config.mainBranch === 'string' &&
    config.period &&
    typeof config.period === 'number'
  );
};
