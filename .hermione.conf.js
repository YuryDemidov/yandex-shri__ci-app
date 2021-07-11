const { integrationTestId } = require('./hermione/intergrationTestId');

module.exports = {
  baseUrl: 'http://localhost:8080/',
  gridUrl: 'http://localhost:4444/wd/hub',

  sets: {
    all: {
      files: ['hermione/**/*.hermione.js'],
    },
  },
  browsers: {
    chrome: {
      antialiasingTolerance: 5,
      screenshotDelay: 1000,
      retry: 1,
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'hermione/html-reporter',
    },
    'selenium-standalone-runner': true,
    'url-decorator': {
      query: {
        integration_test: integrationTestId,
      },
    },
  },
};
