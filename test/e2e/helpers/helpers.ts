import { Application } from 'spectron';
import log from './logger-decorator';

export class Helpers {

    protected app: any;
    private readonly WAIT_TIME = 50000;

    constructor(app) {
        this.app = app;
    }

    @log
    protected async click(element) {
        await this.waitForExist(element);
        await this.app.client.click(element);
    }

    @log
    protected async setValue(element, text: string) {
        await this.waitForExist(element);
        await this.app.client.clearElement(element);
        await this.app.client.setValue(element, text);
    }

    @log
    protected async getText(element): Promise<string> {
        await this.waitForExist(element);
        return await this.app.client.getText(element);
    }

    @log
    protected async getValue(element): Promise<any> {
        await this.waitForExist(element);
        return await this.app.client.getValue(element);
    }

    @log
    protected async getAttribute(element, attrName): Promise<any> {
        await this.waitForExist(element);
        return await this.app.client.getAttribute(element, attrName).then(attr => {
            return attr;
        });
    }

    @log
    protected async waitForExist(element) {
        await this.app.client.waitForExist(element, this.WAIT_TIME);
    }

    @log
    protected async waitForNotExist(element) {
        await this.app.client.waitForExist(element, this.WAIT_TIME, true);
    }

    @log
    protected async waitForPresence(element) {
        await this.app.client.waitForVisible(element, 5 * 60 * 1000);
    }

    @log
    protected async waitForText(element) {
        await this.app.client.waitForText(element, this.WAIT_TIME);
    }

    @log
    protected async waitUntilTextExists(element, text) {
        await this.app.client.waitUntilTextExists(element, text, this.WAIT_TIME);
    }

    @log
    protected async waitForSelected(element) {
        await this.app.client.waitForSelected(element, this.WAIT_TIME);
    }

    @log
    protected async waitForVisible(element) {
        await this.app.client.waitForVisible(element, this.WAIT_TIME);
    }

    @log
    protected async isDisplayed(element) {
        return await this.app.client.isVisible(element);
    }

    @log
    protected async isElementPresent(element) {
        return await this.app.client.isExisting(element);
    }

}
