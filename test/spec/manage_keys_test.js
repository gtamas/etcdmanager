let ManageKeysPage = require('../pageobjects/manage_keys_page');
const assert = require('assert');

let page;

describe('manage keys app scenarios', function() {
    this.timeout(10000);
    page = new ManageKeysPage();

    before(async () => {
        await page.app.start();
    });

    after(() => page.app.stop());

    it('open manage key editor', async () => {
        page.clickEtcdBtn();
        const endpointValue = await page.writeEndpoint(
            'http://hubphq-icon-sandbox-d001.icellmobilsoft.hu'
        );
        assert.equal(
            endpointValue,
            'http://hubphq-icon-sandbox-d001.icellmobilsoft.hu'
        );
        page.clickSubmitBtn();
    });

    it('add new key value pair', async () => {
        await page.clickManageKeys();
        await page.clickAddBtn();

        const randomKey = await page.writeKey('testKey');
        assert.equal(randomKey, 'testKey');

        const randomValue = await page.writeValue('testValue');
        assert.equal(randomValue, 'testValue');

        await page.clickAddKeyBtn();
    });

    // TODO fix clickManageKeys and add functions to test edit key value pair
    // it('edit key value pair', async () => {
    //     await page.clickManageKeys();
    // })
});
