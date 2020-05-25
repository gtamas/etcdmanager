<template>
    <v-card>
        <v-expansion-panel focusable dark class="help" v-model="help">
            <v-expansion-panel-content dark class="darker">
                <template v-slot:actions>
                    <v-tooltip
                        data-test="watcher-editor.help.tooltip"
                        slot="prepend"
                        bottom
                        max-width="200"
                    >
                        <v-icon
                            data-test="watcher-editor.help.icon"
                            slot="activator"
                            color="primary"
                            light
                            medium
                            >help</v-icon
                        >
                        <span data-test="watcher-editor.help.span">{{
                            $t('common.help.tooltip')
                        }}</span>
                    </v-tooltip>
                </template>
                <template v-slot:header>
                    <v-toolbar-title data-test="watcher-editor.title.title">{{
                        title
                    }}</v-toolbar-title>
                </template>
                <v-tabs
                    v-model="helpbar"
                    dark
                    color="black"
                    slider-color="primary"
                    grow
                >
                    <v-tab data-test="watcher-editor.help.tab" ripple>{{
                        $t('common.help.tabs.info')
                    }}</v-tab>
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                <h2
                                    data-test="watcher-editor.infotitle.h2"
                                    class="title"
                                >
                                    {{ $t('common.help.infoTitle') }}
                                </h2>
                                <p
                                    data-test="watcher-editor.spacer-1.p"
                                    class="spacer"
                                ></p>
                                <p
                                    data-test="watcher-editor.text.p"
                                    v-html="
                                        platformService.getHelp(
                                            $t('watcherEditor.help.text')
                                        )
                                    "
                                ></p>
                                <p
                                    data-test="watcher-editor.spacer-2.p"
                                    class="spacer"
                                ></p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab data-test="watcher-editor.shortcuts.tab" ripple>{{
                        $t('common.help.tabs.shortcuts')
                    }}</v-tab>
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p
                                            data-test="watcher-editor.shortcuts-save-rounded.p"
                                            class="rounded"
                                        >
                                            {{
                                                `${platformService.getMeta()} + s`
                                            }}
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="watcher-editor.shortcuts-save-label.p"
                                            class="label"
                                        >
                                            {{
                                                $t('common.help.shortcuts.save')
                                            }}
                                        </p>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p
                                            data-test="watcher-editor.shortcuts-save-rounded-enter.p"
                                            class="rounded"
                                        >
                                            enter
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="watcher-editor.shortcuts-save-label-enter.p"
                                            class="label"
                                        >
                                            {{
                                                $t('common.help.shortcuts.save')
                                            }}
                                        </p>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p
                                            data-test="watcher-editor.shortcuts-closeEditor-rounded.p"
                                            class="rounded"
                                        >
                                            esc
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="watcher-editor.shortcuts-closeEditor-label.p"
                                            class="label"
                                        >
                                            {{
                                                $t(
                                                    'common.help.shortcuts.closeEditor'
                                                )
                                            }}
                                        </p>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p
                                            data-test="watcher-editor.shortcuts-addAction-rounded.p"
                                            class="rounded"
                                        >
                                            {{
                                                `${platformService.getMeta()} + x`
                                            }}
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="watcher-editor.shortcuts-addAction-label.p"
                                            class="label"
                                        >
                                            {{
                                                $t(
                                                    'watcherEditor.help.shortcuts.addAction'
                                                )
                                            }}
                                        </p>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p
                                            data-test="watcher-editor.shortcuts-help-rounded.p"
                                            class="rounded"
                                        >
                                            {{
                                                `${platformService.getMeta()} + h`
                                            }}
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="watcher-editor.shortcuts-help-label.p"
                                            class="label"
                                        >
                                            {{
                                                $t('common.help.shortcuts.help')
                                            }}
                                        </p>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
                <hr data-test="watcher-editor.blackline.hr" class="blackLine" />
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <v-form ref="watcherForm" v-model="valid" lazy-validation>
                        <v-text-field
                            data-test="watcher-editor.name.text-field"
                            ref="name"
                            dark
                            v-model="name"
                            :readonly="editMode"
                            :error-messages="nameErrors"
                            :label="$t('watcherEditor.fields.name.label')"
                            :placeholder="
                                $t('watcherEditor.fields.name.placeholder')
                            "
                            required
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                        >
                            <v-tooltip
                                data-test="watcher-editor.name.tooltip"
                                slot="prepend"
                                bottom
                                max-width="200"
                            >
                                <v-icon
                                    data-test="watcher-editor.name.icon"
                                    slot="activator"
                                    color="primary"
                                    dark
                                    >info</v-icon
                                >
                                <span data-test="watcher-editor.name.span">{{
                                    $t('watcherEditor.fields.name.tooltip')
                                }}</span>
                            </v-tooltip>
                        </v-text-field>

                        <v-text-field
                            data-test="watcher-editor.key.text-field"
                            dark
                            type="text"
                            v-model="key"
                            :error-messages="keyErrors"
                            :label="$t('watcherEditor.fields.key.label')"
                            :placeholder="
                                $t('watcherEditor.fields.key.placeholder')
                            "
                            required
                            @input="$v.key.$touch()"
                            @blur="$v.key.$touch()"
                        >
                            <v-tooltip
                                data-test="watcher-editor.key.tooltip"
                                slot="prepend"
                                bottom
                                max-width="200"
                            >
                                <v-icon
                                    data-test="watcher-editor.key.icon"
                                    slot="activator"
                                    color="primary"
                                    dark
                                    >info</v-icon
                                >
                                <span data-test="watcher-editor.key.span">{{
                                    $t('watcherEditor.fields.key.tooltip')
                                }}</span>
                            </v-tooltip>
                        </v-text-field>

                        <v-checkbox
                            data-test="watcher-editor.prefix.text-field"
                            dark
                            v-model="prefix"
                            :label="$t('watcherEditor.fields.prefix.label')"
                            required
                        >
                            <v-tooltip slot="prepend" bottom max-width="200">
                                <v-icon
                                    data-test="watcher-editor.prefix.icon"
                                    slot="activator"
                                    color="primary"
                                    dark
                                    >info</v-icon
                                >
                                <span data-test="watcher-editor.prefix.span">{{
                                    $t('watcherEditor.fields.prefix.tooltip')
                                }}</span>
                            </v-tooltip>
                        </v-checkbox>

                        <v-data-table
                            :headers="headers"
                            v-bind:items="actions"
                            item-key="id"
                            hide-actions
                        >
                            <template v-slot:items="props">
                                <td data-test="watcher-editor.action-name.td">
                                    {{ props.item.action.name }}
                                </td>
                                <td
                                    data-test="watcher-editor.event-name.td"
                                    class="text-xs-right"
                                >
                                    {{ props.item.event.name }}
                                </td>
                                <td class="justify-center layout px-0">
                                    <v-tooltip bottom max-width="200">
                                        <template v-slot:activator="{ on }">
                                            <v-icon
                                                data-test="watcher-editor.edit.icon"
                                                small
                                                @click="editAction(props.item)"
                                                v-on="on"
                                                >edit</v-icon
                                            >
                                        </template>
                                        <span
                                            data-test="watcher-editor.edit.span"
                                            >{{
                                                $t(
                                                    'watcherEditor.actionList.actions.edit'
                                                )
                                            }}</span
                                        >
                                    </v-tooltip>
                                    <v-tooltip bottom max-width="200">
                                        <template v-slot:activator="{ on }">
                                            <v-icon
                                                data-test="watcher-editor.remove.icon"
                                                small
                                                slot="activator"
                                                @click="
                                                    deleteAction(props.item)
                                                "
                                                v-on="on"
                                                >delete</v-icon
                                            >
                                        </template>
                                        <span
                                            data-test="watcher-editor.remove.span"
                                            >{{
                                                $t(
                                                    'watcherEditor.actionList.actions.remove'
                                                )
                                            }}</span
                                        >
                                    </v-tooltip>
                                </td>
                            </template>
                        </v-data-table>

                        <v-btn
                            data-test="watcher-editor.submit.button"
                            :disabled="!isValid()"
                            round
                            color="primary"
                            @click="submit"
                        >
                            <v-icon data-test="watcher-editor.submit.icon"
                                >add</v-icon
                            >
                            <span
                                data-test="watcher-editor.submit-title.span"
                                >{{ opTitle }}</span
                            >
                        </v-btn>
                        <v-btn
                            data-test="watcher-editor.actions.button"
                            round
                            color="primary"
                            @click="addAction"
                        >
                            <v-icon data-test="watcher-editor.add.icon"
                                >event</v-icon
                            >
                            <span data-test="watcher-editor.add-label.span">{{
                                $t('watcherEditor.actions.actions.label')
                            }}</span>
                        </v-btn>
                        <v-btn color="warning" round @click="cancel">
                            <v-icon data-test="watcher-editor.close.icon"
                                >close</v-icon
                            >
                            <span data-test="watcher-editor.close-label.span">{{
                                $t('common.actions.close.label')
                            }}</span>
                        </v-btn>
                        <v-spacer
                            data-test="watcher-editor.actionlist.spacer"
                        ></v-spacer>
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

