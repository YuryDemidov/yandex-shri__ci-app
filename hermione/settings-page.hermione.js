const delay = require('delay');
const { integrationTestId } = require('./intergrationTestId');
const { testPageHeader } = require('./common-tests');
const { testPageFooter } = require('./common-tests');

describe('Settings page', () => {
  if (integrationTestId !== '1') {
    return;
  }

  const url = '/settings';

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

  it('Should open builds list page after click on "Cancel" button', async function () {
    const browser = this.browser;
    await browser.url(url);

    await (await browser.$('.button[href="/"]')).click();

    const buildsPage = await browser.$('.builds-list');
    await buildsPage.waitForExist();
  });
});
