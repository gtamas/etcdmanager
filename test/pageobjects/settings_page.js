const BasePage = require('./base_page');

class SettingsPage extends BasePage {
    constructor() {
        super();
    }

    clickEtcdBtn() {
        return this.app.client.click('div[data-test="config.etcd-title.tab"]');
    }

    writeEndpoint(value) {
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
