<template>
  <v-layout align-start justify-center row>
    <v-flex pa-1 grow fill-height>
      <v-toolbar raised dark>
        <v-toolbar-title>{{ $t("keyManager.title") }}</v-toolbar-title>
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
              <span>{{ $t("common.actions.purgeAll.label") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("common.actions.purgeAll.tooltip") }}</span>
        </v-tooltip>
        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" round dark @click="addItem" v-on="on">
              <v-icon>add</v-icon>
              <span>{{ $t("common.actions.create.label") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("common.actions.create.tooltip") }}</span>
        </v-tooltip>

        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" @click.stop="deleteMany" round dark v-on="on">
              <v-icon>delete</v-icon>
              <span>{{ $t("common.actions.removeAll.label") }}</span>
            </v-btn>
          </template>
          <span>{{ $t("common.actions.removeAll.tooltip") }}</span>
        </v-tooltip>

        <v-tooltip bottom max-width="200">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" @click.stop="touch(null, true)" round dark v-on="on">
              <v-icon>touch_app</v-icon>
              <span>{{ $t("keyManager.actions.touchAll.label") }}</span>
            </v-btn>
          </template>
          <span>{{$t("keyManager.actions.touchAll.tooltip") }}</span>
        </v-tooltip>
      </v-toolbar>
      <v-card raised dark>
        <v-data-table
          :search="filter"
          :headers="headers"
          v-bind:items="data"
          item-key="key"
          select-all
          v-model="selected"
          :loading="loading"
        >
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
          <template v-slot:items="props">
            <td>
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
            </td>
            <td>{{ props.item.key }}</td>
            <td class="text-xs-right">{{ props.item.value }}</td>
            <td class="justify-center layout px-0">
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon small @click="editItem(props.item)" v-on="on">edit</v-icon>
                </template>
                <span>{{ $t("keyManager.actions.edit") }}</span>
              </v-tooltip>
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon small slot="activator" @click="deleteSingle(props.item)" v-on="on">delete</v-icon>
                </template>
                <span>{{ $t("keyManager.actions.remove") }}</span>
              </v-tooltip>
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon small slot="activator" @click="touch(props.item)" v-on="on">touch_app</v-icon>
                </template>
                <span>{{ $t("keyManager.actions.touch") }}</span>
              </v-tooltip>
            </td>
          </template>
          <template v-slot:no-data>
            <v-alert :value="true" color="error" icon="warning">{{ $t("common.lists.nodata") }}</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>

    <v-flex pa-1 shrink>
      <v-expand-x-transition>
        <key-editor
          :data="currentItem"
          :mode="operation"
          v-on:cancel="cancelEdit"
          v-on:reload="loadKeys"
          v-if="editor"
        ></key-editor>
      </v-expand-x-transition>
    </v-flex>

    <delete-dialog
      :open="deleteDialog"
      :itemName="'key'"
      v-on:confirm="confirmDelete"
      v-on:cancel="cancelDelete"
    ></delete-dialog>

     <purge-dialog
      :open="purgeDialog"
      :itemName="'keys'"
      v-on:confirm="confirmPurge"
      v-on:cancel="cancelPurge"
    ></purge-dialog>
    <no-selection-dialog :open="noSelection" v-on:close="closeNoSelection"></no-selection-dialog>
  </v-layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Etcd3, MultiRangeBuilder } from 'etcd3';
import Messages from '@/messages';
import { GenericObject, EtcdItem } from '../../types';
import KeyEditor from './key-editor.vue';
import KeyService from '../services/key.service';
import { CrudBase } from '../lib/crud.class';

@Component({
    name: 'key-manager',
    components: {
        'key-editor': KeyEditor,
    },
})
export default class KeyManager extends CrudBase {
    public none = 0;
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'key',
        },
        { text: '', value: 'value', sortable: true },
    ];

    protected etcd: KeyService;

    constructor() {
        super();
    }

    public created() {
        this.etcd = new KeyService(this.$store.state.connection.getClient());
        this.translateHeaders('keyManager.columns.key', 'keyManager.columns.value');
        this.loadKeys();

    }

    public async editItem(item: GenericObject) {
        try {
            const value = await this.etcd.loadKey(item.key);
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item);
            this.currentItem = {
                ...this.currentItem,
                ...{ value, key: item.key },
            };
        } catch (error) {
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item, false);
            this.$store.commit('message', Messages.error(error));
        }
    }

    public async touch(item: EtcdItem, selection: boolean = false) {
        if (selection && !this.hasSelection()) {
            this.noSelection = true;
            return;
        }
        const toBeTouched = selection ? this.getSelectedKeys() : [item.key];
        this.noSelection = false;
        try {
            await this.etcd.touch(toBeTouched);
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }
    }

    public async confirmPurge() {
        try {
            await this.etcd.purge();
            this.$store.commit('message', Messages.success());
            CrudBase.options.methods.confirmPurge.call(this);
            this.loadKeys();
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }
    }

    public async confirmDelete() {
        const item = this.itemToDelete as GenericObject;
        const toBeRemoved = this.hasSelection() ? this.getSelectedKeys() : [item.key];

        try {
            const result = await this.etcd.remove(toBeRemoved);
            this.$store.commit('message', Messages.success());
            CrudBase.options.methods.confirmDelete(this, false, true);
            this.loadKeys();
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        this.cancelDelete();
    }

    public async loadKeys(prefix?: string) {
        this.loading = true;
        try {
            const data = await this.etcd.loadAllKeys(prefix);
            this.data = Object.entries(data).map((entry) => {
                return { key: entry[0], value: entry[1] };
            });
            this.loading = false;
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }
    }
}
</script>

<style scoped>
</style>
