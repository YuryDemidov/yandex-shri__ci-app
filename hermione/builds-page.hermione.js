const delay = require('delay');
const { integrationTestId } = require('./intergrationTestId');
const { testOpenSettings } = require('./common-tests');
const { testPageHeader } = require('./common-tests');
const { testPageFooter } = require('./common-tests');

describe('Index page with builds list', () => {
  if (integrationTestId !== '1') {
    return;
  }

  const url = '/';

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

  it('Should render modal form after click on "Run build" button', async function () {
    const browser = this.browser;
    await browser.url(url);

    await (await browser.$('.button[aria-label="Run Build"]')).click();

    const modal = await browser.$('.new-build-modal');
    await modal.waitForExist();
  });

  testOpenSettings(url, '.button[href="/settings"]');

  it('Should open build page after click on build from list', async function () {
    const browser = this.browser;
    await browser.url(url);

    await (await browser.$('.build-card')).click();

    const buildPage = await browser.$('.build-logs');
    await buildPage.waitForExist();
  });
});
