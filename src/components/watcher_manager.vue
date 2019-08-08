<template>
  <v-layout align-start justify-center row>
    <v-flex pa-1 grow fill-height>
      <v-toolbar raised dark>
        <v-toolbar-title>{{ $t('watcherManager.title') }}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          dark
          ref="search"
          color="white"
          v-model="filter"
          prepend-icon="search"
          :placeholder="$t('common.lists.filter')"
        ></v-text-field>
        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="error" round dark @click="purge" v-on="on">
              <v-icon>remove_circle</v-icon>
              <span>{{ $t('common.actions.purgeAll.label') }}</span>
            </v-btn>
          </template>
          <span>{{ $t('common.actions.purgeAll.tooltip') }}</span>
        </v-tooltip>
        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" round dark @click="addItem" v-on="on">
              <v-icon>add</v-icon>
              <span>{{ $t('common.actions.create.label') }}</span>
            </v-btn>
          </template>
          <span>{{ $t('common.actions.create.tooltip') }}</span>
        </v-tooltip>
        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" @click.stop="deleteMany" round dark v-on="on">
              <v-icon>delete</v-icon>
              <span>{{ $t('common.actions.removeAll.label') }}</span>
            </v-btn>
          </template>
          <span>{{ $t('common.actions.removeAll.tooltip') }}</span>
        </v-tooltip>
        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" @click.stop="toggleMany" round dark v-on="on">
              <v-icon>notifications</v-icon>
              <span>{{ $t('watcherManager.actions.notificationOn.label') }}</span>
            </v-btn>
          </template>
          <span>{{ $t('watcherManager.actions.notificationOn.tooltip') }}</span>
        </v-tooltip>
        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" @click.stop="toggleMany(false)" round dark v-on="on">
              <v-icon>notifications_off</v-icon>
              <span>{{ $t('watcherManager.actions.notificationOff.label') }}</span>
            </v-btn>
          </template>
          <span>{{ $t('watcherManager.actions.notificationOff.tooltip') }}</span>
        </v-tooltip>
      </v-toolbar>
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
          <v-progress-linear v-slot:progress color="blue" indeterminate v-show="loading"></v-progress-linear>
          <template v-slot:items="props">
            <td>
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.key }}</td>
            <td class="text-xs-left">{{ props.item.prefix }}</td>
            <td class="justify-center layout px-0">
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon small @click="editItem(props.item)" v-on="on">edit</v-icon>
                </template>
                <span>{{ $t('watcherManager.actions.edit') }}</span>
              </v-tooltip>
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon small slot="activator" @click="deleteSingle(props.item)" v-on="on">delete</v-icon>
                </template>
                <span>{{ $t('watcherManager.actions.remove') }}</span>
              </v-tooltip>
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    slot="activator"
                    @click="toggleWatcher(props.item)"
                    v-on="on"
                  >{{ props.item.activated ? 'notifications' : 'notifications_off'}}</v-icon>
                </template>
                <span>{{ $t('watcherManager.actions.status') }}</span>
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
          this.keyboardEvents.bind('meta+d', () => {
            this.toggleMany(false);
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

    public async toggleMany(activate: boolean = true): Promise<WatcherManager> {
        if (this.hasSelection()) {
            this.noSelection = false;
            const watcherNames = this.getSelectedKeys('name');
            for (const name of watcherNames) {
                const watcher = this.watchers.find(w => w.name === name);
                if (activate) {
                    await this.activateWatcher(watcher as WatcherEntry);
                } else {
                    await this.deactivateWatcher(watcher as WatcherEntry);
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

    public async addItem() {
        await this.closeEditor();
        // @ts-ignore
        CrudBase.options.methods.addItem.call(this);
        this.currentItem = new WatcherEntry();
    }
}
</script>

<style scoped>
</style>
