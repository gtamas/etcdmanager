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
        return this.app.client.click('//a[text()="ETCD"]');
    }

    writeEndpoint(value) {
        return this.app.client
            .setValue('input[aria-label="Endpoint"]', value)
            .getValue('input[aria-label="Endpoint"]')
            .should.eventually.equal(value);
    }

    clickManageKeys() {
        return this.app.client.click('//div[text()="Manage keys"]');
    }

    clickSubmitBtn() {
        return this.app.client.click('//div[text()="Submit"]');
    }

    clickAddBtn() {
        return this.app.client.click('//button[text()="add"]');
    }

    writeKey(value) {
        return this.app.client
            .setValue('input[aria-label="Key"]', value)
            .getValue('input[aria-label="Key"]')
            .should.eventually.equal(value);
    }

    clickAddKeyBtn() {
        return this.app.client.click('//button[text()="add"]');
    }
}

module.exports = ManageKeysPage;
