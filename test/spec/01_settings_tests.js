const SettingsPage = require('../pageobjects/settings_page');
const shared = require('../shared/shared');


describe('settings app scenarios', function() {
    this.timeout(10000);
    const page = new SettingsPage();

    before(shared.appStart(page));

    after(shared.appEnd(page));

   it('submit etcd values test', async () => {
        await page.clickEtcdBtn();
        await page.writeEndpoint('http://hubphq-icon-sandbox-d001.icellmobilsoft.hu');
        await page.clickSubmitBtn();
    });


    //etcd-ben ki van kapcsolva!
    /*it('submit auth values test', async () => {
         await page.clickAuthBtn();
         await page.writeUsername();
         await page.writePassword();
     });*/

     it('check test connection', async () =>{
         await page.clickTestConnectionBtn();
     });

     it('change language', async() => {
         let language = 'Hungarian';
         await page.clickMiscBtn();
         await page.selectLanguage(language);
         await page.clickSubmitBtn();
         await page.isSelectedLanguage(language);
     });
});
