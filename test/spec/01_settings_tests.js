const SettingsPage = require('../pageobjects/settings_page');
const shared = require('../shared/shared');

describe('settings app scenarios', function() {
    this.timeout(10000);
    const page = new SettingsPage();

    before(shared.appStart(page));

    after(shared.appEnd(page));

    it('submit etcd values test', async () => {
        await page.clickEtcdBtn();
        await page.writeEndpoint('127.0.0.1');
        await page.clickSubmitBtn();
    });

    // it('submit auth values test', async () => {
    //     page.clickAuthBtn();
    //     page.writeUsername('teszt');
    //     page.writePassword('teszt');
    //     page.clickNextBtn();
    // });
});
