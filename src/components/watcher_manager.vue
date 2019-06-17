<template>
  <v-layout align-start justify-center row>
    <v-flex pa-1 grow fill-height>
      <v-toolbar raised dark>
        <v-toolbar-title>{{ $t('watcherManager.title') }}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          dark
          color="white"
          v-model="filter"
          prepend-icon="search"
          placeholder="Filter data.."
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
            <td class="text-xs-right">{{ props.item.key }}</td>
            <td class="text-xs-right">{{ props.item.prefix }}</td>
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
          <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning">{{ $t('common.lists.nodata') }}</v-alert>
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
          v-on:reload="loadWatchers"
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { WatcherEntry, GenericObject, NamedWatcher } from '../../types';
import WatcherService from '../services/watcher.service';
import { CrudBase } from '../lib/crud.class';
import WatcherEditor from './watcher-editor.vue';
import NoSelectionDialog from './no-selection.dialog.vue';
import { Watcher } from 'etcd3';
import Messages from '../messages';

@Component({
    name: 'watcher-manager',
    components: {
        'watcher-editor': WatcherEditor,
    },
})
export default class WatcherManager extends CrudBase {
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

    protected etcd: WatcherService;

    private watcherStreams: Map<string, Watcher> = new Map();

    constructor() {
        super();
        this.etcd = new WatcherService(
            this.$ls,
            this.$store.state.connection.getClient(),
        );
    }

    created() {
        this.loadWatchers();
        this.translateHeaders('watcherManager.columns.name', 'watcherManager.columns.key', 'watcherManager.columns.prefix');
    }

    private deactivateWatcher(watcher: WatcherEntry) {
        this.watcherStreams.get(watcher.name).cancel();
        watcher.activated = false;
        return true;
    }

    private async activateWatcher(watcher: WatcherEntry) {
        let watcherStream: Watcher | null = null;
        try {
            watcherStream = await this.etcd.createWatcher(watcher);
        } catch (e) {
            Messages.error(e);
            return false;
        }

        watcherStream = this.etcd.registerWatcherEvents(
            watcherStream as Watcher,
            watcher.actions,
        );
        this.watcherStreams.set(watcher.name, watcherStream);
        watcher.activated = true;
    }

    public addItem() {
        CrudBase.options.methods.addItem.call(this);
        this.currentItem = new WatcherEntry();
    }

    public async toggleWatcher(watcher: WatcherEntry) {
        if (watcher.activated) {
            this.deactivateWatcher(watcher);
            return false;
        }

        await this.activateWatcher(watcher);
        return true;
    }

    public loadWatchers() {
        this.loading = true;
        this.watchers = this.etcd.listWatchers();
        this.loading = false;
    }

    public async confirmPurge() {
        try {
            await this.etcd.purgeWatchers();
            this.watcherStreams.forEach((watcher) => {
                watcher.cancel();
            });
            this.watcherStreams.clear();
            this.$store.commit('message', Messages.success());
            CrudBase.options.methods.confirmPurge.call(this);
            this.loadWatchers();
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }
    }

    public toggleMany(activate: boolean = true) {
        if (this.hasSelection()) {
            this.noSelection = false;
            const watcherNames = this.getSelectedKeys('name');
            watcherNames.forEach((name) => {
                const watcher = this.watchers.find((w) => w.name === name);
                if (activate) {
                    this.activateWatcher(watcher as WatcherEntry);
                } else {
                    this.deactivateWatcher(watcher as WatcherEntry);
                }
            });
            Messages.success();
        } else {
            this.noSelection = true;
        }
    }

    public async confirmDelete() {
        const item = this.itemToDelete as GenericObject;
        const toBeRemoved = this.hasSelection()
            ? this.getSelectedKeys('name')
            : [item.name];

        try {
            this.etcd.removeWatchers(toBeRemoved);
            this.$store.commit('message', Messages.success());
            toBeRemoved.forEach((watcherName) => {
                const listener = this.watcherStreams.get(watcherName);
                if (listener) {
                    listener.cancel();
                    this.watcherStreams.delete(watcherName);
                }
            });
            CrudBase.options.methods.confirmDelete.call(this, false, true);
            this.loadWatchers();
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        this.cancelDelete();
    }

    public async editItem(item: WatcherEntry) {
        try {
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item);
            this.currentItem = {
                ...this.currentItem,
                ...item,
            };
        } catch (error) {
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item, false);
            this.$store.commit('message', Messages.error(error));
        }
    }
}
</script>

<style scoped>
</style>
