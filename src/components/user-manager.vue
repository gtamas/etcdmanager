<template>
    <v-layout align-start justify-center row>
        <v-flex pa-1 grow fill-height>
            <v-expansion-panel focusable dark class="help" v-model="help" :readonly="true">
                <v-expansion-panel-content dark class="darker">
                    <template v-slot:actions>
                        <v-tooltip slot="prepend" bottom max-width="200">
                            <v-icon @click="toggleHelp" slot="activator" color="primary" light medium>help</v-icon>
                            <span>{{ $t('common.help.tooltip') }}</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:header>
                        <v-toolbar raised dark>
                            <v-toolbar-title>{{ $t("userManager.title") }}</v-toolbar-title>
                            <v-divider class="mx-2" inset vertical></v-divider>
                            <v-spacer></v-spacer>
                            <v-text-field
                                dark
                                ref="search"
                                color="white"
                                v-model="filter"
                                prepend-icon="search"
                                :placeholder="$t('common.lists.filter')"
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
                                    <v-btn
                                        color="primary"
                                        @click.stop="deleteMany"
                                        round
                                        dark
                                        v-on="on"
                                    >
                                        <v-icon>delete</v-icon>
                                        <span>{{ $t("common.actions.removeAll.label") }}</span>
                                    </v-btn>
                                </template>
                                <span>{{ $t("common.actions.removeAll.tooltip") }}</span>
                            </v-tooltip>
                        </v-toolbar>
                    </template>
                    <v-tabs v-model="helpbar" dark color="black" slider-color="primary" grow>
                        <v-tab ripple>{{ $t('common.help.tabs.info') }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <h2 class="title">{{ $t("common.help.infoTitle") }}</h2>
                                    <p class="spacer"></p>
                                    <p v-html="platformService.getHelp($t('userManager.help.text'))"></p>
                                    <p class="spacer"></p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab ripple>{{ $t('common.help.tabs.shortcuts') }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + a` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                class="label"
                                            >{{ $t("common.help.shortcuts.openEditor") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p class="rounded">{{ `esc` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                class="label"
                                            >{{ $t("common.help.shortcuts.closeEditor") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + p` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p class="label">{{ $t("common.help.shortcuts.purge") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + r` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                class="label"
                                            >{{ $t("common.help.shortcuts.remove") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + h` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p class="label">{{ $t("common.help.shortcuts.help") }}</p>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                    <hr class="blackLine" />
                </v-expansion-panel-content>
            </v-expansion-panel>
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
                                <span>{{ $t("userManager.actions.edit") }}</span>
                            </v-tooltip>
                            <v-tooltip bottom max-width="200">
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        small
                                        slot="activator"
                                        @click="deleteSingle(props.item)"
                                        v-on="on"
                                    >delete</v-icon>
                                </template>
                                <span>{{ $t("userManager.actions.remove") }}</span>
                            </v-tooltip>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex pa-1 shrink>
            <v-expand-x-transition>
                <user-editor
                    class="editor"
                    :data="currentItem"
                    :mode="operation"
                    v-on:cancel="cancelEdit"
                    v-on:reload="load"
                    v-if="editor"
                ></user-editor>
            </v-expand-x-transition>
        </v-flex>

        <delete-dialog
            :open="deleteDialog"
            :itemName="'user'"
            v-on:confirm="confirmDelete"
            v-on:cancel="cancelDelete"
        ></delete-dialog>

        <purge-dialog
            :open="purgeDialog"
            :itemName="'users'"
            v-on:confirm="confirmPurge"
            v-on:cancel="cancelPurge"
        ></purge-dialog>
        <no-selection-dialog :open="noSelection" v-on:close="closeNoSelection"></no-selection-dialog>
    </v-layout>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { CrudBase, List } from '../lib/crud.class';
import UserService from '../services/user.service';
import Messages from '@/lib/messages';
import { GenericObject, EtcdUser } from '../../types';
import UserEditor from './user-editor.vue';

@Component({
    components: {
        'user-editor': UserEditor,
    },
})
export default class UserManager extends CrudBase implements List {
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'name',
        },
    ];

    protected etcd: UserService;

    constructor() {
        super();
        this.etcd = new UserService(this.$store.state.connection.getClient());
    }

    public created() {
        this.defaultItem = new EtcdUser();
        this.translateHeaders('userManager.columns.name');
        this.load();
    }

    public async editItem(item: GenericObject) {
        try {
            this.closeEditor();
            // @ts-ignore
            const roleData = await this.etcd.getUserRoles(item.name);
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item);
            this.currentItem = {
                ...this.currentItem,
                ...{ name: item.name, roles: roleData },
            };
        } catch (error) {
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item, false);
            this.$store.commit('message', Messages.error(error));
        }
    }

    public async confirmPurge(): Promise<UserManager> {
        try {
            // @ts-ignore
            await CrudBase.options.methods.confirmPurge.call(this);
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return Promise.resolve(this);
    }

    public async confirmDelete(): Promise<UserManager> {
        try {
            // @ts-ignore
            const result = await CrudBase.options.methods.confirmDelete.call(
                this,
                'name'
            );
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return Promise.resolve(this);
    }

    public async load(): Promise<UserManager> {
        this.loading = true;
        try {
            this.data = await this.etcd.getUsers();
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
