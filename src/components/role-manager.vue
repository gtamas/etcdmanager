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
          :loading="loading"
        >
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
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
          v-on:reload="loadRoles"
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
import { CrudBase } from '../lib/crud.class';
import RoleEditor from './role-editor.vue';

@Component({
    name: 'role-manager',
    components: {
        'role-editor': RoleEditor,
    },
})
export default class RoleManager extends CrudBase {
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
        this.loadRoles();
        this.translateHeaders('roleManager.columns.name');
    }

    public async editItem(item: GenericObject) {
        try {
            // @ts-ignore
            const roleData = await this.etcd.loadRole(item.name);
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

    public async confirmPurge() {
        try {
            await this.etcd.purge();
            this.$store.commit('message', Messages.success());
            CrudBase.options.methods.confirmPurge.call(this);
            this.loadRoles();
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }
    }

    public async confirmDelete() {
        const item = this.itemToDelete as GenericObject;
        const toBeRemoved = this.hasSelection()
            ? this.getSelectedKeys('name')
            : [item.name];

        try {
            const result = await this.etcd.deleteRole(toBeRemoved);
            this.$store.commit('message', Messages.success());
            CrudBase.options.methods.confirmDelete(this, false, true);
            this.loadRoles();
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        this.cancelDelete();
    }

    public async loadRoles() {
        this.loading = true;
        try {
            this.data = await this.etcd.getRoles();
            this.loading = false;
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }
    }
}
</script>

<style scoped>
</style>
