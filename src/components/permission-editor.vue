<template>
    <v-card>
        <v-toolbar dark flat>
            <v-toolbar-title data-test="permission-editor.title.toolbar-title">{{ title }}</v-toolbar-title>
            <v-divider data-test="permission-editor.title.divider" class="mx-2" inset vertical></v-divider>
            <v-spacer data-test="permission-editor.title.spacer"></v-spacer>
        </v-toolbar>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <v-form ref="permissionForm" v-model="valid" lazy-validation>
                        <v-text-field
                            data-test="permission-editor.fields-key.text-field"
                            dark
                            v-model="key"
                            ref="key"
                            :readonly="editMode"
                            :error-messages="keyErrors"
                            :label="$t('permissionEditor.fields.key.label')"
                            :placeholder="$t('permissionEditor.fields.key.placeholder')"
                            required
                            @input="$v.key.$touch()"
                            @blur="$v.key.$touch()"
                        >
                            <v-tooltip data-test="permission-editor.fields-key.tooltip" slot="prepend" bottom max-width="200">
                                <v-icon data-test="permission-editor.fields-key.icon" slot="activator" color="primary" dark>info</v-icon>
                                <span data-test="permission-editor.fields-key.span">{{ $t('permissionEditor.fields.key.tooltip') }}</span>
                            </v-tooltip>
                        </v-text-field>

                        <v-checkbox
                            data-test="permission-editor.fields-prefix.checkbox"
                            dark
                            v-model="prefix"
                            :label="$t('permissionEditor.fields.prefix.label')"
                            required
                        >
                            <v-tooltip data-test="permission-editor.fields-prefix.tooltip" slot="prepend" bottom max-width="200">
                                <v-icon data-test="permission-editor.fields-prefix.icon" slot="activator" color="primary" dark>info</v-icon>
                                <span data-test="permission-editor.fields-prefix.span">{{ $t('permissionEditor.fields.prefix.tooltip') }}</span>
                            </v-tooltip>
                        </v-checkbox>

                        <v-select
                            data-test="permission-editor.fields-permission.select"
                            dark
                            v-model="permission"
                            :items="permissionValues"
                            :label="$t('permissionEditor.fields.permission.label')"
                            item-text="name"
                            item-value="value"
                            return-object
                            required
                        >
                            <v-tooltip data-test="permission-editor.fields-permission.tooltip" slot="prepend" bottom max-width="200">
                                <v-icon data-test="permission-editor.fields-permission.icon" slot="activator" color="primary" dark>info</v-icon>
                                <span data-test="permission-editor.fields-permission.span">{{ $t('permissionEditor.fields.permission.tooltip') }}</span>
                            </v-tooltip>
                        </v-select>

                        <v-btn data-test="permission-editor.actions-grant.button" :disabled="!valid" round color="primary" @click="submit">
                            <v-icon data-test="permission-editor.actions-grant.icon">add</v-icon>
                            <span data-test="permission-editor.actions-grant.span">{{ $t('permissionEditor.actions.grant.label')}}</span>
                        </v-btn>
                        <v-btn data-test="permission-editor.actions-close.button" color="warning" round @click="cancel">
                            <v-icon data-test="permission-editor.actions-close.icon">close</v-icon>
                            <span data-test="permission-editor.actions-close.span">{{ $t('common.actions.close.label') }}</span>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-form>
                </v-flex>
            </v-layout>
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
import { ValidationError } from '../lib/validation-error.class';

// @ts-ignore
class PermissionEditorError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'RoleEditorError';
    }
}

@Component({
    name: 'permission-editor',
    validations: {
        key: {
            required,
            alphaNum,
        },
    },
})
export default class PermissionEditor extends BaseEditor {
    // @ts-ignore
    @Prop() data: {
        key: string;
        prefix: boolean;
        permission: PermissionObject;
    };
    // @ts-ignore
    @Prop() mode: string;
    // @ts-ignore
    @Prop() name: string;

    public itemId: string = 'key';
    public itemType: string = 'permission';
    public actionDialog: boolean = false;
    public key: string = this.data.key || '';
    public prefix: boolean = this.data.prefix || false;
    public permission: GenericObject = this.data.permission || {
        name: 'Read',
        value: 'Read',
    };

    public permissionValues: GenericObject[] = [
        {
            name: 'Read',
            value: 'Read',
        },
        {
            name: 'Write',
            value: 'Write',
        },
        {
            name: 'Read & Write',
            value: 'Readwrite',
        },
    ];

    protected etcd: RoleService;

    constructor() {
        super();
        this.etcd = new RoleService(this.$store.state.connection.getClient());
    }

    mounted() {
        this.bindDefaultEvents('permissionForm');
        // @ts-ignore
        this.$nextTick(this.$refs.key.focus);
    }

    get keyErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.key.$dirty) {
            return errors;
        }

        // @ts-ignore
        if (!this.$v.key.required) {
            errors.push(this.$t('common.validation.required'));
        }

        // @ts-ignore
        if (!this.$v.key.alphaNum) {
            errors.push(this.$t('common.validation.alphanumeric'));
        }
        return errors;
    }

    public async submit(): Promise<PermissionEditor | ValidationError> {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return Promise.reject(new ValidationError('Form is invalid..'));
        }

        try {
            this.toggleLoading();
            await this.etcd.setPermissions(
                {
                    name: this.name,
                    key: this.key,
                    permission: this.permission.value,
                    isRange: this.prefix,
                    grant: true,
                },
                this.createMode
            );
            this.toggleLoading();
            this.$emit('permission');
            this.$store.commit('message', Messages.success());
        } catch (e) {
            this.toggleLoading();
            if (e === false) {
                this.$store.commit(
                    'message',
                    Messages.error(
                        'permissionEditor.messages.duplicateKey',
                        true
                    )
                );
            } else {
                this.$store.commit('message', Messages.error(e));
            }
        }

        return Promise.resolve(this);
    }
}
</script>

<style scoped>
</style>
