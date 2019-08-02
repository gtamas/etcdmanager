const BasePage = require('./base_page');

class SettingsPage extends BasePage {
    constructor() {
        super();
    }

    clickEtcdBtn() {
        return this.app.client.click('//a[text()="ETCD"]');
    }

    writeEndpoint(value){
        return this.app.client.setValue('input[aria-label="Endpoint"]', value);
    }

    writePort(value){
        return this.app.client.setValue('input[aria-label="Port"]', value);
    }

    writeTimeOut(value){
        return this.app.client.setValue('input[aria-label="Timeout"]', value);
    }

    clickAuthBtn() {
        return this.app.client.click('//a[text()="Auth"]');
    }

    writeUsername(){
        return this.app.client.setValue('input[aria-label="Username"]');
    }

    writePassword(){
        return this.app.client.setValue('input[id="auth"]');
    }

    clickWatchersBtn() {
        return this.app.client.click('//a[text()="Watchers"]');
    }

    clickUsersBtn() {
        return this.app.client.click('//a[text()="Users"]');
    }

    clickUsersBtn() {
        return this.app.client.click('//a[text()="Misc"]');
    }

    clickSubmitBtn(){
        return this.app.client.click('//div[text()="Submit"]');
    }
    
    clickNextBtn(){
        return this.app.client.click('//div[text()="Next"]');
    }


}

module.exports = SettingsPage;
