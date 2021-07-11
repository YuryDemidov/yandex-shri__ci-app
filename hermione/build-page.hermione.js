const delay = require('delay');
const { integrationTestId } = require('./intergrationTestId');
const { testOpenSettings } = require('./common-tests');
const { testPageHeader } = require('./common-tests');
const { testPageFooter } = require('./common-tests');

describe('Single build page', () => {
  if (integrationTestId !== '1') {
    return;
  }

  const url = `/build/200c796f-6df2-4070-8a81-1516b0c1065f`;

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

  testOpenSettings(url, '.button[href="/settings"]');
});
