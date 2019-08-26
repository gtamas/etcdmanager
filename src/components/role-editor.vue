<template>
    <v-card>
        <v-expansion-panel focusable dark class="help" v-model="help">
            <v-expansion-panel-content dark class="darker">
                <template v-slot:actions>
                    <v-tooltip data-test="role-editor.help.v-tooltip" slot="prepend" bottom max-width="200">
                        <v-icon data-test="role-editor.help.v-icon" slot="activator" color="primary" light medium>help</v-icon>
                        <span data-test="role-editor.help.span">{{ $t('common.help.tooltip') }}</span>
                    </v-tooltip>
                </template>
                <template v-slot:header>
                    <v-toolbar-title data-test="role-editor.title.v-toolbar-title">{{ title }}</v-toolbar-title>
                </template>
                <v-tabs v-model="helpbar" dark color="black" slider-color="primary" grow>
                    <v-tab data-test="role-editor.common-help-tab-info.v-tab" ripple>{{ $t('common.help.tabs.info') }}</v-tab>
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                <h2 data-test="role-editor.common-help-infotitle.h2" class="title">{{ $t("common.help.infoTitle") }}</h2>
                                <p data-test="role-editor.spacer-1.p" class="spacer"></p>
                                <p data-test="role-editor.roleeditor-help-text.p" v-html="platformService.getHelp($t('roleEditor.help.text'))"></p>
                                <p data-test="role-editor.spacer-2.p" class="spacer"></p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab data-test="role-editor.common-help-tab-shortcuts.v-tab" ripple>{{ $t('common.help.tabs.shortcuts') }}</v-tab>
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                 <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p data-test="role-editor.common-help-shortcuts.p" class="rounded">{{ `${platformService.getMeta()} + s` }}</p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p data-test="role-editor.common-help-shortcuts-save.p" lass="label">{{ $t("common.help.shortcuts.save") }}</p>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p data-test="role-editor.common-help-shortcuts-enter.p" class="rounded">enter</p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p data-test="role-editor.common-help-shortcuts-save-enter.p" class="label">{{ $t("common.help.shortcuts.save") }}</p>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p data-test="role-editor.common-help-shortcuts-close.p" class="rounded">esc</p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="role-editor.common-help-shortcuts-closeeditor.p"
                                            class="label"
                                        >{{ $t("common.help.shortcuts.closeEditor") }}</p>
                                    </v-flex>
                                </v-layout>
                                 <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p data-test="role-editor.common-help-shortcuts-permission.p" class="rounded">{{ `${platformService.getMeta()} + n` }}</p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="role-editor.common-help-shortcuts-addpermission.p"
                                            class="label"
                                        >{{ $t("roleEditor.help.shortcuts.addPermission") }}</p>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p data-test="role-editor.common-help-shortcuts-help-1.p" class="rounded">{{ `${platformService.getMeta()} + h` }}</p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p data-test="role-editor.common-help-shortcuts-help-2.p" class="label">{{ $t("common.help.shortcuts.help") }}</p>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
                <hr data-test="role-editor.blackline.hr" class="blackLine" />
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <v-form ref="roleForm" v-model="valid" lazy-validation>
                        <v-text-field
                            data-test="role-editor.fields-name-placeholder.v-text-field"
                            dark
                            :readonly="roleExists"
                            v-model="name"
                            ref="name"
                            :error-messages="nameErrors"
                            :label="$t('roleEditor.fields.name.label')"
                            :placeholder="$t('roleEditor.fields.name.placeholder')"
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                        >
                            <v-tooltip data-test="role-editor.fields-name-placeholder.v-tooltip" slot="prepend" bottom max-width="200">
                                <v-icon data-test="role-editor.fields-name-placeholder.v-icon" slot="activator" color="primary" dark>info</v-icon>
                                <span data-test="role-editor.fields-name-placeholder.span">{{ $t('roleEditor.fields.name.tooltip') }}</span>
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
                                <td data-test="role-editor.props-item-key.td">{{ props.item.key }}</td>
                                <td data-test="role-editor.props-item-permission.td" class="text-xs-right">{{ props.item.permission }}</td>
                                <td data-test="role-editor.props-item-prefix.td" class="text-xs-right">{{ props.item.prefix }}</td>
                                <td class="justify-center layout px-0">
                                    <v-tooltip data-test="role-editor.props-item-tooltip.v-tooltip" bottom max-width="200">
                                        <template v-slot:activator="{ on }">
                                            <v-icon
                                                data-test="role-editor.props-item.v-icon"
                                                small
                                                @click="editPermission(props.item)"
                                                v-on="on"
                                            >edit</v-icon>
                                        </template>
                                        <span data-test="role-editor.actions-edit.v-icon">{{ $t('roleEditor.actions.edit') }}</span>
                                    </v-tooltip>
                                    <v-tooltip bottom max-width="200">
                                        <template v-slot:activator="{ on }">
                                            <v-icon
                                                data-test="role-editor.actions-revoke.v-icon"
                                                small
                                                slot="activator"
                                                @click="revokePermission(props.item)"
                                                v-on="on"
                                            >delete</v-icon>
                                        </template>
                                        <span data-test="role-editor.actions-revoke.span">{{ $t('roleEditor.actions.revoke') }}</span>
                                    </v-tooltip>
                                </td>
                            </template>
                        </v-data-table>

                        <v-btn
                            data-test="role-editor.submit.v-btn"
                            :disabled="isValid()"
                            v-if="!roleExists"
                            round
                            color="primary"
                            @click="submit"
                        >
                            <v-icon data-test="role-editor.submit.v-icon">add</v-icon>
                            <span data-test="role-editor.submit.span">{{ opTitle }}</span>
                        </v-btn>
                        <v-btn data-test="role-editor.actions-permissions.v-btn" :disabled="!roleExists" round color="primary" @click="addPermission">
                            <v-icon data-test="role-editor.actions-permissions.v-icon">verified_user</v-icon>
                            <span data-test="role-editor.actions-permissions.span">{{ $t('roleEditor.actions.permissions') }}</span>
                        </v-btn>
                        <v-btn data-test="role-editor.actions-close.v-btn" color="warning" round @click="cancel">
                            <v-icon data-test="role-editor.actions-close.v-icon">close</v-icon>
                            <span data-test="role-editor.actions-close.span">{{ $t('common.actions.close.label') }}</span>
                        </v-btn>
                        <v-spacer data-test="role-editor.spacer.v-spacer"></v-spacer>
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
import Component from 'vue-class-component';
import { GenericObject, PermissionObject } from '../../types';
import { required, alphaNum } from 'vuelidate/lib/validators';
import Messages from '@/lib/messages';
import { BaseEditor } from '../lib/editor.class';
import RoleService from '../services/role.service';
import { Prop } from 'vue-property-decorator';
import PermissionEditor from './permission-editor.vue';
import { ValidationError } from '../lib/validation-error.class';

