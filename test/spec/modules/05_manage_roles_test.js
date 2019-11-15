const ManageRolesPage = require('../../pageobjects/manage_roles_page');

module.exports = p => { 
describe('manage roles app scenarios', function() {
    this.timeout(10000);
    const page = new ManageRolesPage(p.app);

    it('open roles manage list', async () => {
        await page.clickRolesMenu();
        await page.findListTitle();
    });

    it('add new role', async () => {
        await page.clickAddRoleBtn();
        await page.writeName();
        await page.clickPermissionBtn();
        await page.wirtePermissionKey();
        await page.selectPermission('Read & Write');
        await page.clickGrantBtn();
    });

    it('delete role', async () => {
        await page.searchRoleByName();
        await page.clickDeleteRoleBtn();
    });
})};