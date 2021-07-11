const integrationTestArg = process.argv.find((arg) => arg.includes('integration-test'));
module.exports.integrationTestId = integrationTestArg
  ? integrationTestArg.substring(integrationTestArg.indexOf('=') + 1)
  : '1';
