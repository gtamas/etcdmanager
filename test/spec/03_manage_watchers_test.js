const ManageWatchersPage = require('../pageobjects/manage_watchers_page');
const SettingsPage = require('../pageobjects/settings_page');
const assert = require('assert');
const shared = require('../shared/shared');

describe('manage watchers app scenarios', function() {
    this.timeout(10000);
    const page = new ManageWatchersPage();
    const settingsPage = new SettingsPage(page.app);

    before(shared.appStart(page));

    after(shared.appEnd(page));

    it('open watchers manage list', async () => {
        await settingsPage.clickEtcdBtn();
        await settingsPage.writeEndpoint(
            'http://hubphq-icon-sandbox-d001.icellmobilsoft.hu'
        );
        await settingsPage.clickSubmitBtn();
        await page.clickWatchersMenu();
        await page.findListTitle();
    });

    it('add new watcher', async () => {
        await page.clickAddBtn();

        const randomName = await page.writeName('testName');
        assert.equal(randomName, 'testName');

        const randomKey = await page.writeKey('testkey');
        assert.equal(randomKey, 'testkey');

        await page.clickActionsKeyBtn();
        await page.clickActionsAddBtn();
        await page.filterData(randomKey);
        await page.isNewRowExists(randomName, randomKey);
    });

    /*it('modify watcher', async () => {
        await page.clickEditWatcher();

       const randomValue = await page.writeName('changedName');
       assert.equal(randomValue, 'changedName');

       //await page.clickSubmitBtn();
        //await page.clickEditorCloseBtn();
        //await page.isNewRowExists('testKey', 'changedValue');
    });

    it('delete key value pair', async () => {
         await page.openDeleteDialog();
         await page.clickDeleteDialogOk();
         //await page.isNewRowExists();
    });*/
});
