const exec = require('child_process').exec;

module.exports = {
    appStart(page) {
        return (done) => {
            page.app.start().then(() => {
                setTimeout(async () => {
                    page.app.client.windowByIndex(1).then(() => {
                        done();
                    });
                }, 2000);
            });
        };
    },

    appEnd(page) {
        return (done) => {
            if (page.app && page.app.isRunning()) {
                page.app.stop().then(() => {
                    exec(`pkill -f "${page.execPath}"`);
                    done();
                });
            }
        };
    }

}
