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
            'div[data-test="config.etcd-title.tab"]'
        );
    }

    writeEndpoint(value) {
        return this.app.client
            .setValue(
                'input[data-test="config.etcd-fields-endpoint.text-field"]',
                value
            )
            .getValue(
                'input[data-test="config.etcd-fields-endpoint.text-field"]'
            )
            .should.eventually.equal(value);
    }

    clickManageKeys() {
        return this.app.client.click(
            'div[data-test="menu.keys.list-tile-title"]'
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

    writeKey(value) {
        return this.app.client
            .setValue(
                'input[data-test="key-editor.key.text-field"]',
                value
            )
            .getValue(
                'input[data-test="key-editor.key.text-field"]'
            )
            .should.eventually.equal(value);
    }

    writeValue(value) {
        return this.app.client
            .setValue(
                'input[data-test="key-editor.value.text-field"]',
                value
            )
            .getValue(
                'input[data-test="key-editor.value.text-field"]'
            )
            .should.eventually.equal(value);
    }

    clickAddKeyBtn() {
        return this.app.client.click(
            'button[data-test="key-editor.submit.button"]'
        );
    }
}

module.exports = ManageKeysPage;
