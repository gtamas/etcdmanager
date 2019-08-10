var ManageKeysPage = require('../pageobjects/manage_keys_page');
const assert = require('assert');

var page;

describe('manage keys app scenarios', function() {
    this.timeout(10000);
    page = new ManageKeysPage();

    before(async () => {
        await page.app.start();
    });

    after(() => page.app.stop());

    it('open manage key editor', async () => {
        page.clickEtcdBtn();
        const endpointValue = await page.writeEndpoint('test');
        assert.equal(endpointValue, 'test');
        // Check if manage keys button exist and clickable
        const manageKeysButton = await page.clickManageKeys();
    });

    it('add new key value pair', async () => {
        page.clickAddBtn();
        const keyValue = await page.writeKey('test2');
        assert.equal(keyValue, 'test2');
        page.clickAddKeyBtn();
    });
});
