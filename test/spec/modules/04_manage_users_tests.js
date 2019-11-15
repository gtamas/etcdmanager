const ManageUsersPage = require('../../pageobjects/manage_users_page');

module.exports = p => {
describe('manage users app scenarios', function() {
    this.timeout(10000);
    const page = new ManageUsersPage(p.app);

    it('open users manage list', async () => {
        await page.clickUsersMenu();
        await page.findListTitle();
    });

    it('add new user', async () =>{
        await page.clickAddUserBtn();
        await page.writeName();
        await page.writePassword();
        await page.clickSubmitBtn();
    });
    
    it('modify user', async () => {
        await page.searchUser();
        await page.clickEditBtn();
        await page.writePassword();
    });

    it('add role to user', async () => {
        await page.checkRole();
        await page.clickSubmitBtn();
    });

    it('delete user', async () => {
        await page.searchUser();
        await page.clickRemoveBtn();
        await page.remove()
    });
})};