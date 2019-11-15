
const ManageClusterPage = require('../../pageobjects/manage_cluster_page');


module.exports = p => {
describe('manage cluster app scenarios', function() {
    this.timeout(10000);
    const page = new ManageClusterPage(p.app);

    it('open manage cluster page', async () => {
        await page.clickClusterMenu();
    });

    it('check member health', async () =>{
        await page.clickHealthClusterIcon();
    });

    it('check info', async () => {
        await page.clickInfoIcon();
        await page.clickCloseBtn();
    });
})};
