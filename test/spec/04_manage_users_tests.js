const ManageUsersPage = require('../pageobjects/manage_users_page');
const SettingsPage = require('../pageobjects/settings_page');
const assert = require('assert');
const shared = require('../shared/shared');

describe('manage users app scenarios', function() {
    this.timeout(10000);
    const page = new ManageUsersPage();
    const settingsPage = new SettingsPage(page.app);

    before(shared.appStart(page));

    after(shared.appEnd(page));

    it('open users manage list', async () => {
        await settingsPage.clickEtcdBtn();
        await settingsPage.writeEndpoint(
            'http://hubphq-icon-sandbox-d001.icellmobilsoft.hu'
        );
        await settingsPage.clickSubmitBtn();
        await page.clickUsersMenu();
        await page.findListTitle();
    });

    it('add new user', async () =>{
        await page.clickAddUserBtn();
        await page.writeName();
        await page.writePassword();
        await page.clickSubmitBtn();
    });

    it('modify user', async () => {
        await page.searchUser();
        await page.clickEditBtn();
        await page.writePassword();
        await page.clickSubmitBtn();
    });


    it('delete user', async () => {
        await page.searchUser();
        await page.clickRemoveBtn();
        await page.remove()
    });
    
});