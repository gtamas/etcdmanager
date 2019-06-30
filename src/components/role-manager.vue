<template>
  <v-layout align-start justify-center row>
    <v-flex pa-1 grow fill-height>
      <v-toolbar raised dark>
        <v-toolbar-title>{{ $t('roleManager.title') }}</v-toolbar-title>
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
      </v-toolbar>
      <v-card raised dark>
        <v-data-table
          :search="filter"
          :headers="headers"
          v-bind:items="data"
          item-key="name"
          select-all
          v-model="selected"
        >
          <template v-slot:items="props">
            <td>
              <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
            </td>
            <td>{{ props.item.name }}</td>
            <td class="justify-center layout px-0">
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon small @click="editItem(props.item)" v-on="on">edit</v-icon>
                </template>
                <span>{{ $t('roleManager.actions.edit') }}</span>
              </v-tooltip>
              <v-tooltip bottom max-width="200">
                <template v-slot:activator="{ on }">
                  <v-icon small slot="activator" @click="deleteSingle(props.item)" v-on="on">delete</v-icon>
                </template>
                <span>{{ $t('roleManager.actions.remove') }}</span>
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
        <role-editor
          :data="currentItem"
          :mode="operation"
          v-on:cancel="cancelEdit"
          v-on:reload="load"
          v-if="editor"
        ></role-editor>
      </v-expand-x-transition>
    </v-flex>

    <delete-dialog
      :open="deleteDialog"
      :itemName="'role'"
      v-on:confirm="confirmDelete"
      v-on:cancel="cancelDelete"
    ></delete-dialog>

    <purge-dialog
      :open="purgeDialog"
      :itemName="'roles'"
      v-on:confirm="confirmPurge"
      v-on:cancel="cancelPurge"
    ></purge-dialog>
    <no-selection-dialog :open="noSelection" v-on:close="closeNoSelection"></no-selection-dialog>
  </v-layout>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Etcd3, Role } from 'etcd3';
import Messages from '@/messages';
import { GenericObject } from '../../types';
import RoleService from '../services/role.service';
import { CrudBase, List } from '../lib/crud.class';
import RoleEditor from './role-editor.vue';

@Component({
    name: 'role-manager',
    components: {
        'role-editor': RoleEditor,
    },
})
export default class RoleManager extends CrudBase implements List {
    public none = 0;
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'name',
        },
    ];

    protected etcd: RoleService;
    protected defaultItem: { name: string };

    constructor() {
        super();
        this.etcd = new RoleService(this.$store.state.connection.getClient());
        this.defaultItem = { name: '' };
    }

    public created() {
        this.load();
        this.translateHeaders('roleManager.columns.name');
    }

    public async editItem(item: GenericObject) {
        try {
            this.closeEditor();
            const roleData = await this.etcd.loadRole(item.name);
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item);
            this.currentItem = {
                ...this.currentItem,
                ...roleData,
            };
        } catch (error) {
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item, false);
            this.$store.commit('message', Messages.error(error));
        }
    }

    public async confirmPurge(): Promise<RoleManager> {
        try {
            // @ts-ignore
            await CrudBase.options.methods.confirmPurge.call(this);
            this.$store.commit('message', Messages.success());
            return Promise.resolve(this);
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
            return Promise.reject(this);
        }
    }

    public async confirmDelete(keyName: string): Promise<RoleManager> {
        try {
            // @ts-ignore
            await CrudBase.options.methods.confirmDelete.call(this, 'name');
            await this.load();
            this.$store.commit('message', Messages.success());
            return Promise.resolve(this);
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
            return Promise.reject(this);
        }

        this.cancelDelete();
    }

    public async load(): Promise<RoleManager> {
        this.loading = true;
        try {
            this.data = await this.etcd.getRoles();
            return Promise.resolve(this);
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
            return Promise.reject(this);
        }
    }
}
</script>

<style scoped>
</style>
