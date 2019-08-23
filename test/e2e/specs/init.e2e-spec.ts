import { expect } from 'chai';
import { Application } from 'spectron';

import { PageFactory, Pages } from '../helpers/page-factory';
import { TestUtils } from '../helpers/test-utils';

describe('Initial test suite', () => {

    let pages: Pages;
    let utils: any;
    let app: Application;

    before(async () => {
        utils = new TestUtils();
        app = await utils.setUp();
        if (app && app.isRunning()) {
            pages = new PageFactory().initPages(app);
            return await app.client.windowByIndex(utils.windowByIndex());
        }
        console.log('Application not runned');
    });

    before(async () => { });

    after(() => {
        utils.tearDown();
    });

    it('Application should have started', async () => {
        const count = await app.client.getWindowCount();
        expect(count).to.be.equal(2); // we count the splash screen too
    });
});
