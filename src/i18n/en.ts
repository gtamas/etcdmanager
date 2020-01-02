export default {
    en: {
        $vuetify: {
            dataIterator: {
                rowsPerPageText: 'Items per page:',
                rowsPerPageAll: 'All',
                pageText: '{0}-{1} of {2}',
                noResultsText: 'No matching records found',
                nextPage: 'Next page',
                prevPage: 'Previous page',
            },
            dataTable: {
                rowsPerPageText: 'Rows per page:',
            },
            noDataText: 'No data available',
        },
        appMenu: {
            file: 'File',
            services: 'Services',
            hide: 'Hide',
            hideothers: 'Hide others',
            unhide: 'Unhide',
            quit: 'Quit',
            edit: 'Edit',
            undo: 'Undo',
            redo: 'Redo',
            cut: 'Cut',
            copy: 'Copy',
            paste: 'Paste',
            pasteAndMatchStyle: 'Paste and match style',
            delete: 'Delete',
            selectAll: 'Select all',
            view: 'View',
            reload: 'Reload',
            forcereload: 'Force reload',
            resetzoom: 'Reset zoom',
            zoomin: 'Zoom in',
            zoomout: 'Zoom out',
            togglefullscreen: 'Toggle fullscreen',
            toggledevtools: 'Toggle DevTools',
            manage: 'Manage',
            settings: 'Settings',
            cluster: 'Cluster',
            keys: 'Keys',
            watchers: 'Watchers',
            roles: 'Roles',
            users: 'Users',
            beta: 'Beta',
            reportBug: 'Report a bug',
            help: 'Help',
            gotoWiki: 'Go to Wiki',
            about: 'About',
        },
        menu: {
            settings: 'Settings',
            manageCluster: 'Manage cluster',
            manageKeys: 'Manage keys',
            manageWatchers: 'Manage watchers',
            manageUsers: 'Manage users',
            manageRoles: 'Manage roles',
            about: 'About',
        },
        common: {
            items: {
                watcher: 'watcher | watchers',
                key: 'key | keys',
                role: 'role | roles',
                action: 'action | actions',
                permission: 'permission | permissions',
            },
            titles: {
                new: 'New',
                edit: 'Edit',
            },
            help: {
                tooltip: 'Show help panel',
                infoTitle: `Did you know?`,
                tabs: {
                    info: 'Info',
                    shortcuts: 'Keyboard shortcuts',
                },
                shortcuts: {
                    save: 'Validate and persist data',
                    help: 'Show this help',
                    enter: 'Persist data',
                    esc: 'Close editor',
                    openEditor: 'Open editor',
                    closeEditor: 'Close editor',
                    search: 'Focus search box',
                    purge: 'Purge all items',
                    remove: 'Remove selected items',
                },
            },
            actions: {
                add: 'Add',
                save: 'Save',
                separator: {
                    tooltip: 'Key separator',
                },
                purgeAll: {
                    label: 'Purge',
                    tooltip: 'Purge all',
                },
                openAll: {
                    label: {
                        open: 'Open',
                        close: 'Close',
                    },
                    tooltip:'Open/close every node',
                },
                changeView: {
                    tooltip:'Change the type of the view',
                },
                create: {
                    label: 'Add',
                    tooltip: 'Add new',
                },
                removeAll: {
                    label: 'Remove',
                    tooltip: 'Remove selected',
                },
                close: {
                    label: 'Close',
                },
            },
            lists: {
                nodata: 'There is no data to display..',
                filter: 'Filter data..',
            },
            validation: {
                required: 'Item is required',
                alphanumeric: 'Alphanumeric value expected',
                int: 'Value must be an integer',
                pattern: 'Invalid regular expression',
            },
            messages: {
                success: 'Operation successful',
                error: 'Could not perform operation',
                copyClipboardSuccess: 'Copied to clipboard successfully.',
                copyClipboardSuccessError: 'Could not copy to clipboard.',
            },
        },
        settings: {
            title: 'Settings',
            help: {
                etcd: `* This where you configure your ETCD connection and some of the related (optional) settings.
                * The most important is to define **host** and the **port**, since these are required to connect to ETCD.
                * The value of **host** should be the valid **IPv4 address** or **URL** of the ETCD server.
                * The value of **port** should be the port number ETCD is listening at. The default is **2379**.

                > If your settings are incorrect or ETCD is not reachable, **you won't be able to navigate away** from the settings screen.
                To prevent this, make sure the correct settings are saved and ETCD is actually running at the address you defined.
                `,
                auth: `* This is where you can specify authentication settings.
                * The **username** and **password** below should be equal to your ETCD username and password, respectively.

                > In order to make these settings work, you have to [enable authentication](http://etcd.io) in ETCD.
                It is turned off by default. If you don't need authentication, **leave these settings blank**.`,
                watchers: `* The watcher settings can be found below
                * You may enable watcher **autoloading on startup**
                * You may also enable or disable default watchers.

                > Watchers will live as long as the app is running. This means that you'll **stop receiving watcher events** once the app shuts down.
                However, if you enable autoloading below, watchers will be reactivated automatically when you restart app.`,
                users: `* These settings are related to ETCD user management
                * This password pattern applies to user creation as well as changing an existing user's password.

                > If you leave the pattern blank, the default one will be used: 8-16 characters, no whitespace, must include capital letters and numbers.`,
                misc: `* Miscellaneous settings.
                    * Among other things, you may also **change the language** here.`,
                shortcuts: {
                    leftArrowLabel: 'left arrow',
                    rightArrowLabel: 'right arrow',
                    leftArrow: 'Previous Tab',
                    rightArrow: 'Next Tab',
                },
            },
            etcd: {
                title: 'ETCD',
                fields: {
                    endpoint: {
                        label: 'Host',
                        placeholder: 'Type in an URL or IP address..',
                        tooltip: 'The URL or IP address of the ETCD server',
                    },
                    port: {
                        label: 'Port',
                        placeholder: 'Type in an number..',
                        tooltip:
                            'The port number of the ETCD service. Defaults to 2317',
                    },
                    retries: {
                        label: 'Retries',
                        tooltip: `Whether, if a query fails as a result of a primitive GRPC error, to retry it on a different server (provided one is available).
                            This can make service disruptions less-severe but can cause a domino effect if a particular operation causes a failure that grpc
                            reports as some sort of internal or network error.`,
                    },
                    timeout: {
                        label: 'Timeout',
                        placeholder: 'Type in a number..',
                        tooltip:
                            'Duration in milliseconds to wait while connecting before timing out. Defaults to 30 seconds.',
                    },
                    apiVersion: {
                        label: 'API version',
                        tooltip:
                            'The protocol version supported by the endpoint',
                    },
                },
            },
            auth: {
                title: 'Auth',
                fields: {
                    username: {
                        label: 'Username',
                        placeholder: 'Type in an alphanumeric value..',
                        tooltip:
                            'ETCD username. Leave blank if authentication is not enabled.',
                    },
                    password: {
                        label: 'Password',
                        placeholder: 'Type in an alpanumeric value..',
                        tooltip:
                            'ETCD password. Leave blank if authentication is not enabled.',
                    },
                },
            },
            watchers: {
                title: 'Watchers',
                fields: {
                    loadWatchers: {
                        label: 'Activate all user defined watchers on startup',
                        tooltip:
                            'If turned on, all user defined watchers will be automatically activated when the app starts.',
                    },
                    unloadWatchers: {
                        label:
                            'Deactivate all user defined watchers on shutdown',
                        tooltip:
                            'If turned on, all user defined watchers will be automatically deactivated when the app quits.',
                    },
                    errorListener: {
                        label: 'Monitor ETCD errors',
                        tooltip:
                            'If turned on, a watcher will print all ETCD errors to the console.',
                    },
                    disconnectListener: {
                        label: 'Monitor watcher disconnects',
                        tooltip:
                            'If turned on, a message will be printed to the console whenever a watcher diconnects from ETCD.',
                    },
                    reconnectListener: {
                        label: 'Monitor watcher reconnects',
                        tooltip:
                            'If turned on, a message will be printed to the console whenever a watcher reconnects to ETCD.',
                    },
                },
            },
            users: {
                title: 'Users',
                fields: {
                    pwpattern: {
                        label: 'Password pattern',
                        placeholder: 'Type in a regular expression..',
                        tooltip:
                            'The pattern to be used for validating user passwords. Leave blank to use the default pattern (8 - 16 characters, has to include capital letters and numbers)',
                    },
                },
            },
            misc: {
                title: 'Misc',
                fields: {
                    language: {
                        label: 'Language',
                        tooltip: 'The languge of the UI.',
                    },
                    animateBg: {
                        label: 'Toggle background animation',
                        tooltip: 'Enable of disable animated background.',
                    },
                    bg: {
                        label: 'Enable background',
                        tooltip: 'Enable of disable background image.',
                    },
                },
            },
            actions: {
                submit: 'Submit',
                next: 'Next',
                testConnection: 'Test Connection',
            },
            messages: {
                error: 'The input data is invalid or mandatory info is missing!',
                connectSuccess: 'Your connection is fine',
                success: 'Configuration has been saved successfully',
                ipOrUrl: 'The IP address or URL appears to be invalid',
            },
        },
        cluster: {
            title: 'Cluster',
            help: {
                text: `* Basic info is displayed below about the ETCD cluster and its nodes.
                * For additional details about each node, click the **info** button.
                * You can perform **health check** on each node, by clicking the **heart** icon.`,
            },
            subtitle: 'Nodes',
            header: {
                clusterId: 'Cluster ID',
                memberId: 'Member ID',
                revision: 'Revision',
                raftTerm: 'Raft Term',
            },
            columns: {
                id: 'ID',
                clientUrls: 'Client URLs',
                peerUrls: 'Peer URLs',
            },
            actions: {
                check: 'Check member health',
                status: 'Fetch status info',
            },
            dialogs: {
                info: {
                    title: 'Info',
                    labels: {
                        db: 'DB',
                        leader: 'Leader',
                        raftIndex: 'Raft Index',
                        raftTerm: 'Raft Term',
                        version: 'Version',
                    },
                    actions: {
                        close: 'Close',
                    },
                },
            },
        },
        keyManager: {
            title: 'Keys',
            help: {
                text: `This is the list of **all keys**. Here you may:

                * Order the list by any column (click the **column title**).
                * Filter the list by any column (use the **search box**).
                * Delete selected keys (click **remove**).
                * Delete all keys (click **purge**).
                * Touch selected keys (click **touch**)
                * You may also edit, delete or touch individual keys using the appropriate **action icon**.`,
                shortcuts: {
                    touch: 'Touch selected keys',
                },
            },
            columns: {
                key: 'Key',
                value: 'Value',
            },
            actions: {
                treeView: 'Tree',
                flatView: 'Flat',
                touchAll: {
                    label: 'Touch',
                    tooltip: 'Touch selected keys',
                },
                edit: 'Edit key',
                remove: 'Remove key',
                touch: 'Touch key',
            },
            treeview: {
                separator: 'Separator',
            },
        },
        keyEditor: {
            title: 'Keys',
            subtitle: 'Revisions',
            help: {
                text: `You can **create** and **edit** keys here.

                * One created, you **cannot** change the name of a key.
                * Keys must be **unique**`,
            },
            fields: {
                key: {
                    label: 'Key',
                    placeholder: 'Type in a name..',
                    tooltip: 'The name of the ETCD key',
                },
                value: {
                    label: 'Value',
                    placeholder: 'Type in a value..',
                    tooltip: 'The value associated with this key',
                },
            },
            buttons: {
                revisions: 'Show revisions',
                revisionsHide: 'Hide revisions',
            },
            messages: {
                duplicateKey: 'This key already exists!',
            },
            columns: {
                key: 'Previous value',
                version: 'Version',
                createRev: 'Create Rev',
                modRev: 'Mod Rev',
                type: 'Type',
            },
        },
        purgeDialog: {
            title: 'Attention!',
            content:
                'This will permanently remove ALL {type}. This action cannot be undone.',
            actions: {
                remove: 'Remove',
                cancel: 'Cancel',
            },
        },
        deleteDialog: {
            title: 'Attention!',
            content:
                'Deleting a {type} will permanently remove it. This action cannot be undone.',
            actions: {
                remove: 'Remove',
                cancel: 'Cancel',
            },
        },
        noSelectionDialog: {
            title: 'Attention!',
            content: 'Please select some items first!',
            actions: {
                ok: 'OK',
            },
        },
        watcherManager: {
            title: 'Watchers',
            help: {
                text: `This is the list of **all watchers**. Here you may:

                * Order the list by any column (click the **column title**).
                * Filter the list by any column (use the **search box**).
                * Delete selected watchers (click **remove**).
                * Delete all watchers (click **purge**).
                * Activate or deactivate selected watchers (click the **bell icon**)
                * You may also edit, delete or (de)activate individual watchers using the appropriate **action icon**.

                > Watchers receive events only when active. Once activated, they will **stay active as long as the app is
                running** (or until you shut them down). Should the connection to ETCD be lost, watchers will try to reconnect
                automatically and they gonna catch up on missed events.`,
                shortcuts: {
                    toggle: 'Activate / deactivate selected watchers',
                },
            },
            columns: {
                key: 'Key',
                name: 'Name',
                prefix: 'Prefix',
            },
            actions: {
                notificationToggle: {
                    label: 'On',
                    tooltip: 'Turn selected watchers on / off',
                },
                edit: 'Edit watcher',
                remove: 'Remove watcher',
                status: 'Toggle watcher status',
            },
        },
        watcherEditor: {
            help: {
                text: `You can **edit** or **create** watchers here.

                * Once created, you **cannot** change the name of the watcher. It must be **unique**.
                * A watcher may watch a single key. (**don't use** prefix)
                * A Watcher may watch every key starting with a certain string. (**use** prefix)
                * Each watcher may perform as many **actions** as needed, but it has to be associated with **at least one**.`,
                shortcuts: {
                    addAction: 'Add new action',
                },
            },
            fields: {
                name: {
                    label: 'Name',
                    placeholder: 'Type in a value..',
                    tooltip: 'The name of the watcher.',
                },
                key: {
                    label: 'Key',
                    placeholder: 'Type in a value..',
                    tooltip: 'The key this watcher is associated with.',
                },
                prefix: {
                    label: 'This is a prefix',
                    tooltip:
                        'If checked all keys with this prefix will be watched.',
                },
            },
            actionList: {
                columns: {
                    action: 'Action',
                    event: 'Event',
                },
                actions: {
                    edit: 'Edit action',
                    remove: 'Remove action',
                },
            },
            actions: {
                actions: {
                    label: 'Actions',
                },
            },
            messages: {
                duplicate: 'A watcher with this name already exists',
                duplicateAction: 'An action of this type already exists',
            },
        },
        actionEditor: {
            title: 'Actions',
            fields: {
                action: {
                    label: 'Action',
                    tooltip: 'Action to be performed when the event occurs.',
                },
                event: {
                    label: 'Event',
                    tooltip: 'Event type',
                },
            },
        },
        roleManager: {
            title: 'Roles',
            help: {
                text: `This is the list of **all ETCD roles**. Here you may:

                * Order the list by any column (click the **column title**).
                * Filter the list by any column (use the **search box**).
                * Delete selected roles (click **remove**).
                * Delete all roles (click **purge**).
                * You may also edit or delete individual roles using the appropriate **action icon**.`,
            },
            columns: {
                name: 'Name',
            },
            actions: {
                edit: 'Edit role',
                remove: 'Remove role',
            },
        },
        roleEditor: {
            help: {
                text: `You can **edit** or **create** roles here.

                * Once created, you **cannot** change the name of the role. It must be **unique**.
                * A role must be associated **at least one** permission.
                * Permissions get assigned and revoked **immediately**, you don't need to click save.`,
                shortcuts: {
                    addPermission: 'Add new permission',
                },
            },
            fields: {
                name: {
                    label: 'Name',
                    placeholder: 'Type in a value..',
                    tooltip: 'The name of the role.',
                },
            },
            actions: {
                edit: 'Edit permission',
                revoke: 'Revoke permission',
                permissions: 'Permissions',
            },
            columns: {
                key: 'Key',
                permission: 'Permission',
                prefix: 'Prefix',
            },
        },
        permissionEditor: {
            fields: {
                key: {
                    label: 'Key',
                    placeholder: 'Type in a value..',
                    tooltip: 'The name of the key this role grants access to.',
                },
                permission: {
                    label: 'Permissions',
                    tooltip:
                        'The permission this role grants. If your want eveything, choose read and write.',
                },
                prefix: {
                    label: 'This is a prefix',
                    tooltip:
                        'If checked, the role will apply to all keys with this prefix.',
                },
            },
            actions: {
                grant: {
                    label: 'Grant',
                },
            },
            messages: {
                duplicateKey:
                    'A permission is already associated with this key!',
            },
        },
        about: {
            version: 'Version',
            copyright: 'Copyright {year} contributors. All rights reserved.',
            tagline: 'The only ETCD GUI for web, desktop and mobile',
            actions: {
                bugs: 'Report a bug',
                donate: 'Donate',
                updates: 'Check for updates',
                github: 'Visit Github page',
                credits: 'Show contributors',
            },
        },
        userManager: {
            title: 'Users',
            subtitle: 'Roles',
            help: {
                text: `This is the list of **all ETCD users**. Here you may:

                * Order the list by any column (click the **column title**).
                * Filter the list by any column (use the **search box**).
                * Delete selected users (click **remove**).
                * Delete all users (click **purge**).
                * You may also edit or delete individual users using the appropriate **action icon**.`,
            },
            columns: {
                name: 'Name',
            },
            actions: {
                edit: 'Edit user',
                remove: 'Remove user',
            },
        },
        userEditor: {
            title: 'Users',
            help: {
                text: `You can **edit** or **create** users here.

                * Once created, you **cannot** change the user's name. It must be **unique**.
                * You may also **change a user's password** here.
                * Roles get assigned and revoked **immediately**, you don't need to click save.

                > Passwords are validated against a password rule. If you don't like the default rule, you may change it in the **settings tab**.`,
            },
            subtitle: 'Roles',
            fields: {
                name: {
                    label: 'name',
                    placeholder: 'Type in a name..',
                    tooltip: 'The name of the user',
                },
                password: {
                    label: 'Password',
                    placeholder: 'Type in a value..',
                    tooltip:
                        'The password of the user. Must be 8-16 characters, no whitespace. Must include captital letters and numbers.',
                },
                pwcheck: {
                    label: 'Confirm password',
                    placeholder: 'Type in a value..',
                    tooltip: 'Confirm the password',
                },
            },
            messages: {
                pwmatch: 'The passwords do not match',
                invalid: 'The password is invalid',
                norights: 'There are no roles. Add one now!',
            },
        },
    },
};
