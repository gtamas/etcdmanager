const Application = require('spectron').Application;
const electronPath = require('electron');
const TestUtils = require('../helpers/test-utils');

class BasePage {
    constructor(app = undefined) {
        // this.execPath = process.argv[3].split('=')[1];
        // this.execPath = electronPath;
        this.app = app;
        // this.app = app || (new TestUtils()).setupTestbed();
        // this.app = app || new Application({
        //     path: this.execPath,
        // });
    }

    async clickNotClickable(el) {
        return await this.app.client.execute(
            async (el) => await el.click(),
            el
        );
    }

    async waitUntilEnabled(locator, negate = false) {
        return await this.app.client.waitUntil(async () => {
            const res = await this.app.client.$(locator).isEnabled();
            return negate ? !res : res;
        });
    }

    async waitUntilDisplayed(locator, negate = false) {
        return await this.app.client.waitUntil(async () => {
            const res = await this.app.client.$(locator).isVisible();
            return negate ? !res : res;
        });
    }

    async waitUntilNotDisplayed(locator) {
        return await this.waitUntilDisplayed(locator, true);
    }

    async waitUntilChange(locator, value, isText = true, negate = false) {
        return await this.app.client.waitUntil(async () => {
            const el = this.app.client.$(locator);
            let res = null;
            if (isText) {
                res = (await el.getText()) === value;
            }
            res = (await res.getValue()) === value;
            return negate ? !res : res;
        });
    }

    async waitUntilTextChange(locator, value, negate = false) {
        return await this.waitUntilChange(locator, value, undefined, negate);
    }

    async waitUntilValueChange(locator, value, negate = false) {
        return await this.waitUntilChange(locator, value, false, negate);
    }

    async clearValue(selector) {
        let value = await this.app.client.getValue(selector);
        for (let i = 0; i < value.length; i++) {
            await this.app.client.setValue(selector, '\uE003');
        }
    }

    async writeInput(selector, value) {
        await this.clearValue(selector);

        return await this.app.client
            .setValue(selector, value)
            .getValue(selector);
    }

    async select(selector, value) {
        await this.app.client
            .$(selector)
            .$("//ancestor::div[@role='combobox']//i[text()='arrow_drop_down']")
            .click();

        return await this.app.client
            .$('div.v-select-list')
            .$('.v-list__tile__title=' + value)
            .click();
    }
}

module.exports = BasePage;
