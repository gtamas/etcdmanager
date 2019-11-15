const ManageKeysPage = require('../../pageobjects/manage_keys_page');
const Key = require('../../pageobjects/user/key');
const assert = require('assert');

module.exports =  p => {

describe('manage keys app scenarios', function() {
    const page = new ManageKeysPage(p.app);
    const key = new Key();

    it('open key manage list', async () => {
        await page.clickKeyMenu();
        await page.findListTitle();

    });

    it('add new key value pair', async () => {
        await page.clickAddBtn();

        const randomKey = await page.writeKey(key.key);
        assert.equal(randomKey, key.key);

        const randomValue = await page.writeValue(key.value);
        assert.equal(randomValue, key.value);

        await page.clickAddKeyBtn();
        await page.clickEditorCloseBtn();
        await page.filterKeys(randomKey);
        await page.isNewRowExists(randomKey, randomValue);

    });

    it('modify new key value pair', async () => {
        await page.openEditor();

        const randomValue = await page.writeValue(`changed${key.value}`);
        assert.equal(randomValue, `changed${key.value}`);

        await page.clickAddKeyBtn();
        await page.clickEditorCloseBtn();
        await page.isNewRowExists(key.key, randomValue);

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