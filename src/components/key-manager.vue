<template>
    <v-layout align-start justify-center row>
        <v-flex pa-1 grow fill-height>
            <v-expansion-panel
                focusable
                dark
                class="help"
                v-model="help"
                :readonly="true"
            >
                <v-expansion-panel-content dark class="darker">
                    <template v-slot:actions>
                        <v-tooltip
                            data-test="key-manager.help.tooltip"
                            slot="prepend"
                            bottom
                            max-width="200"
                        >
                            <v-icon
                                data-test="key-manager.help.icon"
                                @click="toggleHelp"
                                slot="activator"
                                color="primary"
                                light
                                medium
                                >help</v-icon
                            >
                            <span data-test="key-manager.help.span">{{
                                $t('common.help.tooltip')
                            }}</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:header>
                        <v-toolbar raised dark>
                            <v-toolbar-title
                                data-test="key-manager.help.toolbar-title"
                                >{{ $t('keyManager.title') }}</v-toolbar-title
                            >
                            <v-divider
                                data-test="key-manager.help.divider"
                                class="mx-2"
                                inset
                                vertical
                            ></v-divider>
                            <v-tooltip
                                data-test="key-manager.changeView.tooltip"
                                bottom
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="primary"
                                        @click="setViewType()"
                                        v-on="on"
                                        round
                                        dark
                                    >
                                        <i class="material-icons">{{
                                            getViewIcon()
                                        }}</i>
                                        {{ getViewType() }}
                                    </v-btn>
                                </template>
                                <span
                                    data-test="key-manager.changeView-tooltip.span"
                                    >{{
                                        $t('common.actions.changeView.tooltip')
                                    }}</span
                                >
                            </v-tooltip>
                            <v-tooltip
                                data-test="key-manager.openAll.tooltip"
                                bottom
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        v-if="isTreeView()"
                                        v-on="on"
                                        color="primary"
                                        @click="setOpenAll()"
                                        round
                                        dark
                                    >
                                        <v-icon
                                            data-test="key-manager.openAll.icon"
                                            >{{ changeOpenAllIcon() }}</v-icon
                                        >
                                        <span
                                            data-test="key-manager.openAll.span"
                                            >{{ changeLabelText() }}</span
                                        >
                                    </v-btn>
                                </template>
                                <span
                                    data-test="key-manager.openAll-tooltip.span"
                                    >{{
                                        $t('common.actions.openAll.tooltip')
                                    }}</span
                                >
                            </v-tooltip>
                            <v-layout row>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                            v-if="isTreeView()"
                                            prepend-icon="vertical_split"
                                            data-test="key-manager.separator.text-field"
                                            ref="separator"
                                            v-on="on"
                                            v-model="separator"
                                            v-on:change="loadTree"
                                            :error-messages="separatorErrors"
                                            required
                                            @input="$v.separator.$touch()"
                                            @blur="$v.separator.$touch()"
                                        >
                                        </v-text-field>
                                    </template>
                                    <span>{{
                                        $t('common.actions.separator.tooltip')
                                    }}</span>
                                </v-tooltip>
                            </v-layout>
                            <v-spacer
                                data-test="key-manager.help.spacer"
                            ></v-spacer>
                            <v-text-field
                                data-test="key-manager.help.text-field"
                                dark
                                ref="search"
                                color="white"
                                v-model="filter"
                                prepend-icon="search"
                                :placeholder="$t('common.lists.filter')"
                            ></v-text-field>
                            <v-tooltip
                                data-test="key-manager.purgeAll.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="key-manager.purgeAll.button"
                                        color="error"
                                        round
                                        dark
                                        @click="purge"
                                        v-on="on"
                                    >
                                        <v-icon
                                            data-test="key-manager.purgeAll.icon"
                                            >remove_circle</v-icon
                                        >
                                        <span
                                            data-test="key-manager.purgeAll-label.span"
                                            >{{
                                                $t(
                                                    'common.actions.purgeAll.label'
                                                )
                                            }}</span
                                        >
                                    </v-btn>
                                </template>
                                <span
                                    data-test="key-manager.purgeAll-tooltip.span"
                                    >{{
                                        $t('common.actions.purgeAll.tooltip')
                                    }}</span
                                >
                            </v-tooltip>
                            <v-tooltip
                                data-test="key-manager.create.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="key-manager.create.button"
                                        color="primary"
                                        round
                                        dark
                                        @click="addItem"
                                        v-on="on"
                                    >
                                        <v-icon
                                            data-test="key-manager.create.icon"
                                            >add</v-icon
                                        >
                                        <span
                                            data-test="key-manager.create-label.span"
                                            >{{
                                                $t(
                                                    'common.actions.create.label'
                                                )
                                            }}</span
                                        >
                                    </v-btn>
                                </template>
                                <span
                                    data-test="key-manager.create-tooltip.span"
                                    >{{
                                        $t('common.actions.create.tooltip')
                                    }}</span
                                >
                            </v-tooltip>

                            <v-tooltip
                                data-test="key-manager.removeAll.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="key-manager.removeAll.button"
                                        color="primary"
                                        @click.stop="deleteMany"
                                        round
                                        dark
                                        v-on="on"
                                    >
                                        <v-icon
                                            data-test="key-manager.removeAll.icon"
                                            >delete</v-icon
                                        >
                                        <span
                                            data-test="key-manager.removeAll-label.span"
                                            >{{
                                                $t(
                                                    'common.actions.removeAll.label'
                                                )
                                            }}</span
                                        >
                                    </v-btn>
                                </template>
                                <span
                                    data-test="key-manager.removeAll-tooltip.span"
                                    >{{
                                        $t('common.actions.removeAll.tooltip')
                                    }}</span
                                >
                            </v-tooltip>

                            <v-tooltip bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="key-manager.removeAll.button"
                                        color="primary"
                                        @click.stop="touch(null, true)"
                                        round
                                        dark
                                        v-on="on"
                                    >
                                        <v-icon
                                            data-test="key-manager.touchAll.icon"
                                            >touch_app</v-icon
                                        >
                                        <span
                                            data-test="key-manager.touchAll-label.span"
                                            >{{
                                                $t(
                                                    'keyManager.actions.touchAll.label'
                                                )
                                            }}</span
                                        >
                                    </v-btn>
                                </template>
                                <span
                                    data-test="key-manager.touchAll-tooltip.span"
                                    >{{
                                        $t(
                                            'keyManager.actions.touchAll.tooltip'
                                        )
                                    }}</span
                                >
                            </v-tooltip>
                        </v-toolbar>
                    </template>
                    <v-tabs
                        v-model="helpbar"
                        dark
                        color="black"
                        slider-color="primary"
                        grow
                    >
                        <v-tab
                            data-test="key-manager.common-help-tabs-info.tab"
                            ripple
                            >{{ $t('common.help.tabs.info') }}</v-tab
                        >
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text
                                    data-test="key-manager.common-help-infoTitle.card-text"
                                >
                                    <h2
                                        data-test="key-manager.common-help-infoTitle.h2"
                                        class="title"
                                    >
                                        {{ $t('common.help.infoTitle') }}
                                    </h2>
                                    <p
                                        data-test="key-manager.common-help-infoTitle-1.p"
                                        class="spacer"
                                    ></p>
                                    <p
                                        data-test="key-manager.common-help-text.p"
                                        v-html="
                                            platformService.getHelp(
                                                $t('keyManager.help.text')
                                            )
                                        "
                                    ></p>
                                    <p
                                        data-test="key-manager.common-help-infoTitle-2.p"
                                        class="spacer"
                                    ></p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab
                            data-test="key-manager.common-help-tabs-shortcuts.tab"
                            ripple
                            >{{ $t('common.help.tabs.shortcuts') }}</v-tab
                        >
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-1.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + a`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-openEditor.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'common.help.shortcuts.openEditor'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-2.p"
                                                class="rounded"
                                            >
                                                {{ `esc` }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-closeEditor.p"
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
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-3.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + p`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-purge.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'common.help.shortcuts.purge'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-4.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + r`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-remove.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'common.help.shortcuts.remove'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-5.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + t`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-touch.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'keyManager.help.shortcuts.touch'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-6.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + h`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-help.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'common.help.shortcuts.help'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                    <hr
                        data-test="key-manager.blackline.hr"
                        class="blackLine"
                    />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-card raised dark>
                <v-treeview
                    :items="treeData"
                    :search="filter"
                    :open-all="isOpenAll"
                    ref="tree"
                    hoverable
                    v-model="selected"
                    :open-on-click="true"
                    :selectable="true"
                    v-if="isTreeView()"
                    expand-icon="expand_more"
                    on-icon="bookmark"
                    off-icon="bookmark_border"
                    return-object
                >
                    <template v-slot:append="{ item }">
                        <v-icon
                            v-if="!item.children"
                            @click="editItem(item.original)"
                            >edit</v-icon
                        >
                        <v-icon
                            v-if="!item.children"
                            @click="deleteSingle(item.original)"
                            >delete</v-icon
                        >
                        <v-icon
                            v-if="!item.children"
                            @click="touch(item.original)"
                            >touch_app</v-icon
                        >
                    </template>
                </v-treeview>
                <v-data-table
                    v-if="!isTreeView()"
                    ref="table"
                    :search="filter"
                    :headers="headers"
                    v-bind:items="data"
                    item-key="key"
                    select-all
                    v-model="selected"
                    :loading="loading"
                >
                    <v-progress-linear
                        data-test="key-manager.progress.progress-linear"
                        v-slot:progress
                        color="blue"
                        indeterminate
                    ></v-progress-linear>
                    <template v-slot:items="props">
                        <td>
                            <v-checkbox
                                data-test="key-manager.props-selected.chechbox"
                                v-model="props.selected"
                                primary
                                hide-details
                            ></v-checkbox>
                        </td>
                        <td
                            data-test="key-manager.props-item-key.td"
                            class="text-xs-left"
                            @dblclick="clipboardService.copyToClipboard(props.item.key)"
                        >
                            {{ props.item.key }}
                        </td>
                        <td
                            data-test="key-manager.props-item-value.td"
                            class="text-xs-left"
                        >
                            {{ props.item.value }}
                        </td>
                        <td
                            data-test="key-manager.actions-edit.td"
                            class="justify-center layout px-0"
                        >
                            <v-tooltip
                                data-test="key-manager.actions-edit.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="key-manager.actions-edit.icon"
                                        small
                                        @click="editItem(props.item)"
                                        v-on="on"
                                        >edit</v-icon
                                    >
                                </template>
                                <span
                                    data-test="key-manager.actions-edit.span"
                                    >{{ $t('keyManager.actions.edit') }}</span
                                >
                            </v-tooltip>
                            <v-tooltip
                                data-test="key-manager.actions-remove.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="key-manager.actions-remove.icon"
                                        small
                                        slot="activator"
                                        @click="deleteSingle(props.item)"
                                        v-on="on"
                                        >delete</v-icon
                                    >
                                </template>
                                <span
                                    data-test="key-manager.actions-remove.span"
                                    >{{ $t('keyManager.actions.remove') }}</span
                                >
                            </v-tooltip>
                            <v-tooltip
                                data-test="key-manager.actions-touch.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="key-manager.actions-touch.icon"
                                        small
                                        slot="activator"
                                        @click="touch(props.item)"
                                        v-on="on"
                                        >touch_app</v-icon
                                    >
                                </template>
                                <span
                                    data-test="key-manager.actions-touch.span"
                                    >{{ $t('keyManager.actions.touch') }}</span
                                >
                            </v-tooltip>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex pa-1 shrink>
            <v-expand-x-transition>
                <key-editor
                    class="editor"
                    :data="currentItem"
                    :mode="operation"
                    v-on:cancel="cancelEdit"
                    v-on:reload="load"
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
        <no-selection-dialog
            :open="noSelection"
            v-on:close="closeNoSelection"
        ></no-selection-dialog>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Messages from '@/lib/messages';
import { GenericObject, EtcdItem, EtcdKey } from '../../types';
import KeyEditor from './key-editor.vue';
import KeyService from '../services/key.service';
import { CrudBase, List } from '../lib/crud.class';
import { set as _set, get as _get } from 'lodash-es';
import * as Tree from 'list-to-tree';
import {
    required,
    requiredIf,
    alphaNum,
    integer,
    ipAddress,
    or,
    url,
} from 'vuelidate/lib/validators';

interface TreeNodeType {
    id?: string | number;
    isLeaf?: boolean;
    parent?: string | number;
    name?: string;
    children?: TreeNodeType[];
    original?: GenericObject;
}

@Component({
    name: 'key-manager',
    validations: {
        separator: {
            required,
        },
    },
    components: {
        'key-editor': KeyEditor,
    },
})
export default class KeyManager extends CrudBase implements List {
    public treeData = [];
    public separator: string = '';

    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'key',
        },
        { text: '', value: 'value', sortable: true },
    ];
    public view: 'tree' | 'flat' = 'flat';

    public isOpenAll: boolean = false;

    protected etcd: KeyService;

    get separatorErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.separator.$dirty) {
            return errors;
        }

        // @ts-ignore
        !this.$v.separator.required &&
            errors.push(this.$t('common.validation.required'));
        return errors;
    }

    constructor() {
        super();
        this.etcd = new KeyService(this.$store.state.connection.getClient());
    }

    public mounted() {
        this.keyboardEvents.bind('meta+t', () => {
            this.touch(null, true);
        });
        this.separator = this.$store.state.separator;
    }

    public created() {
        this.defaultItem = new EtcdKey();
        this.translateHeaders(
            'keyManager.columns.key',
            'keyManager.columns.value'
        );
        this.load();
    }

    public async editItem(item: GenericObject): Promise<KeyManager> {
        try {
            this.closeEditor();
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

        return Promise.resolve(this);
    }

    public async touch(
        item: EtcdItem | null,
        selection: boolean = false
    ): Promise<KeyManager> {
        if (selection && !this.hasSelection()) {
            this.noSelection = true;
            return Promise.resolve(this);
        }
        const toBeTouched = selection
            ? this.getSelectedKeys()
            : [(item as EtcdItem).key];
        this.noSelection = false;
        try {
            this.toggleLoading();
            await this.etcd.touch(toBeTouched);
            this.toggleLoading();
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
            this.toggleLoading();
        }

        return Promise.resolve(this);
    }

    public async confirmPurge(): Promise<KeyManager> {
        try {
            // @ts-ignore
            await CrudBase.options.methods.confirmPurge.call(this);
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return Promise.resolve(this);
    }

    public async confirmDelete(): Promise<KeyManager> {
        try {
            // @ts-ignore
            const result = await CrudBase.options.methods.confirmDelete.call(
                this,
                'key'
            );
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return this;
    }

    public async load(prefix?: string): Promise<KeyManager> {
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
        this.loadTree();

        return Promise.resolve(this);
    }

    public isTreeView() {
        return this.view === 'tree';
    }

    public changeOpenAllIcon() {
        return this.isOpenAll ? 'lock' : 'lock_open';
    }
    public changeLabelText() {
        if (this.isOpenAll) {
            return this.$t('common.actions.openAll.label.close');
        }
        return this.$t('common.actions.openAll.label.open');
    }

    public setOpenAll() {
        Vue.set(this, 'isOpenAll', !this.isOpenAll);
        (this.$refs.tree as any).updateAll(this.isOpenAll);
    }

    public setViewType() {
        this.view = this.view === 'tree' ? 'flat' : 'tree';
    }

    public getViewType() {
        return this.$t(
            `keyManager.actions.${this.isTreeView() ? 'flat' : 'tree'}View`
        );
    }

    public getViewIcon() {
        return this.isTreeView() ? 'list' : 'account_tree';
    }

    public loadTree() {
        if (!this.separator) {
            return;
        }
        this.$store.commit('separator', this.separator);
        // @ts-ignore
        const config = JSON.parse(this.$ls.get('config'));
        config.separator = this.separator;
        // @ts-ignore
        this.$ls.set('config', JSON.stringify(config));
        const tmp: TreeNodeType[] = [];
        const keyMap = {};
        let counter = 1;
        for (const item of this.data) {
            const keys = item.key.split(`${this.separator}`);

            for (let i = 0; i < keys.length; i += 1) {
                const object: TreeNodeType = {};
                object.id = counter += 1;
                object.name = keys[i];
                object.original = {
                    key: item.key,
                    value: item.value,
                };

                _set(keyMap, keys.slice(0, i + 1), {
                    nodeId: object.id,
                    ...(_get(keyMap, keys.slice(0, i + 1)) as any),
                });

                const parentId: { nodeId: number } = _get(
                    keyMap,
                    keys.slice(0, i)
                );

                object.parent = 0;
                if (parentId) {
                    object.parent = parentId.nodeId;
                }

                if (
                    !tmp.find(
                        (node: TreeNodeType) =>
                            node.name === object.name &&
                            node.parent === object.parent
                    )
                ) {
                    tmp.push(object);
                }
            }
            const object: TreeNodeType = {};
            object.id = counter += 1;
            object.name = item.value;
            object.parent = tmp[tmp.length - 1].id;
            object.original = {
                key: item.key,
                value: item.value,
            };
            tmp.push(object);
        }

        this.treeData = new Tree(tmp, {
            key_id: 'id',
            key_parent: 'parent',
            key_child: 'children',
            empty_children: false,
        }).GetTree();
    }
}
</script>

<style scoped></style>
