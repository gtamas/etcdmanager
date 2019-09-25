const Application = require('spectron').Application;
const electronPath = require('electron');

class BasePage {
    constructor(app = undefined) {
        this.execPath = process.argv[3].split('=')[1];
        this.app =
            app ||
            new Application({
                path: this.execPath,
            });
    }

    async clickNotClickable(el) {
        return await this.app.client.execute(
            async (el) => await el.click(),
            el
        );
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

    async writeInput(selector, value) {
        return await this.app.client
        .setValue(selector, '')
        .setValue(selector, value)
        .getValue(selector);
    }
}

module.exports = BasePage;
