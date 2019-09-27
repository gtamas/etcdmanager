const BasePage = require('./base_page');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

class ManageWatchersPage extends BasePage {
    constructor(app = undefined) {
        super(app);
    }

    async clickEditWatcher(key) {
        await this.app.client
            .$('tr*='+key)
            .$('i[data-test="watcher-manager.edit.icon"]')
            .click();

        return await this.app.client.waitUntilTextExists(
            'div',
            'Edit: '+key
        );
    }

    async clickWatchersMenu() {
        await this.app.client.waitUntilTextExists(
            'div[data-test="menu.watchers.list-tile-title"]',
            'Manage watchers'
        );
        return this.app.client.click(
            'div[data-test="menu.watchers.list-tile-title"]'
        );
    }

    async clickAddBtn() {
        return this.app.client.click(
            'span[data-test="watcher-manager.create-label.span"]'
        );
    }

    async findListTitle() {
        return await this.app.client.waitUntilTextExists(
            'div[data-test="watcher-manager.title.toolbar-title"]',
            'Watchers'
        );
    }

    async writeName(value) {
        return await this.writeInput(
            'input[data-test="watcher-editor.name.text-field"]',
            value
        );
    }

    async writeKey(value) {
        return await this.writeInput(
            'input[data-test="watcher-editor.key.text-field"]',
            value
        );
    }

    async clickSubmitBtn() {
        return await this.app.client.click(
            'button[data-test="watcher-editor.submit.button"]'
        );
    }

    async clickActionsKeyBtn() {
        await this.app.client.click(
            'button[data-test="watcher-editor.actions.button"]'
        );

        await this.app.client.waitUntilTextExists(
            'div[data-test="action-editor.title.toolbar-title"]',
            'New'
        );
    }

    async clickActionsAddBtn() {
        await this.app.client.click(
            'button[data-test="action-editor.add.button"]'
        );
    }

    async isNewRowExists(name, key) {
        await this.app.client.waitUntilTextExists(
            'td[data-test="watcher-manager.name.td"]',
            name
        );

        return await this.app.client.waitUntilTextExists(
            'td[data-test="watcher-manager.key.td"]',
            key
        );
    }

    async filterData(value) {
        return await this.writeInput(
            'input[data-test="watcher-manager.filter.text-field"]',
            value
        );
    }

    async selectPrefix() {
        let checkbox = this.app.client.get;
        return this.app.client.click(
            'input[data-test="watcher-editor.prefix.text-field"]'
        );
    }
}

module.exports = ManageWatchersPage;
