'use strict';
import { GenericObject } from './../types/index';

import {
    app,
    protocol,
    BrowserWindow,
    Menu,
    MenuItemConstructorOptions,
    Tray,
    shell,
    dialog,
    ipcMain,
} from 'electron';
import {
    createProtocol,
    installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
import * as Splashscreen from '@trodi/electron-splashscreen';
import { join } from 'path';
import { readFileSync } from 'fs';
import { get } from 'lodash-es';
import * as defaultTranslations from './i18n/en';
import { autoUpdater } from 'electron-updater';
import marked from 'marked';

const pkg = JSON.parse(
    readFileSync(
        join(
            process.platform !== 'win32' ? '/' : '',
            app.getAppPath(),
            'package.json'
        )
    ).toString()
);
const isDevelopment = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';
let menu: Menu | null = null;

declare const __static: any;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } },
]);

function loadWhatsNew() {
    const news = readFileSync(`${__static}/WHATSNEW.md`).toString();
    win.webContents.send('whatsnew-data', marked(news));
}

function createAppMenu(translations: any, disabledMap: GenericObject = {}) {
    const menuRouter = (where: string) => {
        // tslint:disable-next-line: variable-name
        return (_menuItem: any, window: BrowserWindow) => {
            window.webContents.send('navigate', where);
        };
    };

    // tslint:disable-next-line: no-parameter-reassignment
    translations = translations || defaultTranslations.default.en;

    const template: MenuItemConstructorOptions[] = [
        {
            label: get(translations, ['appMenu', 'config'], 'Config'),
            submenu: [
                {
                    accelerator: 'CommandOrControl+Alt+S',
                    label: get(
                        translations,
                        ['appMenu', 'settings'],
                        'Settings'
                    ),
                    click: menuRouter('configure'),
                },
                {
                    accelerator: 'CommandOrControl+Alt+E',
                    label: get(translations, ['appMenu', 'export'], 'Export'),
                    click: () => {
                        const saveTo = dialog.showSaveDialogSync({
                            defaultPath: `etcd-manager-settings.json`,
                            properties: ['dontAddToRecent', 'createDirectory'],
                        } as any);
                        if (saveTo) {
                            win.webContents.send('app-config-data', saveTo);
                        }
                    },
                },
                {
                    accelerator: 'CommandOrControl+Alt+I',
                    label: get(translations, ['appMenu', 'import'], 'Import'),
                    click: () => {
                        const saveTo = dialog.showOpenDialogSync({
                            properties: ['openFile'],
                            filters: [{
                                extensions: ['json', 'JSON'],
                                name: 'foo',
                            }],
                        });
                        if (saveTo) {
                            try {
                                const data = JSON.parse(readFileSync(saveTo[0]).toString());
                                win.webContents.send('config-data', data);
                            } catch (e) {
                                win.webContents.send('error-notification', 'common.messages.invalidFileError');
                            }
                        }
                    },
                },
            ],
        },
        {
            label: get(translations, ['appMenu', 'edit'], 'Edit'),
            // @ts-ignore
            submenu: [
                {
                    role: 'undo',
                    label: get(translations, ['appMenu', 'undo'], 'Undo'),
                },
                {
                    role: 'redo',
                    label: get(translations, ['appMenu', 'redo'], 'Redo'),
                },
                { type: 'separator' },
                {
                    role: 'cut',
                    label: get(translations, ['appMenu', 'cut'], 'Cut'),
                },
                {
                    role: 'copy',
                    label: get(translations, ['appMenu', 'copy'], 'Copy'),
                },
                {
                    role: 'paste',
                    label: get(translations, ['appMenu', 'paste'], 'Paste'),
                },
                ...(isMac
                    ? [
                          {
                              role: 'pasteAndMatchStyle',
                              label: get(
                                  translations,
                                  ['appMenu', 'pasteAndMatchStyle'],
                                  'Paste and match style'
                              ),
                          },
                      ]
                    : []),
                {
                    role: 'delete',
                    label: get(translations, ['appMenu', 'delete'], 'Delete'),
                },
                { type: 'separator' },
                {
                    role: 'selectAll',
                    label: get(
                        translations,
                        ['appMenu', 'selectAll'],
                        'Select all'
                    ),
                },
            ],
        },
        {
            label: get(translations, ['appMenu', 'view'], 'View'),
            // @ts-ignore
            submenu: [
                ...(isDevelopment
                    ? [
                          {
                              role: 'reload',
                              label: get(
                                  translations,
                                  ['appMenu', 'reload'],
                                  'Reload'
                              ),
                          },
                          {
                              role: 'forcereload',
                              label: get(
                                  translations,
                                  ['appMenu', 'forcereload'],
                                  'Force reload'
                              ),
                          },
                      ]
                    : []),
                { type: 'separator' },
                {
                    role: 'resetzoom',
                    label: get(
                        translations,
                        ['appMenu', 'resetzoom'],
                        'Reset zoom'
                    ),
                },
                {
                    role: 'zoomin',
                    label: get(translations, ['appMenu', 'zoomin'], 'Zoom in'),
                },
                {
                    role: 'zoomout',
                    label: get(
                        translations,
                        ['appMenu', 'zoomout'],
                        'Zoom out'
                    ),
                },
                { type: 'separator' },
                {
                    role: 'togglefullscreen',
                    label: get(
                        translations,
                        ['appMenu', 'togglefullscreen'],
                        'Toggle fullscreen'
                    ),
                },
                { type: 'separator' },
                ...(!isDevelopment
                    ? [
                          {
                              role: 'toggledevtools',
                              label: get(
                                  translations,
                                  ['appMenu', 'toggledevtools'],
                                  'Toggle DevTools'
                              ),
                          },
                      ]
                    : []),
                ,
            ],
        },
        {
            label: get(translations, ['appMenu', 'manage'], 'Manage'),
            enabled: disabledMap.manage,
            visible: process.platform === 'darwin' ? true : disabledMap.manage,
            acceleratorWorksWhenHidden: false,
            submenu: [
                {
                    label: get(
                        translations,
                        ['appMenu', 'settings'],
                        'Settings'
                    ),
                    accelerator: 'CommandOrControl+Alt+S',
                    click: menuRouter('configure'),
                },
                {
                    label: get(translations, ['appMenu', 'cluster'], 'Cluster'),
                    accelerator: 'CommandOrControl+Alt+C',
                    click: menuRouter('cluster'),
                },
                {
                    label: get(translations, ['appMenu', 'keys'], 'Keys'),
                    accelerator: 'CommandOrControl+Alt+K',
                    click: menuRouter('keys'),
                },
                {
                    label: get(
                        translations,
                        ['appMenu', 'watchers'],
                        'Watchers'
                    ),
                    accelerator: 'CommandOrControl+Alt+W',
                    click: menuRouter('watchers'),
                },
                {
                    label: get(translations, ['appMenu', 'roles'], 'Roles'),
                    accelerator: 'CommandOrControl+Alt+R',
                    click: menuRouter('roles'),
                },
                {
                    label: get(translations, ['appMenu', 'users'], 'Users'),
                    accelerator: 'CommandOrControl+Alt+U',
                    click: menuRouter('users'),
                },
                {
                    label: get(translations, ['appMenu', 'leases'], 'Leases'),
                    enabled: disabledMap.lease,
                    visible: process.platform === 'darwin' ? true : disabledMap.lease,
                    accelerator: 'CommandOrControl+Alt+L',
                    click: menuRouter('leases'),
                },
            ],
        },
        {
            label: get(translations, ['appMenu', 'help'], 'Help'),
            // @ts-ignore
            submenu: [
                {
                    label: get(
                        translations,
                        ['appMenu', 'reportBug'],
                        'Report a bug'
                    ),
                    accelerator: 'CommandOrControl+Alt+B',
                    click: () => {
                        shell.openExternal(pkg.bugs.url);
                    },
                },
            ],
        },
    ];

    template.unshift(
        // @ts-ignore
        isMac
            ? {
                  label: app.getName(),
                  submenu: [
                      {
                          role: 'about',
                          label: get(
                              translations,
                              ['appMenu', 'about'],
                              'About'
                          ),
                      },
                      { type: 'separator' },
                      {
                          role: 'services',
                          label: get(
                              translations,
                              ['appMenu', 'services'],
                              'Services'
                          ),
                      },
                      { type: 'separator' },
                      {
                          role: 'hide',
                          label: get(translations, ['appMenu', 'hide'], 'Hide'),
                      },
                      {
                          role: 'hideothers',
                          label: get(
                              translations,
                              ['appMenu', 'hideothers'],
                              'Hide others'
                          ),
                      },
                      {
                          role: 'unhide',
                          label: get(
                              translations,
                              ['appMenu', 'unhide'],
                              'Unhide'
                          ),
                      },
                      { type: 'separator' },
                      {
                          role: 'quit',
                          label: get(translations, ['appMenu', 'quit'], 'Quit'),
                      },
                  ],
              }
            : {
                  label: get(translations, ['appMenu', 'file'], 'File'),
                  submenu: [
                      {
                          role: 'quit',
                          label: get(translations, ['appMenu', 'quit'], 'Quit'),
                      },
                  ],
              }
    );

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// tslint:disable-next-line: variable-name
function setAboutPanel(_translations: any = defaultTranslations.default.en) {
    const year = new Date().getFullYear();
    if (process.platform !== 'win32') {
        app.setAboutPanelOptions({
            applicationName: 'ETCD Manager',
            applicationVersion: app.getVersion(),
            copyright: `Copyright ${year} by Contributors. All rights reserved.`,
            credits: 'Contributors',
            website: 'http://www.etcdmanager.io',
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
        autoUpdater.checkForUpdatesAndNotify();
    }

    win.maximize();

    win.on('closed', () => {});
}
ipcMain.on('ssl_file_check', (_event: any, cert: string, id: string) => {
    try {
        const data = readFileSync(cert);
        win.webContents.send('ssl_data', {
            id,
            data,
            fileName: cert,
        });
    } catch (e) {
        throw e;
    }
});
ipcMain.on('ssl_dialog_open', (_event: any, id: string) => {
    const saveTo = dialog.showOpenDialogSync({
        properties: ['openFile'],
    });
    if (saveTo) {
        try {
            const data = readFileSync(saveTo[0]);
            win.webContents.send('ssl_data', {
                id,
                data,
                fileName: saveTo[0],
            });
        } catch (e) {
            throw e;
        }
    }
});


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
    createAppMenu(defaultTranslations.default.en);
    setAboutPanel();
    createWindow();
    // tslint:disable-next-line: variable-name
    ipcMain.on(
        'update-menu',
        (_event: any, translations: any, disabledMap: GenericObject) => {
            createAppMenu(translations, disabledMap);
            setAboutPanel(translations);
        }
    );

    ipcMain.on('whatsnew-load', () => {
        loadWhatsNew();
    });

    return new Tray(join(__static, '/icons/24x24.png'));
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
