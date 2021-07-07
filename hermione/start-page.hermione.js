const delay = require('delay');
const { integrationTestId } = require('./intergrationTestId');
const { testOpenSettings } = require('./common-tests');
const { testPageHeader } = require('./common-tests');
const { testPageFooter } = require('./common-tests');

describe('Start screen', () => {
  if (integrationTestId !== '2') {
    return;
  }

  const url = `/`;

  testPageHeader(url);

  testPageFooter(url);

  it('Should render page content properly', async function () {
    const browser = this.browser;
    await browser.url(url);

    const content = await browser.$('main');
    await content.waitForExist();

    await delay(1000);
    await browser.assertView('content', 'main');
  });

  testOpenSettings(url, '.page-header .button[href="/settings"]', 1);
  testOpenSettings(url, '.start-screen .button[href="/settings"]', 2);
});