<script lang="ts">
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
            required
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

    mounted() {
        this.bindDefaultEvents('watcherForm');
        this.keyboardEvents.bind(['ctrl+x', 'meta+x'], () => {
            this.addAction();
        });
        this.focus('name');
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
        if (!this.$v.key.required) {
            errors.push('Item is required');
        }

        return errors;
    }

    isValid() {
        return !this.$v.$invalid && this.actions.length > 0;
    }

    addAction() {
        this.actionDialog = true;
        this.actionEditorMode = 'create';
        this.currentAction = { ...this.defaultAction };
        this.focus('name');
    }

    cancelAction() {
        this.actionDialog = false;
        this.focus('name');
    }

    saveAction(action: WatcherAction) {
        if (!action.id) {
            const exists = this.actions.find((act) => {
                if (
                    act.action.name === action.action.name &&
                    act.event.name === action.event.name
                ) {
                    return true;
                }
                return false;
            });
            if (!exists) {
                action.id = uuidv1();
                this.actions.push(action);
                this.submit();
            } else {
                this.$store.commit(
                    'message',
                    Messages.error(
                        'watcherEditor.messages.duplicateAction',
                        true
                    )
                );
            }
        } else {
            const current = this.actions.find((ac) => {
                return action.id === ac.id;
            });
            Vue.set(current as WatcherAction, 'action', action.action);
            Vue.set(current as WatcherAction, 'event', action.event);
            this.submit();
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
        if (this.actions.length) {
            this.submit();
        }
        this.focus('name');
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
                Messages.error('watcherEditor.messages.duplicate', true)
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

        this.focus('name');
        return this;
    }
}
</script>

<style scoped></style>
