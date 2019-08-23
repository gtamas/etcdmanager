import * as electron from 'electron';
import { Application } from 'spectron';
import * as path from 'path';

export class TestUtils {
    public app: any;
    public windowsCount = 2;

    public windowByIndex() { return this.windowsCount - 1; }

    public setUp() {
        this.app = new Application({
            args: [path.join(__dirname, '..', '..', '..', 'dist_electron', 'bundled', 'background.js')], // binding to electron bundle
            path: `${electron}`, // electron path
            startTimeout: 30000, // we need to wait a bit more than 5000 ms
            waitTimeout: 30000, // we need to wait a bit more than 5000 ms
        });
        return this.app.start();
    }

    public tearDown() {
        const windows = this.app.client.windowHandles() as any;
        this.app.client.close(windows.sessionId);
        this.app.stop();
    }
}
