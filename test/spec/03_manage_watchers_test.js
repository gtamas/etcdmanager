const ManageWatchersPage = require('../pageobjects/manage_watchers_page');
const SettingsPage = require('../pageobjects/settings_page');
const assert = require('assert');
const shared = require('../shared/shared');
const Watcher = require('../pageobjects/user/watcher');

describe('manage watchers app scenarios', function() {
    this.timeout(10000);
    let watcher = new Watcher();
    const page = new ManageWatchersPage();
    const settingsPage = new SettingsPage(page.app);

    before(shared.appStart(page));

    after(shared.appEnd(page));

    it('open watchers manage list', async () => {
        await settingsPage.clickEtcdBtn();
        await settingsPage.writeEndpoint(
            process.env.ETCDMANAGER_URL || '127.0.0.1'
        );
        await settingsPage.clickSubmitBtn();
        await page.clickWatchersMenu();
        await page.findListTitle();
    });

    it('add new watcher', async () => { 
        await page.clickAddBtn();
        await page.writeName(watcher.watcher_name);
        await page.writeKey(watcher.key);
        await page.clickActionsKeyBtn();
        await page.clickActionsAddBtn();
        await page.filterData(watcher.key);
        await page.isNewRowExists(watcher.watcher_name, watcher.key);
    });

    it('modify watcher', async () => {
       await page.clickEditWatcher(watcher.watcher_name);
       await page.writeKey(`ch${watcher.key}`);
       await page.clickSubmitBtn();
    });

    it('purge watchers', async () => {
        await page.filterData(watcher.key);
        await page.clickPurgeBtn();
        await page.attentionRemove();
    });
});