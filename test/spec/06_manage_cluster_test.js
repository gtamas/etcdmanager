const shared = require('../shared/shared');
const ManageClusterPage = require('../pageobjects/manage_cluster_page');
const SettingsPage = require('../pageobjects/settings_page');

describe('manage cluster app scenarios', function() {
    this.timeout(10000);
    const page = new ManageClusterPage();
    const settingsPage = new SettingsPage(page.app);

    before(shared.appStart(page));

    after(shared.appEnd(page));

    it('open manage cluster page', async () => {
        await settingsPage.clickEtcdBtn();
        await settingsPage.writeEndpoint(process.env.ETCDMANAGER_URL || '127.0.0.1');
        await settingsPage.clickSubmitBtn();
        await page.clickClusterMenu();
    });

    it('check member health', async () =>{
        await page.clickHealthClusterIcon();
    });

    it('check info', async () => {
        await page.clickInfoIcon();
        await page.clickCloseBtn();
    });
});
