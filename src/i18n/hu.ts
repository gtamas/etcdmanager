export default {
    hu: {
        $vuetify: {
            dataIterator: {
                rowsPerPageText: 'Elem oldalanként:',
                rowsPerPageAll: 'Mind',
                pageText: '{0}-{1} / {2}',
                noResultsText: 'Nincs egyező találat',
                nextPage: 'Következő oldal',
                prevPage: 'Előző oldal',
            },
            dataTable: {
                rowsPerPageText: 'Elem oldalanként:',
            },
            noDataText: 'Nincs elérhető adat',
            carousel: {
                prev: 'Korábbi vizuális',
                next: 'Következő vizuális',
            },
        },
        menu: {
            settings: 'Beállítások',
            manageCluster: 'Klaszter menedzselése',
            manageKeys: 'Kulcsok menedzselése',
            manageWatchers: 'Figyelők menedzselése',
            manageUsers: 'Felhasználók menedzselése',
            manageRoles: 'Szerepek menedzselése',
            about: 'Az alkalmazásról',
        },
        common: {
            items: {
                watcher: 'figyelő | figyelők',
                key: 'kulcs | kulcsok',
                role: 'szerep | szerepek',
                action: 'művelet | műveletek',
                permission: 'engedély | engedélyek',
            },
            titles: {
                new: 'Új',
                edit: 'Szerkeszt',
            },
            actions: {
                add: 'Hozzáad',
                save: 'Mentés',
                purgeAll: {
                    label: 'Tisztít',
                    tooltip: 'Mindet tisztít',
                },
                create: {
                    label: 'Hozzáad',
                    tooltip: 'Újat hozzáad',
                },
                removeAll: {
                    label: 'Eltávolít',
                    tooltip: 'Kiválasztott(ak) eltávolítása',
                },
                close: {
                    label: 'Bezár',
                },
            },
            lists: {
                nodata: 'Nincs megjeleníthető adat',
                filter: 'Adat szűrése',
            },
            validation: {
                required: 'Kötelező elem',
                alphanumeric: 'Számmal és betűvel adható meg',
                int: 'Azt értéknek számnak kell lennie',
                pattern: 'Érvénytelen reguláris kifejezés',
            },
            messages: {
                success: 'Sikeres művelet',
                error: 'A művelet nem végrehajtható',
            },
        },
        settings: {
            title: 'Beállítások',
            etcd: {
                title: 'ETCD',
                fields: {
                    endpoint: {
                        label: 'Végpont',
                        placeholder: 'Írjon be URL-t, vagy IP-címet',
                        tooltip: 'Az ETCD-szerver URL-je, vagy IP-címe.',
                    },
                    port: {
                        label: 'Port',
                        placeholder: 'Számmal adható meg',
                        tooltip:
                            'Az ETCD-service portjának száma. Alapesetben 2317',
                    },
                    retries: {
                        label: 'Újrapróbálkozás',
                        tooltip: `Újrapróbálkozás egy másik szerveren (amennyiban van), ha GRPC hibából fakadóan sikertelen a lekérdezés. Ez a beállítás a szerverrel való kapcsolat
                        megszakadását kevesbé eredményezi, de dominó hatást okozhat, ha valamilyen művelet által okozott hibát a GRPC külső, vagy belső hálózati hibának jelez.`,
                    },
                    timeout: {
                        label: 'Időtúllépés',
                        placeholder: 'Számmal adható meg',
                        tooltip:
                            'Az időtúllépés előtti várakozás időtartama ezredmásodpercben. Alapesetben 30 másodperc.',
                    },
                    apiVersion: {
                        label: 'API verzió',
                        tooltip:
                            'A végpont által bíztosított protokoll verziója',
                    },
                },
            },
            auth: {
                title: 'Autentikáció',
                fields: {
                    username: {
                        label: 'Felhasználónév',
                        placeholder: 'Betűkkel és számokkal adható meg',
                        tooltip:
                            'ETCD felhasználónév. Hagyja üresen, ha az autentikáció nincs engedélyezve',
                    },
                    password: {
                        label: 'Jelszó',
                        placeholder: 'Betűkkel és számokkal adható meg',
                        tooltip:
                            'ETCD jelszó. Hagyja üresen, ha az autentikáció nincs engedélyezve.',
                    },
                },
            },
            watchers: {
                title: 'Figyelők',
                fields: {
                    loadWatchers: {
                        label:
                            'Felhasználó által megadott összes figyelő aktiválása elinduláskor',
                        tooltip:
                            'Ha be van kapcsolva, akkor az összes, felhasználó által megadott figyelő automatikusan aktiválódik az alkalmazás elindulásakor.',
                    },
                    unloadWatchers: {
                        label:
                            'Felhasználó által megadott összes figyelő deaktiválása bezáráskor',
                        tooltip:
                            'Ha be van kapcsolva, akkor az összes, felhasználó által megadott figyelő automatikusan deaktiválódik az alkalmazás bezárásakor.',
                    },
                    errorListener: {
                        label: 'ETCD hibamonitor',
                        tooltip:
                            'Ha be van kapcsolva, akkor a figyelők minden ETCD hibát kiírnak a konzolra.',
                    },
                    disconnectListener: {
                        label: 'Figyelők szétkapcsolódásának monitorozása',
                        tooltip:
                            'Ha be van kapcsolva, akkor a figyelők szétkapcsolódását az ETCD szervertől kiírja a konzolra.',
                    },
                    reconnectListener: {
                        label: 'Figyelők újrakapcsolódásának monitorozása',
                        tooltip:
                            'Ha be van kapcsolva, akkor a figyelők újrakapcsolódását az ETCD szerverhez kiírja a konzolra.',
                    },
                },
            },
            users: {
                title: 'Felhasználók',
                fields: {
                    pwpattern: {
                        label: 'Jelszó minta',
                        placeholder: 'Reguláris kifejezéssel adható meg',
                        tooltip:
                            'A felhasználói jelszavak validálására szolgáló minta. Hagyja üresen az alapbeállításként megadott minta használatához (8 - 16 karakter, nagybetűket és számokat tartalmazhat)',
                    },
                },
            },
            misc: {
                title: 'Egyéb',
                fields: {
                    language: {
                        label: 'Nyelv',
                        tooltip: 'A program nyelve.',
                    },
                    animateBg: {
                        label: 'Háttéranimáció ki/be kapcsolása.',
                        tooltip: 'Animált háttér ki-, bekapcsolása.',
                    },
                    bg: {
                        label: 'Háttér engedélyezése.',
                        tooltip: 'Háttérkép ki-, bekapcsolása.',
                    },
                },
            },
            actions: {
                submit: 'Elküld',
                next: 'Következő',
            },
            messages: {
                success: 'A beállítások sikeresen elmentve.',
                ipOrUrl: 'Az IP-cím, vagy URL érvénytelen.',
            },
        },
        cluster: {
            title: 'Klaszter',
            subtitle: 'Csomópont',
            header: {
                clusterId: 'Klaszter ID',
                memberId: 'Tag ID',
                revision: 'Felülvizsgálat',
                raftTerm: 'Raft terminus',
            },
            columns: {
                id: 'ID',
                clientUrls: 'Kliens URL',
                peerUrls: 'Társ URL',
            },
            actions: {
                check: 'Tag állapot ellenőrzés',
                status: 'Státusz infó lekérés',
            },
            dialogs: {
                info: {
                    title: 'Info',
                    labels: {
                        db: 'DB',
                        leader: 'Vezető',
                        raftIndex: 'Raft index',
                        raftTerm: 'Raft terminus',
                        version: 'Verzió',
                    },
                    actions: {
                        close: 'Bezárás',
                    },
                },
            },
        },
        keyManager: {
            title: 'Kulcsok',
            columns: {
                key: 'Kulcs',
                value: 'Érték',
            },
            actions: {
                touchAll: {
                    label: 'Hozzáad',
                    tooltip: 'Kiválasztott kulcsok hozzáadása',
                },
                edit: 'Kulcs szerkesztése',
                remove: 'Kulcs eltávolítása',
                touch: 'Kulcs hozzáadása',
            },
        },
        keyEditor: {
            title: 'Kulcsok',
            fields: {
                key: {
                    label: 'Kulcs',
                    placeholder: 'Írja be a nevet.',
                    tooltip: 'Az ETCD kulcs neve',
                },
                value: {
                    label: 'Érték',
                    placeholder: 'Írja be az értéket.',
                    tooltip: 'A kulcshoz társított érték',
                },
            },
            messages: {
                duplicateKey: 'Ez a kulcs már létezik!',
            },
        },
        purgeDialog: {
            title: 'Figyelem!',
            content:
                'Ez eltávolítja az ÖSSZESET a következőből: {type}. A művelet nem visszavonható.',
            actions: {
                remove: 'Eltávolítás',
                cancel: 'Vissza',
            },
        },
        deleteDialog: {
            title: 'Figyelem!',
            content:
                'A {type} törlése véglegesen eltávolítja azt. A művelet nem visszavonható.',
            actions: {
                remove: 'Eltávolítása',
                cancel: 'Vissza',
            },
        },
        noSelectionDialog: {
            title: 'Figyelem!',
            content: 'Először válasszon ki elemeket!',
            actions: {
                ok: 'Rendben',
            },
        },
        watcherManager: {
            title: 'Figyelők',
            columns: {
                key: 'Kulcs',
                name: 'Név',
                prefix: 'Előtag',
            },
            actions: {
                notificationOn: {
                    label: 'Be',
                    tooltip: 'Kiválasztott figyelők aktiválása',
                },
                notificationOff: {
                    label: 'Ki',
                    tooltip: 'Kiválasztott figyelők deaktiválása',
                },
                edit: 'Figyelő szerkesztése',
                remove: 'Figyelő eltávolítása',
                status: 'Figyelő státuszának ki/be kapcsolása',
            },
        },
        watcherEditor: {
            fields: {
                name: {
                    label: 'Név',
                    placeholder: 'Értékkel adható meg',
                    tooltip: 'A figyelő neve.',
                },
                key: {
                    label: 'Kulcs',
                    placeholder: 'Értékkel adható meg',
                    tooltip: 'A kulcs, amivel a figyelő társítva van.',
                },
                prefix: {
                    label: 'Előtag',
                    tooltip:
                        'Minden, ezzel az előtaggal ellátott kulcs figyelve van, ha be van kapcsolva.',
                },
            },
            actionList: {
                columns: {
                    action: 'Akció',
                    event: 'Esemény',
                },
                actions: {
                    edit: 'Akció szerkesztése',
                    remove: 'Akció eltávolítása',
                },
            },
            actions: {
                actions: {
                    label: 'Akciók',
                },
            },
            messages: {
                duplicate: 'Már létezik ilyen nevű figyelő',
            },
        },
        actionEditor: {
            title: 'Akciók',
            fields: {
                action: {
                    label: 'Akció',
                    tooltip:
                        'Az esemény bekövetkeztekor lesz az akció végrehajtva.',
                },
                event: {
                    label: 'Esemény',
                    tooltip: 'Esemény típusa',
                },
            },
        },
        roleManager: {
            title: 'Szerepek',
            columns: {
                name: 'Név',
            },
            actions: {
                edit: 'Szerep szerkesztése',
                remove: 'Szerep eltávolítása',
            },
        },
        roleEditor: {
            fields: {
                name: {
                    label: 'Név',
                    placeholder: 'Érték adható meg',
                    tooltip: 'A szerep neve.',
                },
            },
            actions: {
                edit: 'Engedély szerkesztése',
                revoke: 'Engedély visszavonása',
                permissions: 'Engedélyek',
            },
            columns: {
                key: 'Kulcs',
                permission: 'Engedély',
                prefix: 'Előtag',
            },
        },
        permissionEditor: {
            fields: {
                key: {
                    label: 'Kulcs',
                    placeholder: 'Értéket írjon be',
                    tooltip:
                        'A kulcs neve, amihez a szerep hozzáférést biztosít.',
                },
                permission: {
                    label: 'Engedélyek',
                    tooltip:
                        'Az engedély, amihez a szerep hozzáférést biztosít. Ha mindegyiket szeretné, akkor állítsa be az írást és az olvasást is.',
                },
                prefix: {
                    label: 'Ez egy előtag',
                    tooltip:
                        'Ha be van pipálva, akkor a szerep az összes ezzel az előtaggal ellátott kulcsot alkalmazza.',
                },
            },
            actions: {
                grant: {
                    label: 'Biztosít',
                },
            },
            messages: {
                duplicateKey:
                    'Az engedély már hozzá van kapcsolva ehhez a kulcshoz!',
            },
        },
        about: {
            version: 'Verzió',
            copyright:
                'Közreműködők szerzői joga {year}. Minden jog fenntartva.',
            tagline:
                'Az egyetlen grafikus ETCD menedzser weben, desktopon és mobilon.',
            actions: {
                bugs: 'Hiba jelentése',
                donate: 'Támogatás',
                updates: 'Frissítések ellenőrzése',
                github: 'Github oldal meglátogatása',
                credits: 'Közreműködők mutatása',
            },
        },
        userManager: {
            title: 'Felhasználók',
            columns: {
                name: 'Név',
            },
            actions: {
                edit: 'Felhasználó szerkesztése',
                remove: 'Felhasználó eltávolítása',
            },
        },
        userEditor: {
            title: 'Felhasználók',
            subtitle: 'Szerepek',
            fields: {
                name: {
                    label: 'Név',
                    placeholder: 'Név adható meg',
                    tooltip: 'A felhasználó neve',
                },
                password: {
                    label: 'Jelszó',
                    placeholder: 'Jelszó adható meg',
                    tooltip:
                        'A felhasználó jelszava. 8-16 karakternek kell lennie, szóközök nélkül. Nagybetűkből és számokból kell állnia.',
                },
                pwcheck: {
                    label: 'Jelszó megerősítése',
                    placeholder: 'Jelszó adható meg',
                    tooltip: 'Jelszó megerősítése',
                },
            },
            messages: {
                pwmatch: 'A jelszók nem egyeznek meg',
                invalid: 'A jelszó érvénytelen',
                norights: 'Nincsenek szerepek. Adjon hozzá egyet!',
            },
        },
    },
};
