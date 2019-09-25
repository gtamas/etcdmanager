const BasePage = require('./base_page');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);

class SettingsPage extends BasePage {
    constructor(app = undefined) {
        super(app);
    }

    async clickEtcdBtn() {
        await this.app.client.waitUntilTextExists('div[data-test="config.etcd-title.tab"]','ETCD');
        return this.app.client.click('div[data-test="config.etcd-title.tab"]');
    }

    async writeEndpoint(value) {
        await this.app.client.waitUntilTextExists('input[data-test="config.etcd-fields-endpoint.text-field"]','');
        return this.app.client.setValue('input[data-test="config.etcd-fields-endpoint.text-field"]', value);
    }

    writePort(value) {
        return this.app.client.setValue('data-test="config.etcd-fields-port.text-field"]', value);
    }

    writeTimeOut(value) {
        return this.app.client.setValue('data-test="config.etcd-fields-timeout.text-field"]', value);
    }

    clickAuthBtn() {
        return this.app.client.click('div[data-test="config.auth-title.tab"]');
    }

    writeUsername() {
        return this.app.client.setValue('input[data-test="config.fields-username.text-field"]');
    }

    writePassword() {
        return this.app.client.setValue('input[data-test="config.fields-password.text-field"]');
    }

    clickWatchersBtn() {
        return this.app.client.click('div[data-test="config.watchers-title.tab"]');
    }

    clickUsersBtn() {
        return this.app.client.click('div[data-test="config.users-title.tab"]');
    }

    clickMiscBtn() {
        return this.app.client.click('div[data-test="config.misc-title.tab"]');
    }

    clickSubmitBtn() {
        return this.app.client.click('button[data-test="config.submit.button"]');
    }

    clickNextBtn() {
        return this.app.client.click('button[data-test="config.next.button"]');
    }
}

module.exports = SettingsPage;
