<template>
    <v-layout align-start justify-center row>
        <v-flex pa-1 grow fill-height>
            <v-expansion-panel focusable dark class="help" v-model="help" :readonly="true">
                <v-expansion-panel-content dark class="darker">
                    <template v-slot:actions>
                        <v-tooltip data-test="key-manager.help.tooltip" slot="prepend" bottom max-width="200">
                            <v-icon data-test="key-manager.help.icon" @click="toggleHelp" slot="activator" color="primary" light medium>help</v-icon>
                            <span data-test="key-manager.help.span">{{ $t('common.help.tooltip') }}</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:header>
                        <v-toolbar raised dark>
                            <v-toolbar-title data-test="key-manager.help.toolbar-title">{{ $t("keyManager.title") }}</v-toolbar-title>
                            <v-divider data-test="key-manager.help.divider" class="mx-2" inset vertical></v-divider>
                            <v-spacer data-test="key-manager.help.spacer"></v-spacer>
                            <v-text-field
                                data-test="key-manager.help.text-field"
                                dark
                                ref="search"
                                color="white"
                                v-model="filter"
                                prepend-icon="search"
                                :placeholder="$t('common.lists.filter')"
                            ></v-text-field>
                            <v-tooltip data-test="key-manager.purgeAll.tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn data-test="key-manager.purgeAll.button" color="error" round dark @click="purge" v-on="on">
                                        <v-icon data-test="key-manager.purgeAll.icon">remove_circle</v-icon>
                                        <span data-test="key-manager.purgeAll-label.span">{{ $t("common.actions.purgeAll.label") }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="key-manager.purgeAll-tooltip.span">{{ $t("common.actions.purgeAll.tooltip") }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="key-manager.create.tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn data-test="key-manager.create.button" color="primary" round dark @click="addItem" v-on="on">
                                        <v-icon data-test="key-manager.create.icon">add</v-icon>
                                        <span data-test="key-manager.create-label.span">{{ $t("common.actions.create.label") }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="key-manager.create-tooltip.span">{{ $t("common.actions.create.tooltip") }}</span>
                            </v-tooltip>

                            <v-tooltip data-test="key-manager.removeAll.tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="key-manager.removeAll.button"
                                        color="primary"
                                        @click.stop="deleteMany"
                                        round
                                        dark
                                        v-on="on"
                                    >
                                        <v-icon data-test="key-manager.removeAll.icon">delete</v-icon>
                                        <span data-test="key-manager.removeAll-label.span">{{ $t("common.actions.removeAll.label") }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="key-manager.removeAll-tooltip.span">{{ $t("common.actions.removeAll.tooltip") }}</span>
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
                                        <v-icon data-test="key-manager.touchAll.icon">touch_app</v-icon>
                                        <span data-test="key-manager.touchAll-label.span">{{ $t("keyManager.actions.touchAll.label") }}</span>
                                    </v-btn>
                                </template>
                                <span data-test="key-manager.touchAll-tooltip.span">{{$t("keyManager.actions.touchAll.tooltip") }}</span>
                            </v-tooltip>
                        </v-toolbar>
                    </template>
                    <v-tabs v-model="helpbar" dark color="black" slider-color="primary" grow>
                        <v-tab data-test="key-manager.common-help-tabs-info.tab" ripple>{{ $t('common.help.tabs.info') }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text data-test="key-manager.common-help-infoTitle.card-text">
                                    <h2 data-test="key-manager.common-help-infoTitle.h2" class="title">{{ $t("common.help.infoTitle") }}</h2>
                                    <p data-test="key-manager.common-help-infoTitle-1.p" class="spacer"></p>
                                    <p data-test="key-manager.common-help-text.p" v-html="platformService.getHelp($t('keyManager.help.text'))"></p>
                                    <p data-test="key-manager.common-help-infoTitle-2.p" class="spacer"></p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab data-test="key-manager.common-help-tabs-shortcuts.tab" ripple>{{ $t('common.help.tabs.shortcuts') }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                      <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-1.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + a` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="key-manager.common-help-tabs-shortcuts-openEditor.p" class="label">{{ $t("common.help.shortcuts.openEditor") }}</p>
                                        </v-flex>
                                    </v-layout>
                                     <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-2.p"
                                                class="rounded"
                                            >{{ `esc` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="key-manager.common-help-tabs-shortcuts-closeEditor.p" class="label">{{ $t("common.help.shortcuts.closeEditor") }}</p>
                                        </v-flex>
                                    </v-layout>
                                     <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-3.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + p` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="key-manager.common-help-tabs-shortcuts-purge.p" class="label">{{ $t("common.help.shortcuts.purge") }}</p>
                                        </v-flex>
                                    </v-layout>
                                     <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-4.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + r` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="key-manager.common-help-tabs-shortcuts-remove.p" class="label">{{ $t("common.help.shortcuts.remove") }}</p>
                                        </v-flex>
                                    </v-layout>
                                     <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-5.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + t` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="key-manager.common-help-tabs-shortcuts-touch.p" class="label">{{ $t("keyManager.help.shortcuts.touch") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="key-manager.common-help-tabs-shortcuts-6.p"
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + h` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p data-test="key-manager.common-help-tabs-shortcuts-help.p" class="label">{{ $t("common.help.shortcuts.help") }}</p>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                    <hr data-test="key-manager.blackline.hr" class="blackLine" />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-card raised dark>
                <v-data-table
                    ref="table"
                    :search="filter"
                    :headers="headers"
                    v-bind:items="data"
                    item-key="key"
                    select-all
                    v-model="selected"
                    :loading="loading"
                >
                    <v-progress-linear data-test="key-manager.progress.progress-linear" v-slot:progress color="blue" indeterminate></v-progress-linear>
                    <template v-slot:items="props">
                        <td>
                            <v-checkbox data-test="key-manager.props-selected.chechbox" v-model="props.selected" primary hide-details></v-checkbox>
                        </td>
                        <td data-test="key-manager.props-item-key.td" class="text-xs-left" @click="clipboardService.copyToClipboard(props.item.key)">{{ props.item.key }}</td>
                        <td data-test="key-manager.props-item-value.td" class="text-xs-left">{{ props.item.value }}</td>
                        <td data-test="key-manager.actions-edit.td" class="justify-center layout px-0">
                            <v-tooltip data-test="key-manager.actions-edit.tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-icon data-test="key-manager.actions-edit.icon" small @click="editItem(props.item)" v-on="on">edit</v-icon>
                                </template>
                                <span data-test="key-manager.actions-edit.span">{{ $t("keyManager.actions.edit") }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="key-manager.actions-remove.tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="key-manager.actions-remove.icon"
                                        small
                                        slot="activator"
                                        @click="deleteSingle(props.item)"
                                        v-on="on"
                                    >delete</v-icon>
                                </template>
                                <span data-test="key-manager.actions-remove.span">{{ $t("keyManager.actions.remove") }}</span>
                            </v-tooltip>
                            <v-tooltip data-test="key-manager.actions-touch.tooltip" bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="key-manager.actions-touch.icon"
                                        small
                                        slot="activator"
                                        @click="touch(props.item)"
                                        v-on="on"
                                    >touch_app</v-icon>
                                </template>
                                <span data-test="key-manager.actions-touch.span">{{ $t("keyManager.actions.touch") }}</span>
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
        <no-selection-dialog :open="noSelection" v-on:close="closeNoSelection"></no-selection-dialog>
    </v-layout>
</template>

<script lang='ts'>
import Component from 'vue-class-component';
import Messages from '@/lib/messages';
import { GenericObject, EtcdItem, EtcdKey } from '../../types';
import KeyEditor from './key-editor.vue';
import KeyService from '../services/key.service';
import { CrudBase, List } from '../lib/crud.class';

@Component({
    name: 'key-manager',
    components: {
        'key-editor': KeyEditor,
    },
})
export default class KeyManager extends CrudBase implements List {
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
        this.etcd = new KeyService(this.$store.state.connection.getClient());
    }


    public mounted() {
        this.keyboardEvents.bind('meta+t', () => {
            this.touch(null, true);
        });
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

        return Promise.resolve(this);
    }
}
</script>

<style scoped>
</style>
