export default (config) => {
  return (
    config &&
    config.repoName &&
    typeof config.repoName === 'string' &&
    config.buildCommand &&
    typeof config.buildCommand === 'string'
  );
};
