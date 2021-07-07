const delay = require('delay');

module.exports.testPageFooter = (url) =>
  it('Should render footer properly', async function () {
    const browser = this.browser;
    await browser.url(url);

    const footer = await browser.$('.page-footer');
    await footer.waitForExist();

    await delay(1000);
    await browser.assertView('footer', '.page-footer', {
      screenshotDelay: 1000,
    });
  });

module.exports.testPageHeader = (url) =>
  it('Should render header properly', async function () {
    const browser = this.browser;
    await browser.url(url);

    const header = await browser.$('.page-header');
    await header.waitForExist();

    await browser.assertView('header', '.page-header', {
      screenshotDelay: 1000,
    });
  });

module.exports.testOpenSettings = (url, buttonSelector) =>
  it('Should open settings page after "Settings" button click', async function () {
    const browser = this.browser;
    await browser.url(url);

    await (await browser.$(buttonSelector)).click();

    const settingsPage = await browser.$('.settings');
    await settingsPage.waitForExist();
    await delay(3000);
  });
