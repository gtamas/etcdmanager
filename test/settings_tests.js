const Application = require('spectron').Application;
const assert = require('assert');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

//const baseDir = path.join(__dirname, '..');
//const electronBinary = path.join(baseDir, 'dist_electron', 'index.js');

chai.should();
chai.use(chaiAsPromised);

describe('Application launch', function() {
    this.timeout(10000);
 
    const app = new Application({
        path:
            'C:/Users/jozsef.szalai/AppData/Local/Programs/etcd-manager/etcd-manager.exe',
    });

    before(async () => {
        await app.start();
    });

    after(() => app.stop());

    it('shows an inital window', async () => {
        await app.client.waitUntilWindowLoaded();
        const count = await app.client.getWindowCount();
        assert.equal(count, 2);
    });

    it('fill etcd settings', async () => {
        return app.client
            .setValue('input[aria-label="Endpoint"]', 'TEST')
            .getValue('input[aria-label="Endpoint"]')
            .should.eventually.equal('TEST');
    });

    it('fill auth username setting', async () => {
        return app.client
            .click('//a[text()="Auth"]')
            .setValue('input[aria-label="Username"]', 'TEST')
            .getValue('input[aria-label="Username"]')
            .should.eventually.equal('TEST');
    });

    it('fill auth password setting', async () => {
        return app.client
            .click('//a[text()="Auth"]')
            .setValue('input[id="auth"]', 'TEST')
            .getValue('input[id="auth"]')
            .should.eventually.equal('TEST');
    });

    it('set watchers settings', async () => {
        return app.client.click('//a[text()="Watchers"]')
    });
});
