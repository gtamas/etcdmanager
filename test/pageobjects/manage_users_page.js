const BasePage = require('./base_page');
const User = require('./user/user')
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const user = new User();

chai.should();
chai.use(chaiAsPromised);

class ManageUsersPage extends BasePage {
    
    constructor(app = undefined) {
        super(app);
    }

    async clickUsersMenu() {
        await this.app.client.waitUntilTextExists(
            'div[data-test="menu.users.list-tile-title"]',
            'Manage users'
        );
        return this.app.client.click(
            'div[data-test="menu.users.list-tile-title"]'
        );
    }
    
    async writeName() {
        return await this.writeInput(
            'input[data-test="user-editor.filter.text-field"]',
            user.username
        );
    }

    async writePassword() {
        return await this.writeInput(
            'input[data-test="user-editor.password.text-field"]',
            user.password
        );
    }

    async clickSubmitBtn(){
        return this.app.client.click(
            'button[data-test="user-editor.submit.button"]'
        );
    }

    async findListTitle() {
        return await this.app.client.waitUntilTextExists(
            'div[data-test="user-manager.list.toolbar-title"]',
            'Users'
        );
    }

    async clickAddUserBtn() {
        return this.app.client.click(
            'button[data-test="user-manager.create.button"]'
        );
    }
    async searchUser(){
        return await this.writeInput(
            'input[data-test="user-manager.filter.text-field"]',
            user.username
        );
    }
    async clickEditBtn(){
        await this.app.client
        .$('tr*='+user.username)
        .$('i[data-test="user-manager.actions-edit.icon"]')
        .click();

        return await chai.expect('user-editor.title.toolbar-title','div[data-test]')
    }

    async clickRemoveBtn(){
        await this.app.client
        .$('tr*='+user.username)
        .$('i[data-test="user-manager.actions-remove.icon"]')
        .click();

        return await chai.expect('delete-dialog.title.toolbar-title','div[data-test]')
    }

    async remove(){
        return this.app.client.click('button[data-test="delete-dialog.actions-remove.button"]');
    }

}
module.exports = ManageUsersPage;