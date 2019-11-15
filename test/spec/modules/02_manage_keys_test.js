const ManageKeysPage = require('../../pageobjects/manage_keys_page');
const SettingsPage = require('../../pageobjects/settings_page');
const assert = require('assert');
const shared = require('../../shared/shared');

module.exports =  p => {

describe('manage keys app scenarios', function() {
    this.timeout(10000);
    const page = new ManageKeysPage(p.app);

    it('open key manage list', async () => {
        await page.clickKeyMenu();
        await page.findListTitle();

    });

    it('add new key value pair', async () => {
        await page.clickAddBtn();

        const randomKey = await page.writeKey('testKey');
        assert.equal(randomKey, 'testKey');

        const randomValue = await page.writeValue('testValue');
        assert.equal(randomValue, 'testValue');

        await page.clickAddKeyBtn();
        await page.clickEditorCloseBtn();
        await page.filterKeys(randomKey);
        await page.isNewRowExists(randomKey, randomValue);

    });

    it('modify new key value pair', async () => {
        await page.openEditor();

        const randomValue = await page.writeValue('changedValue');
        assert.equal(randomValue, 'changedValue');

        await page.clickAddKeyBtn();
        await page.clickEditorCloseBtn();
        await page.isNewRowExists('testKey', 'changedValue');

    });

    it('remove key', async () => {
        await page.clickKeyCheckBox();
        await page.clickRemoveBtn();
        await page.clickDeleteDialogOk();
    });

     /*it('delete key value pair', async () => {
         await page.openDeleteDialog();
         await page.clickDeleteDialogOk();
    });*/
})};