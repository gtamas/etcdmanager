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
              v-model="name"
              :disabled="editMode"
              :error-messages="nameErrors"
              :label="$t('watcherEditor.fields.name.label')"
              :placeholder="$t('watcherEditor.fields.name.placeholder')"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            >
              <v-tooltip slot="prepend" bottom max-width="200">
                <v-icon slot="activator" color="primary" dark>info</v-icon>
                <span>{{ $t('watcherEditor.fields.name.tooltip') }}</span>
              </v-tooltip>
            </v-text-field>

            <v-text-field
              dark
              type="text"
              v-model="key"
              :disabled="editMode"
              :error-messages="keyErrors"
              :label="$t('watcherEditor.fields.key.label')"
              :placeholder="$t('watcherEditor.fields.key.placeholder')"
              required
              @input="$v.key.$touch()"
              @blur="$v.key.$touch()"
            >
              <v-tooltip slot="prepend" bottom max-width="200">
                <v-icon slot="activator" color="primary" dark>info</v-icon>
                <span>{{ $t('watcherEditor.fields.key.tooltip') }}</span>
              </v-tooltip>
            </v-text-field>

            <v-checkbox
              dark
              v-model="prefix"
              :label="$t('watcherEditor.fields.prefix.label')"
              required
            >
              <v-tooltip slot="prepend" bottom max-width="200">
                <v-icon slot="activator" color="primary" dark>info</v-icon>
                <span>{{ $t('watcherEditor.fields.prefix.tooltip') }}</span>
              </v-tooltip>
            </v-checkbox>

            <v-data-table :headers="headers" v-bind:items="actions" item-key="id" hide-actions>
              <template v-slot:items="props">
                <td>{{ props.item.action.name }}</td>
                <td class="text-xs-right">{{ props.item.event.name }}</td>
                <td class="justify-center layout px-0">
                  <v-tooltip bottom max-width="200">
                    <template v-slot:activator="{ on }">
                      <v-icon small @click="editAction(props.item)" v-on="on">edit</v-icon>
                    </template>
                    <span>{{ $t('watcherEditor.actionList.actions.edit')}}</span>
                  </v-tooltip>
                  <v-tooltip bottom max-width="200">
                    <template v-slot:activator="{ on }">
                      <v-icon
                        small
                        slot="activator"
                        @click="deleteAction(props.item)"
                        v-on="on"
                      >delete</v-icon>
                    </template>
                    <span>{{ $t('watcherEditor.actionList.actions.remove') }}</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>

            <v-btn :disabled="!isValid()" round color="primary" @click="submit">
              <v-icon>add</v-icon>
              <span>{{ opTitle }}</span>
            </v-btn>
            <v-btn round color="primary" @click="addAction">
              <v-icon>event</v-icon>
              <span>{{ $t('watcherEditor.actions.actions.label') }}</span>
            </v-btn>
            <v-btn color="warning" round @click="cancel">
              <v-icon>close</v-icon>
              <span>{{ $t('common.actions.close.label') }}</span>
            </v-btn>
            <v-spacer></v-spacer>
          </v-form>
        </v-flex>
      </v-layout>
      <v-dialog v-model="actionDialog" persistent max-width="290">
        <v-card dark>
          <action-editor
            v-on:cancel="cancelAction"
            v-on:action="saveAction"
            :data="currentAction"
            :mode="actionEditorMode"
            v-if="actionDialog"
          ></action-editor>
        </v-card>
      </v-dialog>
    </v-container>
  </v-card>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { GenericObject, WatcherAction, WatcherEntry } from '../../types';
import { required, alphaNum } from 'vuelidate/lib/validators';
import Messages from '@/lib/messages';
import { BaseEditor } from '../lib/editor.class';
import WatcherService from '../services/watcher.service';
import { Prop } from 'vue-property-decorator';
import ActionEditor from './action-editor.vue';
import uuidv1 from 'uuid/v1';

@Component({
    name: 'watcher-editor',
    validations: {
        name: {
            required,
            alphaNum,
        },
        key: {
            required,
            alphaNum,
        },
    },
    components: {
        'action-editor': ActionEditor,
    },
})
export default class WatcherEditor extends BaseEditor {
    // @ts-ignore
    @Prop() data: {
        name: string;
        key: string;
        prefix: boolean;
        actions: WatcherAction[];
    };
    // @ts-ignore
    @Prop() mode: string;

    public itemId: string = 'name';
    public itemType: string = 'watcher';
    public actionDialog: boolean = false;
    public actionEditorMode: 'create' | 'edit' = 'create';
    public currentAction: WatcherAction;
    public defaultAction: WatcherAction = {
        action: { name: 'Print to console', value: 0, type: 1 },
        event: { name: 'put', value: 0, type: 2 },
    };
    public selected: GenericObject[] = [];
    public name: string = this.data.name || '';
    public key: string = this.data.key || '';
    public prefix: boolean = this.data.prefix || false;
    public actions: WatcherAction[] = this.data.actions || [];

    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'action.name',
        },
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'event.name',
        },
    ];

    constructor() {
        super();
        this.currentAction = { ...this.defaultAction };
    }

    created() {
        this.translateHeaders(
            'watcherEditor.actionList.columns.action',
            'watcherEditor.actionList.columns.event'
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

    get keyErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.key.$dirty) {
            return errors;
        }
        // @ts-ignore
        !this.$v.key.required && errors.push('Item is required');
        // @ts-ignore
        !this.$v.key.alphaNum && errors.push('Alphanumeric value expected');
        return errors;
    }

    isValid() {
        return !this.$v.$invalid && this.actions.length > 0;
    }

    addAction() {
        this.actionDialog = true;
        this.actionEditorMode = 'create';
        this.currentAction = { ...this.defaultAction };
    }

    cancelAction() {
        this.actionDialog = false;
    }

    saveAction(action: WatcherAction) {
        if (!action.id) {
            action.id = uuidv1();
            this.actions.push(action);
        } else {
            const current = this.actions.find((ac) => {
                return action.id === ac.id;
            });
            Vue.set(current as WatcherAction, 'action', action.action);
            Vue.set(current as WatcherAction, 'event', action.event);
        }
        this.cancelAction();
    }

    editAction(action: WatcherAction) {
        this.currentAction = action;
        this.actionDialog = true;
        this.actionEditorMode = 'edit';
    }

    deleteAction(actionToDelete: WatcherAction) {
        this.actions = this.actions.filter((action) => {
            return action.id !== actionToDelete.id;
        });
    }

    public submit(): WatcherEditor | boolean {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return false;
        }

        // @ts-ignore
        const backend = new WatcherService(
            // @ts-ignore
            this.$ls,
            this.$store.state.connection.getClient()
        );

        this.toggleLoading();
        const res = backend.saveWatcher(
            new WatcherEntry(
                this.name,
                this.key,
                this.prefix,
                false,
                this.actions
            ),
            this.createMode
        );
        this.toggleLoading();

        if (!res) {
            this.$store.commit(
                'message',
                Messages.error(
                    this.$t('watcherEditor.messages.duplicate').toString()
                )
            );
            return false;
        }

        this.$store.commit('message', Messages.success());
        this.$emit('reload');
        this.$v.$reset();
        if (this.createMode) {
            this.key = '';
            this.name = '';
            this.prefix = false;
            this.actions = [];
        }

        return this;
    }
}
</script>

<style scoped>
</style>
