<template>
  <v-card>
    <v-toolbar dark flat>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              dark
              :disabled="roleExists"
              v-model="name"
              :error-messages="nameErrors"
              :label="$t('roleEditor.fields.name.label')"
              :placeholder="$t('roleEditor.fields.name.placeholder')"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            >
              <v-tooltip slot="prepend" bottom max-width="200">
                <v-icon slot="activator" color="primary" dark>info</v-icon>
                <span>{{ $t('roleEditor.fields.name.tooltip') }}</span>
              </v-tooltip>
            </v-text-field>

            <v-data-table
              v-if="roleExists"
              :headers="headers"
              v-bind:items="permissions"
              item-key="key"
              hide-actions
            >
              <template v-slot:items="props">
                <td>{{ props.item.key }}</td>
                <td class="text-xs-right">{{ props.item.permission }}</td>
                <td class="text-xs-right">{{ props.item.prefix }}</td>
                <td class="justify-center layout px-0">
                  <v-tooltip bottom max-width="200">
                    <template v-slot:activator="{ on }">
                      <v-icon small @click="editPermission(props.item)" v-on="on">edit</v-icon>
                    </template>
                    <span>{{ $t('roleEditor.actions.edit') }}</span>
                  </v-tooltip>
                  <v-tooltip bottom max-width="200">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        small
                        slot="activator"
                        @click="revokePermission(props.item)"
                        v-on="on"
                      >delete</v-icon>
                    </template>
                    <span>{{ $t('roleEditor.actions.revoke') }}</span>
                  </v-tooltip>
                </td>
              </template>
              <template v-slot:no-data>
                <v-alert :value="true" color="error" icon="warning">{{ $t('common.lists.nodata') }}</v-alert>
              </template>
            </v-data-table>

            <v-btn :disabled="isValid()" round color="primary" @click="submit">
              <v-icon>add</v-icon>
              <span>{{ opTitle }}</span>
            </v-btn>
            <v-btn :disabled="!roleExists" round color="primary" @click="addPermission">
              <v-icon>verified_user</v-icon>
              <span>{{ $t('roleEditor.actions.permissions') }}</span>
            </v-btn>
            <v-btn color="warning" round @click="cancel">
              <v-icon>close</v-icon>
              <span>{{ $t('common.actions.close.label') }}</span>
            </v-btn>
            <v-spacer></v-spacer>
          </v-form>
        </v-flex>
      </v-layout>
      <v-dialog v-model="permissionDialog" persistent max-width="290">
        <v-card dark>
          <permission-editor
            v-on:cancel="cancelPermission"
            v-on:permission="savePermission"
            :data="currentPermission"
            :name="name"
            :mode="permissionEditorMode"
            v-if="permissionDialog"
          ></permission-editor>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Etcd3, IPermissionRequest, IPermissionResult } from 'etcd3';
import {
    GenericObject,
    EtcdPermissionType,
    PermissionObject,
} from '../../types';
import { required, alphaNum } from 'vuelidate/lib/validators';
import Messages from '../messages';
import { BaseEditor } from '../lib/editor.class';
import RoleService from '../services/role.service';
import { Prop } from 'vue-property-decorator';
import uuidv1 from 'uuid/v1';
import PermissionEditor from './permission-editor.vue';

@Component({
    name: 'role-editor',
    validations: {
        name: {
            required,
            alphaNum,
        },
    },
    components: {
        'permission-editor': PermissionEditor,
    },
})
export default class RoleEditor extends BaseEditor {
    // @ts-ignore
    @Prop() data: {
        name: string;
    };
    // @ts-ignore
    @Prop() mode: string;

    public itemId: string = 'name';
    public itemType: string = 'role';
    public permissionDialog: boolean = false;
    public roleExists: boolean = false;
    public selected: GenericObject[] = [];
    public name: string = this.data.name || '';
    public currentPermission: PermissionObject;
    public defaultPermission: PermissionObject = {
        key: '',
        prefix: false,
        permission: 'Read',
    };
    public permissionEditorMode: 'create' | 'edit' = 'create';
    public permissions: PermissionObject[] = [];

    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'key',
        },
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'permission',
        },
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'prefix',
        },
    ];

    protected etcd: RoleService;

    constructor() {
        super();
        this.etcd = new RoleService(this.$store.state.connection.getClient());
        this.currentPermission = { ...this.defaultPermission };
    }

    async created() {
        if (this.name) {
            this.loadPermissions();
        }
        this.roleExists = this.mode === 'edit';
        this.translateHeaders(
            'roleEditor.columns.key',
            'roleEditor.columns.permission',
            'roleEditor.columns.prefix',
        );
    }

    get nameErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.name.$dirty) {
            return errors;
        }

        // @ts-ignore
        if (!this.$v.name.required) {
            errors.push('Item is required');
        }

        // @ts-ignore
        if (!this.$v.name.alphaNum) {
            errors.push('Alphanumeric value expected');
        }
        return errors;
    }

    public isValid(): boolean {
        return this.$v.$invalid || this.roleExists;
    }

    public async loadPermissions(): Promise<RoleEditor> {
        try {
            const permissions = await this.etcd.rolePermissions(this.name);
            this.permissions = permissions.map((perm) => {
                return {
                    key: perm.range.start.toString(),
                    prefix: perm.range.end.length > 0,
                    permission: perm.permission,
                };
            });
            return Promise.resolve(this);
        } catch (e) {
            return Promise.reject(this);
        }
    }

    addPermission(): RoleEditor {
        this.permissionDialog = true;
        this.permissionEditorMode = 'create';
        this.currentPermission = { ...this.defaultPermission };
        return this;
    }

    cancelPermission(): RoleEditor {
        this.permissionDialog = false;
        return this;
    }

    public async savePermission(): Promise<RoleEditor> {
        try {
            await this.loadPermissions();
            this.cancelPermission();
            return Promise.resolve(this);
        } catch (e) {
            return Promise.reject(this);
        }
    }

    editPermission(permission: PermissionObject): RoleEditor {
        this.currentPermission = permission;
        this.permissionDialog = true;
        this.permissionEditorMode = 'edit';
        return this;
    }

    public async revokePermission(
        permission: PermissionObject,
    ): Promise<RoleEditor> {
        try {
            this.toggleLoading();
            await this.etcd.setPermissions({
                name: this.name,
                key: permission.key,
                permission: permission.permission,
                isRange: permission.prefix,
                grant: false,
            });
            await this.loadPermissions();
            this.toggleLoading();
            this.$store.commit('message', Messages.success());
            return Promise.resolve(this);
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
            return Promise.reject(this);
        }
    }

    public async submit(reset = false): Promise<RoleEditor> {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return Promise.reject(this);
        }

        const backend = new RoleService(
            this.$store.state.connection.getClient(),
        );

        try {
            this.toggleLoading();
            await backend.createRole(this.name);
            this.toggleLoading();
            this.roleExists = true;
            this.$store.commit('message', Messages.success());
            this.$emit('reload');
            this.$v.$reset();
            return Promise.resolve(this);
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
            this.toggleLoading();
            return Promise.reject(this);
        }
    }
}
</script>

<style scoped>
</style>
