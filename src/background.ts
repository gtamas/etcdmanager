'use strict';

import {
    app,
    protocol,
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions,
    Tray,
    shell,
} from 'electron';
import {
    createProtocol,
    installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import * as Splashscreen from '@trodi/electron-splashscreen';
import { join } from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(join('/', app.getAppPath(), 'package.json')).toString());
const isDevelopment = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
let menu: Menu | null = null;

declare const __static: any;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null = null;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } },
]);

function createAppMenu() {
    const menuRouter = (where: string) => {
        // @ts-ignore
        return (menuItem: any, win: BrowserWindow) => {
            win.webContents.send('navigate', where);
        };
    };

    const template: MenuItemConstructorOptions[] = [
        {
            label: 'Manage',
            submenu: [
                {
                    label: 'Settings',
                    accelerator: 'CommandOrControl+Alt+S',
                    click: menuRouter('configure'),
                },
                {
                    label: 'Cluster',
                    accelerator: 'CommandOrControl+Alt+C',
                    click: menuRouter('cluster'),
                },
                {
                    label: 'Keys',
                    accelerator: 'CommandOrControl+Alt+K',
                    click: menuRouter('keys'),
                },
                {
                    label: 'Watchers',
                    accelerator: 'CommandOrControl+Alt+W',
                    click: menuRouter('watchers'),
                },
                {
                    label: 'Roles',
                    accelerator: 'CommandOrControl+Alt+R',
                    click: menuRouter('roles'),
                },
            ],
        },
        {
            label: 'Beta',
             // @ts-ignore
            submenu: [
                {
                    label: 'Report a bug',
                    click: () => {
                        shell.openExternal(pkg.bugs.url);
                    },
                },
            ],
        },
        {
            label: 'Edit',
            // @ts-ignore
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac
                    ? [
                          { role: 'pasteAndMatchStyle' },
                          { role: 'delete' },
                          { role: 'selectAll' },
                          { type: 'separator' },
                      ]
                    : [
                          { role: 'delete' },
                          { type: 'separator' },
                          { role: 'selectAll' },
                      ]),
            ],
        },
        {
            label: 'View',
            // @ts-ignore
            submenu: [
                ...(isDevelopment ? [
                    { role: 'reload' },
                    { role: 'forcereload' },
                ] : [
                ]),
                { type: 'separator' },
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' },
                { role: 'togglefullscreen' },
                ...(isDevelopment
                    ? [{ type: 'separator' }, { role: 'toggledevtools' }]
                    : []),
            ],
        },
        {
            label: 'Window',
            role: 'windowMenu',
        },
    ];

    template.unshift(
        isMac
            ? {
                  label: app.getName(),
                  submenu: [
                      { role: 'about' },
                      { type: 'separator' },
                      { role: 'services' },
                      { type: 'separator' },
                      { role: 'hide' },
                      { role: 'hideothers' },
                      { role: 'unhide' },
                      { type: 'separator' },
                      { role: 'quit' },
                  ],
              }
            : {
                  label: 'File',
                  submenu: [{ role: 'quit' }],
              }
    );

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

function setAboutPanel() {
    const year = new Date().getFullYear();
    if (process.platform !== 'win32') {
        app.setAboutPanelOptions({
            applicationName: 'ETCD Manager',
            applicationVersion: app.getVersion(),
            copyright: `Copyright ${year} by Contributors. All rights reserved.`,
            credits: 'Contributors',
            website: 'http://www.etcdmanager.com',
            iconPath: join(__static, '/icons/64x64.png'),
        });
    }
}

function createWindow() {

    // Create the browser window.
    const mainOpts = {
        width: 800,
        height: 600,
        title: 'ETCD Manager',
        icon: join(__static, '/icons/64x64.png'),
        webPreferences: {
            nodeIntegration: true,
        },
    };

    const config: Splashscreen.Config = {
        windowOpts: mainOpts,
        templateUrl: `${__static}/splash.html`,
        minVisible: 2000,
        splashScreenOpts: {
            width: 800,
            height: 600,
        },
    };

    win = Splashscreen.initSplashScreen(config);
    win.setTitle('ETCD Manager');
    win.on('page-title-updated', (e) => {
        e.preventDefault();
    });


    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) {
            win.webContents.openDevTools();
        }
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        win.loadURL('app://./index.html');
    }

    win.maximize();

    win.on('closed', () => {
        win = null;
    });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installVueDevtools();
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString());
        }
    }
    new Tray(join(__static, '/icons/24x24.png'));
    createAppMenu();
    setAboutPanel();
    createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        });
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}