// @ts-ignore
class RoleEditorError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'RoleEditorError';
    }
}

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
            'roleEditor.columns.prefix'
        );
    }

    mounted() {
        this.bindDefaultEvents('roleForm');
        this.keyboardEvents.bind('meta+n', () => {
            this.addPermission();
        });
        this.focus('name');
    }

    get nameErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.name.$dirty) {
            return errors;
        }

        // @ts-ignore
        if (!this.$v.name.required) {
            errors.push(this.$t('common.validation.required'));
        }

        // @ts-ignore
        if (!this.$v.name.alphaNum) {
            errors.push(this.$t('common.validation.alphanumeric'));
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
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
        }

        return Promise.resolve(this);
    }

    addPermission(): RoleEditor {
        this.permissionDialog = true;
        this.permissionEditorMode = 'create';
        this.currentPermission = { ...this.defaultPermission };
        return this;
    }

    cancelPermission(): RoleEditor {
        this.permissionDialog = false;
        // @ts-ignore
        this.$nextTick(this.$refs.name.focus);
        return this;
    }

    public async savePermission(): Promise<RoleEditor> {
        try {
            await this.loadPermissions();
            this.cancelPermission();
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
        }

        return Promise.resolve(this);
    }

    editPermission(permission: PermissionObject): RoleEditor {
        this.currentPermission = permission;
        this.permissionDialog = true;
        this.permissionEditorMode = 'edit';
        return this;
    }

    public async revokePermission(
        permission: PermissionObject
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
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
        }
        this.focus('name');
        return Promise.resolve(this);
    }

    public async submit(): Promise<RoleEditor | ValidationError> {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return Promise.resolve(new ValidationError('Form is invalid..'));
        }

        const backend = new RoleService(
            this.$store.state.connection.getClient()
        );

        try {
            this.toggleLoading();
            await backend.createRole(this.name);
            this.toggleLoading();
            this.roleExists = true;
            this.$store.commit('message', Messages.success());
            this.$emit('reload');
            this.$v.$reset();
        } catch (e) {
            this.toggleLoading();
            this.$store.commit('message', Messages.error(e));
        }

        this.focus('name');
        return Promise.resolve(this);
    }
}
</script>

<style scoped>
</style>
