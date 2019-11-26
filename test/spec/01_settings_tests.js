const SettingsPage = require('../pageobjects/settings_page');
const { testWithSpectron } = require('vue-cli-plugin-electron-builder');
const shared = require('../shared/shared');

describe('settings app scenarios', async function () {
    this.timeout(60000);
    // before(shared.appStart(page));
    before(async () => {
        page = new SettingsPage();
        const testbed = await testWithSpectron();
        page.app = testbed.app;
        page.stopServe = testbed.stopServe;
    });

    it('submit etcd values test', async () => {
        await page.clickEtcdBtn();
        await page.writeEndpoint('http://hubphq-icon-sandbox-d001.icellmobilsoft.hu');
        await page.clickSubmitBtn();
    });


    //etcd-ben ki van kapcsolva!
    /*it('submit auth values test', async () => {
        await page.clickAuthBtn();
        await page.writeUsername();
        await page.writePassword();
    });*/

    it('check test connection', async () => {
        await page.clickTestConnectionBtn();
    });

    it('change language', async () => {
        let language = 'Hungarian';
        await page.clickMiscBtn();
        await page.selectLanguage(language);
        await page.clickSubmitBtn();
        await page.isSelectedLanguage(language);
    });
    // after(shared.appEnd(page));
    after(async () => {
        page.stopServe();
    })
});

