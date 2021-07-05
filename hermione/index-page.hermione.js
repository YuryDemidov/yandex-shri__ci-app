const delay = require('delay');

describe('Index page with settings', () => {
  it('Should render modal form after click on "Run build" button', async function () {
    const browser = this.browser;

    await browser.url('/');

    await (await browser.$('.button[aria-label="Run Build"]')).click();

    const modal = await browser.$('.new-build-modal');
    await modal.waitForExist();
  });

  it('Should render header properly', async function () {
    const browser = this.browser;

    await browser.url('/');

    await delay(2000);

    await browser.assertView('header', '.page-header', {
      ignoreElements: '.page-header__title',
    });
  });

  it('Should render footer properly', async function () {
    const browser = this.browser;

    await browser.url('/');

    await delay(2000);

    await browser.assertView('footer', '.page-footer');
  });
});
