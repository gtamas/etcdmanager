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
        appMenu: {
            file: 'Fájl',
            services: 'Szolgáltatások',
            hide: 'Elrejt',
            hideothers: 'Többit elrejt',
            unhide: 'Megjelenít',
            quit: 'Kilépés',
            edit: 'Szerkesztés',
            undo: 'Visszavonás',
            redo: 'Újra',
            cut: 'Kivágás',
            copy: 'Másolás',
            paste: 'Beillesztés',
            pasteAndMatchStyle: 'Formázott beillesztés',
            delete: 'Törlés',
            selectAll: 'Mindet kijelöli',
            view: 'Nézet',
            reload: 'Újratöltés',
            forcereload: 'Kényszerített újratöltés',
            resetzoom: 'Alapértelemezett nagyítás',
            zoomin: 'Nagytítás',
            zoomout: 'Kicsinyítés',
            togglefullscreen: 'Teljes képernyő ki/be',
            toggledevtools: 'Fejlesztői eszközök ki/be',
            manage: 'Kezelés',
            settings: 'Beállítások',
            cluster: 'Klaszter',
            keys: 'Kulcsok',
            watchers: 'Figyelők',
            roles: 'Szerepek',
            users: 'Felhasználók',
            beta: 'Béta',
            reportBug: 'Hiba jelentése',
            help: 'Súgó',
            gotoWiki: 'Ugrás a Wiki-re',
            about: 'About',
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
            help: {
                tooltip: 'Mutassa a segtítség panelt',
                infoTitle: `Tudta?`,
                tabs: {
                    info: 'Info',
                    shortcuts: 'Gyorsbillentyűk',
                },
                shortcuts: {
                    save: 'Adatok ellenőrzése és mentése',
                    help: 'Mutassa ezt a panelt',
                    enter: 'Adatok ellenőrzése és mentése',
                    esc: 'Szerkesztő bezárása',
                    openEditor: 'Szerkesztő megnyitása',
                    closeEditor: 'Szerkesztő bezárása',
                    search: 'Fókusz a kereső mezőre',
                    purge: 'Minden elem törlése',
                    remove: 'Kiválasztott elemek törlése',
                },
            },
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
                copyClipboardSuccess: 'Sikeresen vágólapra másolva.',
                copyClipboardError: 'A vágólapra másolás nem sikerült.',
            },
        },
        settings: {
            title: 'Beállítások',
            help: {
                etcd: `* Itt konfigurálhatja az ETCD kapcsolatot es néhány opcionális beállítást.
                * A legfontosabb a **host** és a **port** beállítása, mivel ezek szükségesek a kapcsolódáshoz.
                * A **host** értéke egy **IPv4 cím** vagy **URL** lehet.
                * A **port** értéke az a port szám amin az ETCD figyel. Ez alapértelmezésben **2379**.

                > Ha az ETCD beállítások hibásak vagy az ETCD nem elérhető, **nem fog tudni elnavigálni** a beállítások képernyőről.
                Biztosítsa, hogy mentésre kerüljenek a bállítások és az ETCD valóban fusson a megadott címen és porton.
                `,
                auth: `* Itt módosíthatja az autentikációs beállításokat.
                * A **username** és **password** mezők az autentikáló ETCD felhasználó nevét és jelszavát tartalmazzák.

                > Ehhez az ETCD-ben [engedélyezni kell](http://etcd.io) az autentikácó használatát.
                Ez alapértelemzés szerint ki van kapcsolva. Ha nincs szüksége autentikációra, **hagyja üresen** ezeket a mezőket.`,
                watchers: `* A figyelők (eseménykezelők) beállításait találja itt.
                * Engedélyezheti a figyelők **automatikus betöltését** az app indításakor (**ajánlott**).
                * Engedélyezheti vagy letilthatja az alapértelmezett figyelőket.

                > A figyelők addig aktvak amíg az app fut. Ez azt jelenti, hogy **nem kap éretesítéseket** az app bezárása után.
                Azonban ha bekapcsolja a fent említett auto betöltést, a figyelők automatikusan aktiválódnak az app következő indításakor.`,
                users: `* Ezek itt az **ETCD felhasználók** kezelésével kapcsolatos beállítások.
                * Az alábbi jelszó minta új felhasználó létrehozásakor és jelszó változtatásakor egyaránt alkalmazásra kerül.

                > Ha nem ad meg mintát, akkor az alapértelmezett lesz használva: a jelszó 8-16 karakter, nincs benne szóköz és az angol
                ABC kis és nagy betüit is tartalmaznia kell.`,
                misc: `* Egyéb beálltások.
                    * Többek között, itt választhat **nyelvet**.`,
                shortcuts: {
                    leftArrowLabel: 'bal nyil',
                    rightArrowLabel: 'jobb nyil',
                    leftArrow: 'Előző fül',
                    rightArrow: 'Következő Fül',
                },
            },
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
                testConnection: 'Kapcsolat teszt',
            },
            messages: {
                success: 'A beállítások sikeresen elmentve.',
                ipOrUrl: 'Az IP-cím, vagy URL érvénytelen.',
                error: 'A megadott adatok egyike érvénytelen vagy kötelező adat hiányzik!',
                connectSuccess: 'A kapcsolat létrejött',
            },
        },
        cluster: {
            title: 'Klaszter',
            help: {
                text: `* Alapvető információk az ETCD klaszterről és annak elemeiről.
                * További részletekéert egy node-ról, kattintson az **info** ikonra.
                * Ellenőrizheti bármely node pillanatnyi állapotát a **szív** inonra kattintva.`,
            },
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
            help: {
                text: `Ez az ETCD-ben tárolt összes **kulcs** listája.

                * Rendezheti a listát bármely oszlop alapján (az **oszlop fejlécére** kattintva).
                * Kereshet bármely kulcszsó szerint (használja a **kereső mezőt**).
                * Letörölheti a kiválasztott kulcsokat (kattintson az **Eltávolít**) gombra.
                * Letörölhet minden kulcsot (kattintson a **Tisztít** gombra).
                * Frissítheti a kiválasztott kulcsokat (touch) (kattintson a **Frissít** gombra)
                * Módosíthatja, törölheti vagy frissítheti az egyes kulcsokat a megfelelő **akció ikon** használatával.`,
                shortcuts: {
                    touch: 'Kiválasztott kulcsok frissítése',
                },
            },
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
            subtitle: 'Revíziók',
            help: {
                text: `Itt kulcsokat **hozhat létre** és **szerkeszthet**.

                * Léttrehozás után **nem** változtathatja a kulcs nevét. A névnek **egyedinek** kell lennie.`,
            },
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
            buttons: {
                revisions: 'Revíziók',
                revisionsHide: 'Revíziók off',
            },
            messages: {
                duplicateKey: 'Ez a kulcs már létezik!',
            },
            columns: {
                key: 'Előző érték',
                version: 'Verzió',
                createRev: 'Létrehoz Rev',
                modRev: 'Mod Rev',
                type: 'Típus',
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
            help: {
                text: `Ez a **figyelők** listája.

                * Rendezheti a listát bármely oszlop alapján (az **oszlop fejllécére** kattintva).
                * Kereshet bármely kulcszsó szerint (használja a **kereső mezőt**).
                * Letörölheti a kiválasztott figyelőket (kattintson az **Eltávolít**) gombra.
                * Letörölhet minden figyelőt (kattintson **Tisztít** gombra).
                * Aktiválhatja vagy deaktiválhatja a kiválasztott figyelőket (kattintson a **harang** ikonra)
                * Módosíthajta, törölheti, aktiválhatja az egyes figyelőket a megfelelő **akció ikon** használatával,

                > A figyelők addig kapnak értesítéseket amíg aktívak, azaz amíg **az app fut** (vagy amíg le nem állítja őket). Ha megszakad az ETCD kapcsolat, a
                figyelők újrakonnektálnak amint lehetséges és megkapják a kihagyott eseményeket is.`,
                shortcuts: {
                    toggle: 'Kiválasztott figyelők aktiválása / deaktiválása',
                },
            },
            columns: {
                key: 'Kulcs',
                name: 'Név',
                prefix: 'Előtag',
            },
            actions: {
                notificationToggle: {
                    label: 'Be / Ki',
                    tooltip: 'Kiválasztottak ki / be',
                },
                edit: 'Figyelő szerkesztése',
                remove: 'Figyelő eltávolítása',
                status: 'Figyelő státuszának ki/be kapcsolása',
            },
        },
        watcherEditor: {
            help: {
                text: `Itt létező figyelőket **módosíthat** vagy újakat **kreálhat**.

                * Létrehozás után **nem** változtathatja meg a figyelő nevét. A névnek **egyedinek** kell lennie.
                * Egy figyelő dolgozhat egyetlen kulcsal. (**ne használja ** az előtagot)
                * Egy figyelő figyelhet bizonyos előtaggal rendelkező kulcsokat is. (**használja** az előtagot)
                * Egy figyelő akárhány **akciót** végrehajthat, de legalább **egyet** hozzá kell rendelni.`,
                shortcuts: {
                    addAction: 'Űj akció hozzáadása',
                },
            },
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
                duplicateAction: 'Ilyen típusu akció már létezik',
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
            help: {
                text: `Ez az ETCD **szerepkörök** listája.

                * Rendezheti a listát bármely oszlop alapján (az **oszlop fejllécére** kattintva).
                * Kereshet bármely kulcszsó szerint (használja a **kereső mezőt**).
                * Letörölheti a kiválasztott szerepeket (kattintson az **Eltávolít**) gombra.
                * Letörölhet minden szerepet (kattintson **Tisztít** gombra).
                * Módosíthatja vagy törölheti az egyes szerepeket a megfelelő **akció ikon** használatával.`,
            },
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
            help: {
                text: `Itt létezó szerepet **módosithat** vagy újat **kreálhat**.

                * Létrehozás után **nem** módosíthatja a szerep nevét. A névnek **egyedinek** kell lennie.
                * Minden szerephez jogokat kell rendelni, **legalább egyet**.
                * A jogok **azonnal** kiosztásra vagy visszavonásra kerülnek, ehhez nem kell a mentésre kattintania.`,
                shortcuts: {
                    addPermission: 'Új jod hozzáadása',
                },
            },
            fields: {
                name: {
                    label: 'Név',
                    placeholder: 'Érték adható meg',
                    tooltip: 'A szerep neve.',
                },
            },
            actions: {
                edit: 'Jog szerkesztése',
                revoke: 'Jog visszavonása',
                permissions: 'Jogok',
            },
            columns: {
                key: 'Kulcs',
                permission: 'Jog',
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
                    label: 'Jogok',
                    tooltip:
                        'A jog, amihez a szerep hozzáférést biztosít. Ha mindegyiket szeretné, akkor állítsa be az írást és az olvasást is.',
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
            help: {
                text: `Ez az **ETCD felhasználók** listája.

                * Rendezheti a listát bármely oszlop alapján (az **oszlop fejllécére** kattintva).
                * Kereshet bármely kulcszsó szerint (használja a **kereső mezőt**).
                * Letörölheti a kiválasztott felhasználókat (kattintson az **Eltávolít**) gombra.
                * Letörölhet minden felhasználót (kattintson **Tisztít** gombra).
                * Módosíthatja vagy törölheti az egyes felhasználókat a megfelelő **akció ikon** használatával.`,
            },
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
            help: {
                text: `Itt létező felhasználó jelszavát **módosíthatja** vagy új usert **kreálhat**.

                * Létrehozás után **nem** változtathatja meg a user nevét. A névnek **egyedinek** kell lennie.
                * A szerepkörök **azonnal** kiosztásra vagy visszavonásra kerülnek, ehhez nem kell a mentésre kattintania.

                > A jelszavaknak meg kell felelnie egy jelszó mintának. Ha az alapértelmezett minta nem felel meg, megváltoztathatja a **beállítások fülön**.`,
            },
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
