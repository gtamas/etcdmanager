const exec = require('child_process').exec;

module.exports = {
    appStart(page) {
        return (done) => {
            page.app.start().then(() => {
                setTimeout(async () => {
                    if(process.platform !== "win32"){
                        page.app.client.windowByIndex(1).then(() => {
                            done();
                        });
                    }else{
                            done();
                    }
                }, 2000);
            });
        };
    },

    appEnd(page) {
        return (done) => {
            if (page.app && page.app.isRunning()) {
                page.app.stop().then(() => {
                    if(process.platform !== "win32"){
                        exec(`pkill -f "${page.execPath}"`);
                        done();
                    }else{
                        exec(`taskkill /F "${page.execPath}"`);
                        done();
                    }

                });
            }
        };
    }

}
