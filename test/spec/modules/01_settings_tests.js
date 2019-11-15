module.exports = page => {
describe('settings app scenarios', () => {

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

    after(async () =>{
          let language = 'English';
          await page.selectLanguage(language);
          await page.clickSubmitBtn();
    });
})};

