<template>
    <v-layout align-start justify-center row>
        <v-flex pa-1 grow fill-height>
            <v-expansion-panel focusable dark class="help" v-model="help" :readonly="true">
                <v-expansion-panel-content dark class="darker">
                    <template v-slot:actions>
                        <v-tooltip data-test="watcher-manager.common-help-tooltip.v-tooltip" slot="prepend" bottom max-width="200">
                            <v-icon data-test="watcher-manager.common-help-tooltip.v-icon" @click="toggleHelp" slot="activator" color="primary" light medium>help</v-icon>
                            <span data-test="watcher-manager.common-help-tooltip.span">{{ $t('common.help.tooltip') }}</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:header>
                        <v-toolbar raised dark>
                            <v-toolbar-title data-test="watcher-manager.actions-title.v-toolbar-title">{{ $t('watcherManager.title') }}</v-toolbar-title>
                            <v-divider data-test="watcher-manager.actions-title.v-divider" class="mx-2" inset vertical></v-divider>
                            <v-spacer data-test="watcher-manager.actions-title.spacer"></v-spacer>
                            <v-text-field
                                data-test="watcher-manager.actions-filter.v-text-field"
                                dark
                                ref="search"
                                color="white"
                                v-model="filter"
                                prepend-icon="search"
                                :placeholder="$t('common.lists.filter')"
                            ></v-text-field>
                            <v-tooltip data-test="watcher-manager.actions-purgeall.v-tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn data-test="watcher-manager.actions-purgeall.v-btn" color="error" round dark @click="purge" v-on="on">
                                        <v-icon data-test="watcher-manager.actions-purgeall.v-icon">remove_circle</v-icon>
                                        <span data-test="watcher-manager.actions-purgeall-label.span">{{ $t('common.actions.purgeAll.label') }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="watcher-manager.actions-purgeall-tooltip.span">{{ $t('common.actions.purgeAll.tooltip') }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="watcher-manager.actions-create.v-tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn data-test="watcher-manager.actions-create.v-btn" color="primary" round dark @click="addItem" v-on="on">
                                        <v-icon data-test="watcher-manager.actions-create.v-icon">add</v-icon>
                                        <span data-test="watcher-manager.actions-create-label.span">{{ $t('common.actions.create.label') }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="watcher-manager.actions-create-tooltip.span">{{ $t('common.actions.create.tooltip') }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="watcher-manager.actions-remove.v-tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="watcher-manager.actions-remove.v-btn"
                                        color="primary"
                                        @click.stop="deleteMany"
                                        round
                                        dark
                                        v-on="on"
                                    >
                                        <v-icon data-test="watcher-manager.actions-remove.v-icon">delete</v-icon>
                                        <span data-test="watcher-manager.actions-remove-label.span">{{ $t('common.actions.removeAll.label') }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="watcher-manager.actions-create-tooltip.span">{{ $t('common.actions.removeAll.tooltip') }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="watcher-manager.actions-notificationtoggle.v-tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="watcher-manager.actions-notificationtoggle.v-btn"
                                        color="primary"
                                        @click.stop="toggleMany"
                                        round
                                        dark
                                        v-on="on"
                                    >
                                        <v-icon data-test="watcher-manager.actions-notificationtoggle.v-icon">notifications</v-icon>
                                        <span data-test="watcher-manager.actions-notificationtoggle-label.span">{{ $t('watcherManager.actions.notificationToggle.label') }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="watcher-manager.actions-notificationtoggle-tooltip.span">{{ $t('watcherManager.actions.notificationToggle.tooltip') }}</span>
                            </v-tooltip>
                        </v-toolbar>
                    </template>
                    <v-tabs data-test="watcher-manager.help-tabs.v-tabs" v-model="helpbar" dark color="black" slider-color="primary" grow>
                        <v-tab data-test="watcher-manager.help-tab-info.v-tab" ripple>{{ $t('common.help.tabs.info') }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <h2 data-test="watcher-manager.help-tab-infotitle.h2" class="title">{{ $t("common.help.infoTitle") }}</h2>
                                    <p data-test="watcher-manager.help-spacer-1.p" class="spacer"></p>
                                    <p
                                        data-test="watcher-manager.help-text.p" v-html="platformService.getHelp($t('watcherManager.help.text'))"
                                    ></p>
                                    <p data-test="watcher-manager.help-spacer-2.p" class="spacer"></p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab data-test="watcher-manager.help-tabs-shortcuts.v-tab" ripple>{{ $t('common.help.tabs.shortcuts') }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-openeditor-rounded.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + a` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-openeditor-label.p"
                                                class="label"
                                            >{{ $t("common.help.shortcuts.openEditor") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p data-test="watcher-manager.common-help-shortcuts-closeeditor-rounded.p" class="rounded">{{ `esc` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-closeeditor-label.p"
                                                class="label"
                                            >{{ $t("common.help.shortcuts.closeEditor") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-purge-rounded.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + p` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="watcher-manager.common-help-shortcuts-purge-label.p" class="label">{{ $t("common.help.shortcuts.purge") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-remove-rounded.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + r` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-remove-label.p"
                                                class="label"
                                            >{{ $t("common.help.shortcuts.remove") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-remove-rounded.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + o` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-remove-label.p"
                                                class="label"
                                            >{{ $t("watcherManager.help.shortcuts.toggle") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="watcher-manager.common-help-shortcuts-help-rounded.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + h` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="watcher-manager.common-help-shortcuts-help-label.p" class="label">{{ $t("common.help.shortcuts.help") }}</p>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                    <hr data-test="watcher-manager.blackline.hr" class="blackLine" />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-card raised dark>
                <v-data-table
                    :search="filter"
                    :headers="headers"
                    v-bind:items="watchers"
                    item-key="name"
                    select-all
                    v-model="selected"
                    :loading="loading"
                >
                    <v-progress-linear data-test="watcher-manager.actions.v-pogress-linear" v-slot:progress color="blue" indeterminate v-show="loading"></v-progress-linear>
                    <template v-slot:items="props">
                        <td>
                            <v-checkbox data-test="watcher-manager.actions.v-checkbox" v-model="props.selected" primary hide-details></v-checkbox>
                        </td>
                        <td data-test="watcher-manager.actions-name.td">{{ props.item.name }}</td>
                        <td data-test="watcher-manager.actions-key.td" class="text-xs-left">{{ props.item.key }}</td>
                        <td data-test="watcher-manager.actions-prefix.td" class="text-xs-left">{{ props.item.prefix }}</td>
                        <td class="justify-center layout px-0">
                            <v-tooltip data-test="watcher-manager.actions-edit.v-tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-icon data-test="watcher-manager.actions-edit.v-icon" small @click="editItem(props.item)" v-on="on">edit</v-icon>
                                </template>
                                <span data-test="watcher-manager.actions-edit.span">{{ $t('watcherManager.actions.edit') }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="watcher-manager.actions-remove.v-tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="watcher-manager.actions-remove.v-icon"
                                        small
                                        slot="activator"
                                        @click="deleteSingle(props.item)"
                                        v-on="on"
                                    >delete</v-icon>
                                </template>
                                <span data-test="watcher-manager.actions-remove.span">{{ $t('watcherManager.actions.remove') }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="watcher-manager.actions-status.v-tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="watcher-manager.actions-status.v-icon"
                                        small
                                        slot="activator"
                                        @click="toggleWatcher(props.item)"
                                        v-on="on"
                                    >{{ props.item.activated ? 'notifications' : 'notifications_off'}}</v-icon>
                                </template>
                                <span data-test="watcher-manager.actions-status.span">{{ $t('watcherManager.actions.status') }}</span>
                            </v-tooltip>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex pa-1 shrink>
            <v-expand-x-transition>
                <watcher-editor
                    :data="currentItem"
                    :mode="operation"
                    v-on:cancel="cancelEdit"
                    v-on:reload="load"
                    v-if="editor"
                ></watcher-editor>
            </v-expand-x-transition>
        </v-flex>

        <delete-dialog
            :open="deleteDialog"
            :itemName="'watcher'"
            v-on:confirm="confirmDelete"
            v-on:cancel="cancelDelete"
        ></delete-dialog>
        <purge-dialog
            :open="purgeDialog"
            :itemName="'watchers'"
            v-on:confirm="confirmPurge"
            v-on:cancel="cancelPurge"
        ></purge-dialog>
        <no-selection-dialog :open="noSelection" v-on:close="closeNoSelection"></no-selection-dialog>
    </v-layout>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { WatcherEntry, GenericObject } from '../../types';
import WatcherService from '../services/watcher.service';
import { CrudBase, List } from '../lib/crud.class';
import WatcherEditor from './watcher-editor.vue';
import Messages from '@/lib/messages';

class WatcherManagerError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'WatcherManagerError';
    }
}

@Component({
    name: 'watcher-manager',
    components: {
        'watcher-editor': WatcherEditor,
    },
})
export default class WatcherManager extends CrudBase implements List {
    public watchers: WatcherEntry[] = [];
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'name',
        },
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'key',
        },
        { text: '', value: 'prefix', sortable: true },
    ];

    public etcd: WatcherService;

    constructor() {
        super();
        // @ts-ignore
        this.etcd = new WatcherService(
            // @ts-ignore
            this.$ls,
            this.$store.state.connection.getClient()
        );
    }

    mounted() {
        this.keyboardEvents.bind('meta+o', () => {
            this.toggleMany();
        });
    }

    created() {
        this.load();
        this.translateHeaders(
            'watcherManager.columns.name',
            'watcherManager.columns.key',
            'watcherManager.columns.prefix'
        );
    }

    private async deactivateWatcher(
        watcher: WatcherEntry
    ): Promise<WatcherManager | WatcherManagerError> {
        const listeners = this.$store.state.listeners;
        const listener = listeners.get(watcher.name);
        if (listener) {
            try {
                await listener.cancel();
                watcher.activated = false;
                this.$store.commit('watcher', { key: watcher.name, op: 'del' });
            } catch (e) {
                this.$store.commit('message', Messages.error(e));
            }
        }
        return Promise.resolve(this);
    }

    public async activateWatcher(
        watcher: WatcherEntry
    ): Promise<WatcherManager | WatcherManagerError> {
        try {
            await this.etcd.activateWatcher(watcher);
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
        }

        return Promise.resolve(this);
    }

    private async unregisterWatchers(
        toBeRemoved: string[]
    ): Promise<WatcherManager | WatcherManagerError> {
        try {
            for (const watcherName of toBeRemoved) {
                const listener = this.$store.state.listeners.get(watcherName);
                if (listener) {
                    await listener.cancel();
                    this.$store.commit('watcher', {
                        key: watcherName,
                        op: 'del',
                    });
                }
            }
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
        }

        return Promise.resolve(this);
    }

    public async toggleWatcher(watcher: WatcherEntry): Promise<WatcherManager> {
        if (watcher.activated) {
            await this.deactivateWatcher(watcher);
        } else {
            await this.activateWatcher(watcher);
        }

        return Promise.resolve(this);
    }

    public load(): Promise<WatcherManager> {
        this.loading = true;
        this.watchers = this.etcd.listWatchers();
        this.loading = false;
        return Promise.resolve(this);
    }

    public async confirmPurge(): Promise<WatcherManager> {
        try {
            // @ts-ignore
            await CrudBase.options.methods.confirmPurge.call(this);
            const listeners = this.$store.state.listeners.values();
            for (const watcher of listeners) {
                await watcher.cancel();
            }

            this.$store.commit('watcher', { op: 'clear' });
            await this.load();
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return Promise.resolve(this);
    }

    public async toggleMany(): Promise<WatcherManager> {
        if (this.hasSelection()) {
            this.noSelection = false;
            const watcherNames = this.getSelectedKeys('name');
            for (const name of watcherNames) {
                const watcher = this.watchers.find(w => w.name === name);
                if (watcher && watcher.activated) {
                    await this.deactivateWatcher(watcher as WatcherEntry);
                } else {
                    await this.activateWatcher(watcher as WatcherEntry);
                }
            }
            Messages.success();
        } else {
            this.noSelection = true;
        }

        return Promise.resolve(this);
    }

    public async confirmDelete(): Promise<WatcherManager> {
        try {
            const item = this.itemToDelete as GenericObject;
            const toBeRemoved = this.hasSelection()
                ? this.getSelectedKeys('name')
                : [item.name];
            // @ts-ignore
            await CrudBase.options.methods.confirmDelete.call(this, 'name');
            this.$store.commit('message', Messages.success());
            await this.unregisterWatchers(toBeRemoved);
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return Promise.resolve(this);
    }

    public async editItem(item: WatcherEntry): Promise<WatcherManager> {
        await this.closeEditor();
        // @ts-ignore
        CrudBase.options.methods.editItem.call(this, item);
        this.currentItem = {
            ...this.currentItem,
            ...item,
        };
        return Promise.resolve(this);
    }

}
</script>

<style scoped>
</style>
