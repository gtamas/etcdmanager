const BasePage = require('./base_page');
const Application = require('spectron').Application;
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

class ManageKeysPage extends BasePage {
    constructor() {
        super();
    }

    clickEtcdBtn() {
        return this.app.client.click(
            'div[data-test="config.settings-etcd-title.v-tab"]'
        );
    }

    writeEndpoint(value) {
        return this.app.client
            .setValue(
                'input[data-test="config.etcd-fields-endpoint.v-text-field"]',
                value
            )
            .getValue(
                'input[data-test="config.etcd-fields-endpoint.v-text-field"]'
            )
            .should.eventually.equal(value);
    }

    clickManageKeys() {
        return this.app.client.click(
            'div[data-test="menu.keys.v-list-tile-title"]'
        );
    }

    clickSubmitBtn() {
        return this.app.client.click(
            'button[data-test="config.settings-actions-submit.v-btn"]'
        );
    }

    clickAddBtn() {
        return this.app.client.click(
            'span[data-test="key-manager.create-label.span"]'
        );
    }

    writeKey(value) {
        return this.app.client
            .setValue(
                'input[data-test="key-editor.keyeditor-key.v-text-field"]',
                value
            )
            .getValue(
                'input[data-test="key-editor.keyeditor-key.v-text-field"]'
            )
            .should.eventually.equal(value);
    }

    writeValue(value) {
        return this.app.client
            .setValue(
                'input[data-test="key-editor.keyeditor-value.v-text-field"]',
                value
            )
            .getValue(
                'input[data-test="key-editor.keyeditor-value.v-text-field"]'
            )
            .should.eventually.equal(value);
    }

    clickAddKeyBtn() {
        return this.app.client.click(
            'button[data-test="key-editor.submit.v-btn"]'
        );
    }
}

module.exports = ManageKeysPage;
