var SettingsPage = require('../pageobjects/settings_page');

var page;

describe('settings app scenarios', function() {
    this.timeout(10000);
    page = new SettingsPage();

    before(async () => {
        await page.app.start();
    });

    after(() => page.app.stop());

    it('submit etcd values test', async () => {
        page.clickEtcdBtn();
        page.writeEndpoint('teszt');
        page.clickSubmitBtn();
    });

    it('submit auth values test', async () => {
        page.clickAuthBtn();
        page.writeUsername('teszt');
        page.writePassword('teszt');
        page.clickNextBtn();
    });
});
