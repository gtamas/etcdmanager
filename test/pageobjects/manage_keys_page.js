const BasePage = require('./base_page');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

class ManageKeysPage extends BasePage {
    constructor(app = undefined) {
        super(app);
    }

    async clickKeyMenu() {
        await this.app.client.waitUntilTextExists(
            'div[data-test="menu.keys.list-tile-title"]',
            'Manage keys'
        );
        return this.app.client.click(
            'div[data-test="menu.keys.list-tile-title"]'
        );
    }

    async findListTitle() {
        return await this.app.client.waitUntilTextExists(
            'div[data-test="key-manager.help.toolbar-title"]',
            'Keys'
        );
    }

    async isNewRowExists(key, value) {
        await this.app.client.waitUntilTextExists('td', key);
        return await this.app.client.waitUntilTextExists('td', value);
    }

    async openDeleteDialog() {
        await this.app.client
            .$('tr*=testKey')
            .$('i[data-test="key-manager.actions-edit.icon"]')
            .click();

        return await this.app.client.waitUntilTextExists('div', 'Attention!');
    }

    async openEditor() {
        await this.app.client
            .$('tr*=testKey')
            .$('i[data-test="key-manager.actions-edit.icon"]')
            .click();

        return await this.app.client.waitUntilTextExists(
            'div',
            'Edit: testKey'
        );
    }

    async clickDeleteDialogOk() {
        await this.app.client.click(
            'button[data-test="delete-dialog.actions-remove.button"]'
        );
        return await this.isElementAvailable(
            'div[data-test="app.message.snackbar"]'
        );
    }

    async clickEditorCloseBtn() {
        return await this.app.client.click(
            'button[data-test="key-editor.close.button"]'
        );
    }

    clickSubmitBtn() {
        return this.app.client.click(
            'button[data-test="config.submit.button"]'
        );
    }

    clickAddBtn() {
        return this.app.client.click(
            'span[data-test="key-manager.create-label.span"]'
        );
    }

    async writeKey(value) {
        return await this.writeInput('input[data-test="key-editor.key.text-field"]', value);
    }

    async writeValue(value) {
        return await this.writeInput('input[data-test="key-editor.value.text-field"]', value);
    }

    async clickAddKeyBtn() {
        await this.app.client.click(
            'button[data-test="key-editor.submit.button"]'
        );
        await this.waitUntilNotDisplayed(
            '[data-test="app.loading.toolbar-title"]'
        );
    }
}

module.exports = ManageKeysPage;
