const ManageWatchersPage = require('../../pageobjects/manage_watchers_page');
const Watcher = require('../../pageobjects/user/watcher');

module.exports = p => {
    
    describe('manage watchers app scenarios', function() {

    this.timeout(20000);
    let watcher = new Watcher();
    const page = new ManageWatchersPage(p.app);

    it('open watchers manage list', async () => {
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
})};