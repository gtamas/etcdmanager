const ManageRolesPage = require('../pageobjects/manage_roles_page');
const SettingsPage = require('../pageobjects/settings_page');
const shared = require('../shared/shared');

describe('manage roles app scenarios', function() {
    this.timeout(10000);
    const page = new ManageRolesPage();
    const settingsPage = new SettingsPage(page.app);

    before(shared.appStart(page));

    after(shared.appEnd(page));

    it('open roles manage list', async () => {
        await settingsPage.clickEtcdBtn();
        await settingsPage.writeEndpoint(
            'http://hubphq-icon-sandbox-d001.icellmobilsoft.hu'
        );
        await settingsPage.clickSubmitBtn();
        await page.clickRolesMenu();
        await page.findListTitle();
    });

    it('add new role', async () => {
        await page.clickAddRoleBtn();
        await page.writeName();
        await page.setPermission();
    });
    
});