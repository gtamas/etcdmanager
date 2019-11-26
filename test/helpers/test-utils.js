const path = require('path');
const Application = require('spectron').Application;

class TestUtils {
    constructor() {
    }

    setupTestbed() {
        const electron = require('electron');
        const appPath = path.join(__dirname, '..', '..', 'dist_electron', 'bundled', 'background.js');
        return new Application({
            path: `${electron}`,
            args: [appPath],
            startTimeout: 10000,
            chromeDriverLogPath: 'chromedriver.log'
        });
    }
}

module.exports = TestUtils;
