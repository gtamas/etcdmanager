const BasePage = require('./base_page');
const chai = require('chai');
const User = require('./user/user');
const user = new User();

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

    async writeUsername() {
        return await this.writeInput('input[data-test="config.fields-username.text-field"]',user.username);
    }

    async writePassword() {
        return  await this.writeInput('input[data-test="config.fields-password.text-field"]',user.password);
    }

    async clickWatchersBtn() {
        return await this.app.client.click('div[data-test="config.watchers-title.tab"]');
    }

    async clickUsersBtn() {
        return await this.app.client.click('div[data-test="config.users-title.tab"]');
    }

    async clickMiscBtn() {
        await this.app.client.click('div[data-test="config.misc-title.tab"]');
        await this.app.client.waitUntilTextExists('label.v-label','Language');
    }

    clickSubmitBtn() {
        return this.app.client.click('button[data-test="config.submit.button"]');
    }

    async clickNextBtn() {
        return await this.app.client.click('button[data-test="config.next.button"]');
    }

    async clickTestConnectionBtn(){
        await this.app.client
        .click('button[data-test="config.test-connection.button"]');

        await this.app.client
        .waitUntilTextExists('div.v-snack__content','Your connection is fine',10000);

        return this.app.client.$('div.v-snack__content').getText().then(text =>{
                chai.expect(text).to.have.contains('Your connection is fine');
             });             
    }

    async selectLanguage(choose){
       return await this.select('input[data-test="config.misc-fields-language.select"]',choose);
      }

    async isSelectedLanguage(language){
        if(language === 'Hungarian'){
            await this.app.client
            .waitUntilTextExists('div.v-snack__content','A beállítások sikeresen elmentve',10000); 

            return this.app.client.$('div.v-snack__content').getText().then(text =>{
                chai.expect(text).to.have.contains('A beállítások sikeresen elmentve');
             });     
            
        }
        await this.app.client
            .waitUntilTextExists('div.v-snack__content','Configuration has been saved successfully',10000);
        
        return this.app.client.$('div.v-snack__content').getText().then(text =>{
                chai.expect(text).to.have.contains('Configuration has been saved successfully');
             });    
    }
}

module.exports = SettingsPage;
