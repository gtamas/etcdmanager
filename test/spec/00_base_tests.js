const SettingsPage = require('../pageobjects/settings_page');
const shared = require('../shared/shared');

describe('electron tests', function() {
    this.timeout(10000);
    const page = new SettingsPage();
    before(shared.appStart(page));
    
    it('set etcd connection', async () =>{
         await page.clickEtcdBtn();
         await page.writeEndpoint(process.env.ETCDMANAGER_URL || '127.0.0.1') ;
         await page.clickSubmitBtn();
    });

    require('./modules/01_settings_tests')(page);
    require('./modules/02_manage_keys_test')(page);
    require('./modules/03_manage_watchers_test')(page);
    require('./modules/04_manage_users_tests')(page);
    require('./modules/05_manage_roles_test')(page);
    require('./modules/06_manage_cluster_test')(page);

    after(shared.appEnd(page));
});