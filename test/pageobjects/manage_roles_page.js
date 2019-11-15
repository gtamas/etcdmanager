const BasePage = require('./base_page');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Role = require('./user/role')
const role = new Role();

chai.should();
chai.use(chaiAsPromised);

class ManageRolesPage extends BasePage {
    
    constructor(app = undefined) {
        super(app);
    }

    async clickRolesMenu() {
        await this.app.client.waitUntilTextExists(
            'div[data-test="menu.roles.list-tile-title"]',
            'Manage roles'
        );
        return this.app.client.click(
            'div[data-test="menu.roles.list-tile-title"]'
        );
    }
    
    async findListTitle() {
        return await this.app.client.waitUntilTextExists(
            'div[data-test="role-manager.rolemanager-title.toolbar-title"]',
            'Roles'
        );
    }

    async clickAddRoleBtn() {
        return this.app.client.click(
            'button[data-test="role-manager.create.button"]'
        );
    }

    async writeName() {
       await this.writeInput(
            'input[data-test="role-editor.filter.text-field"]',
            role.name
        );
        return await this.app.client.click(
            'button[data-test="role-editor.submit.button"]'
        );
    }

    async clickPermissionBtn() {
       return await this.app.client
        .$('button[data-test="role-editor.actions-permissions.button"]')  
        .click();
    }

    async clickDeleteRoleBtn(){
       return await this.app.client
        .$('tr*='+role.name)
        .$('i[data-test="role-manager.actions-remove.icon"]')
        .click().then(async() =>{
            await this.app.client
            .$('button[data-test="delete-dialog.actions-remove.button"]')  
            .click();
        });
    }

    async clickEditRoleBtn(){
        return await this.app.client
        .$('tr*='+role.name)
        .$('i[data-test="role-manager.actions-edit.icon"]')
        .click();
    }
    
    async wirtePermissionKey(){
        await this.writeInput(
            'input[data-test="permission-editor.fields-key.text-field"]',
            role.permissionKey
        );
    }

    async selectPermission(choose){

      await this.app.client
       .$('input[data-test="permission-editor.fields-permission.select"]')
       .$("//ancestor::div[@role='combobox']//i[text()='arrow_drop_down']")
       .click();

      return await this.app.client
        .$('div.v-select-list')
        .$('.v-list__tile__title='+choose)
        .click();
    }

    async clickGrantBtn(){
        return await this.app.client
        .$('button[data-test="permission-editor.actions-grant.button"]')  
        .click();
    }

    async searchRoleByName(){
        return await this.writeInput(
            'input[data-test="role-manager.filter.text-field"]',
            role.name
        );
    }
}
module.exports = ManageRolesPage;