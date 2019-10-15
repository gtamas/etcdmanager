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

        return this.app.client.click(
            'button[data-test="role-editor.submit.button"]'
        );
    }

    async setPermission() {
        await this.app.client.waitUntilTextExists(
            'td',
            'No data available'
        );
        //await this.app.client.click(
          //  'button[data-test="role-editor.actions-close.button"]'
        //);
        
        await this.app.client.click(
            'button[data-test="role-editor.actions-permissions.button"]'
        );        
    }
    async clickEditRoleBtn(){
        await this.app.client
        .$('tr*='+role.name)
        .$('i[data-test="role-manager.actions-edit.icon"]')
        .click();
    }
}
module.exports = ManageRolesPage;