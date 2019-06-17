export default {
    en: {
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
            actions: {
                add: 'Add',
                save: 'Save',
                purgeAll: {
                    label: 'Purge',
                    tooltip: 'Purge all',
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
            }
        },
        settings: {
            title: 'Settings',
            etcd: {
                title: 'ETCD',
                fields: {
                    endpoint: {
                        label: 'Endpoint',
                        placeholder: 'Type in an URL..',
                        tooltip: 'The URL or IP address of the ETCD server',
                    },
                    port: {
                        label: 'Port',
                        placeholder: 'Type in an number..',
                        tooltip: 'The port number of the ETCD service. Defaults to 2317',
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
                        tooltip: 'Duration in milliseconds to wait while connecting before timing out. Defaults to 30 seconds.',
                    },
                    apiVersion: {
                        label: 'API version',
                        tooltip: 'The protocol version supported by the endpoint',
                    }
                }
            },
            auth: {
                title: 'Auth',
                fields: {
                    username: {
                        label: 'Username',
                        placeholder: 'Type in an alpanumeric value..',
                        tooltip: 'ETCD username. Leave blank if authentication is not enabled.',
                    },
                    password: {
                        label: 'Password',
                        placeholder: 'Type in an alpanumeric value..',
                        tooltip: 'ETCD password. Leave blank if authentication is not enabled.',
                    },
                }
            },
            watchers: {
                title: 'Watchers',
                fields: {
                    loadWatchers: {
                        label: 'Activate all watchers on startup',
                        tooltip: 'If turned on, all user defined watchers will be automatically activated when the app starts.',
                    },
                    errorListener: {
                        label: 'Watch ETCD errors',
                        tooltip: 'If turned on, a watcher will print all ETCD errors the console.',
                    },
                    disconnectListener: {
                        label: 'Watch watcher disconnects',
                        tooltip: 'If turned on, a watcher will print a message to the console whenever a watcher diconnects from ETCD.',
                    },
                    reconnectListener: {
                        label: 'Watch watcher reconnects',
                        tooltip: 'If turned on, a watcher will print a message to the console whenever a watcher reconnects to ETCD.',
                    },
                }
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
                }
            },
            actions: {
                submit: 'Submit',
                next: 'Next',
            }

        },
        cluster: {
            title: 'Cluster',
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
                }
            }
        },
        keyManager: {
            title: 'Keys',
            columns: {
                key: 'Key',
                value: 'Value',
            },
            actions: {
                touchAll: {
                    label: 'Touch',
                    tooltip: 'Touch selected keys',
                },
                edit: 'Edit key',
                remove: 'Remove key',
                touch: 'Touch key',
            }
        },
        keyEditor: {
            title: 'Keys',
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
        },
        purgeDialog: {
            title: 'Attention!',
            content: 'This will permanently remove ALL {type}. This action cannot be undone.',
            actions: {
                remove: 'Remove',
                cancel: 'Cancel',
            }
        },
        deleteDialog: {
            title: 'Attention!',
            content: 'Deleting a {type} will permanently remove it. This action cannot be undone.',
            actions: {
                remove: 'Remove',
                cancel: 'Cancel',
            }
        },
        noSelectionDialog: {
            title: 'Attention!',
            content: 'Please select some items first!',
            actions: {
                ok: 'OK',
            }
        },
        watcherManager: {
            title: 'Watchers',
            columns: {
                key: 'Key',
                name: 'Name',
                prefix: 'Prefix',
            },
            actions: {
                notificationOn: {
                    label: 'On',
                    tooltip: 'Activate selected watchers',
                },
                notificationOff: {
                    label: 'Off',
                    tooltip: 'Deactivate selected watchers',
                },
                edit: 'Edit watcher',
                remove: 'Remove watcher',
                status: 'Toggle watcher status',
            }
        },
        watcherEditor: {
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
                    tooltip: 'If checked all keys with this prefix will be watched.',
                }
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
                }
            },
        },
        roleManager: {
            title: 'Roles',
            columns: {
                name: 'Name',
            },
            actions: {
                edit: 'Edit role',
                remove: 'Remove role',
            }
        },
        roleEditor: {
            fields: {
                name: {
                    label: 'Name',
                    placeholder: 'Type in a value..',
                    tooltip: 'The name of the role.',
                }
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
                    tooltip: 'The permission this role grants. If your want eveything, choose "both".',
                },
                prefix: {
                    label: 'This is a prefix',
                    tooltip: 'If checked, the role will apply to all keys with this prefix.',
                }
            },
            actions: {
                grant: {
                    label: 'Grant',
                },
            },
        },
        about: {
            version: 'Version',
            copyright: 'Copyright {year} contributors. All rights reserved.',
            tagline: 'The only ETCD GUI for web, desktop and mobile',
            actions: {
                donate: 'Donate',
                updates: 'Check for updates',
                github: 'Visit Github page',
                credits: 'Show contributors',
            }
        }
    },
};
