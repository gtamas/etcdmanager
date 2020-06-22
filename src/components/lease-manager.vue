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
                            data-test="lease-manager.help.tooltip"
                            slot="prepend"
                            bottom
                            max-width="200"
                        >
                            <v-icon
                                data-test="lease-manager.help.icon"
                                @click="toggleHelp"
                                slot="activator"
                                color="primary"
                                light
                                medium
                                >help</v-icon
                            >
                            <span data-test="lease-manager.help.span">{{
                                $t('common.help.tooltip')
                            }}</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:header>
                        <v-toolbar raised dark>
                            <v-toolbar-title
                                data-test="lease-manager.LeaseManager-title.toolbar-title"
                                >{{ $t('leaseManager.title') }}</v-toolbar-title
                            >
                            <v-divider
                                data-test="lease-manager.divider.divider"
                                class="mx-2"
                                inset
                                vertical
                            ></v-divider>
                            <v-spacer
                                data-test="lease-manager.spacer.spacer"
                            ></v-spacer>
                            <v-text-field
                                data-test="lease-manager.filter.text-field"
                                dark
                                ref="search"
                                color="white"
                                v-model="filter"
                                prepend-icon="search"
                                :placeholder="$t('common.lists.filter')"
                            ></v-text-field>
                            <v-tooltip
                                data-test="lease-manager.purgeAll.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="lease-manager.purgeAll.button"
                                        color="error"
                                        round
                                        dark
                                        @click="purge"
                                        v-on="on"
                                    >
                                        <v-icon
                                            data-test="lease-manager.purgeAll.icon"
                                            >remove_circle</v-icon
                                        >
                                        <span
                                            data-test="lease-manager.purgeAll-label.span"
                                            >{{
                                                $t(
                                                    'common.actions.purgeAll.label'
                                                )
                                            }}</span
                                        >
                                    </v-btn>
                                </template>
                                <span
                                    data-test="lease-manager.purgeAll-tooltip.span"
                                    >{{
                                        $t('common.actions.purgeAll.tooltip')
                                    }}</span
                                >
                            </v-tooltip>
                            <v-tooltip
                                data-test="lease-manager.removeAll.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        data-test="lease-manager.removeAll.button"
                                        color="primary"
                                        @click.stop="deleteMany"
                                        round
                                        dark
                                        v-on="on"
                                    >
                                        <v-icon
                                            data-test="lease-manager.removeAll.icon"
                                            >delete</v-icon
                                        >
                                        <span
                                            data-test="lease-manager.removeAll-label.span"
                                            >{{
                                                $t(
                                                    'common.actions.removeAll.label'
                                                )
                                            }}</span
                                        >
                                    </v-btn>
                                </template>
                                <span
                                    data-test="lease-manager.removeAll-tooltip.span"
                                    >{{
                                        $t('common.actions.removeAll.tooltip')
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
                        <v-tab data-test="lease-manager.info.tab" ripple>{{
                            $t('common.help.tabs.info')
                        }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <h2
                                        data-test="lease-manager.infoTitle.h2"
                                        class="title"
                                    >
                                        {{ $t('common.help.infoTitle') }}
                                    </h2>
                                    <p
                                        data-test="lease-manager.spacer-1.p"
                                        class="spacer"
                                    ></p>
                                    <p
                                        data-test="lease-manager.text.p"
                                        v-html="
                                            platformService.getHelp(
                                                $t('leaseManager.help.text')
                                            )
                                        "
                                    ></p>
                                    <p
                                        data-test="lease-manager.spacer-2.p"
                                        class="spacer"
                                    ></p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab data-test="lease-manager.shortcuts.tab" ripple>{{
                            $t('common.help.tabs.shortcuts')
                        }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="lease-manager.shortcuts-openEditor-rounded.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + a`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="lease-manager.shortcuts-openEditor-label.p"
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
                                                data-test="lease-manager.shortcuts-closeEditor-rounded.p"
                                                class="rounded"
                                            >
                                                {{ `esc` }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="lease-manager.shortcuts-closeEditor-label.p"
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
                                                data-test="lease-manager.shortcuts-purge-rounded.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + p`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="lease-manager.shortcuts-purge-label.p"
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
                                                data-test="lease-manager.shortcuts-remove-rounded.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + r`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="lease-manager.shortcuts-remove-label.p"
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
                                                data-test="lease-manager.shortcuts-help-rounded.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + h`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="lease-manager.shortcuts-help-label.p"
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
                        data-test="lease-manager.blackline.hr"
                        class="blackLine"
                    />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-card raised dark>
                <v-data-table
                    :search="filter"
                    :headers="headers"
                    v-bind:items="data"
                    item-key="ID"
                    select-all
                    v-model="selected"
                    :loading="loading"
                >
                    <v-progress-linear
                        data-test="lease-manager.progress.progress-linear"
                        v-slot:progress
                        color="blue"
                        indeterminate
                    ></v-progress-linear>
                    <template v-slot:items="props">
                        <td>
                            <v-checkbox
                                data-test="lease-manager.actions.checkbox"
                                v-model="props.selected"
                                primary
                                hide-details
                            ></v-checkbox>
                        </td>
                        <td>{{ props.item.ID }}</td>
                        <td
                            data-test="lease-manager.actions.td"
                            class="justify-center layout px-0"
                        >
                            <v-tooltip
                                data-test="lease-manager.actions-view.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="lease-manager.actions-view.icon"
                                        small
                                        @click="editItem(props.item)"
                                        v-on="on"
                                        >details</v-icon
                                    >
                                </template>
                                <span
                                    data-test="lease-manager.actions-view.span"
                                    >{{ $t('leaseManager.actions.view') }}</span
                                >
                            </v-tooltip>
                            <v-tooltip
                                data-test="lease-manager.actions-remove.tooltip"
                                bottom
                                max-width="200"
                            >
                                <template v-slot:activator="{ on }">
                                    <v-icon
                                        data-test="lease-manager.actions-remove.icon"
                                        small
                                        slot="activator"
                                        @click="deleteSingle(props.item)"
                                        v-on="on"
                                        >delete</v-icon
                                    >
                                </template>
                                <span
                                    data-test="lease-manager.actions-remove.span"
                                    >{{
                                        $t('leaseManager.actions.remove')
                                    }}</span
                                >
                            </v-tooltip>
                        </td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>

        <v-flex pa-1 shrink>
            <v-expand-x-transition>
                <lease-editor
                    class="editor"
                    :data="currentItem"
                    :mode="operation"
                    v-on:cancel="cancelEdit"
                    v-on:reload="load"
                    v-if="editor"
                ></lease-editor>
            </v-expand-x-transition>
        </v-flex>

        <delete-dialog
            :open="deleteDialog"
            :itemName="'lease'"
            v-on:confirm="confirmDelete"
            v-on:cancel="cancelDelete"
        ></delete-dialog>

        <purge-dialog
            :open="purgeDialog"
            :itemName="'leases'"
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
import Component from 'vue-class-component';
import Messages from '@/lib/messages';
import { GenericObject, EtcdRole } from '../../types';
import LeaseService from '../services/lease.service';
import { CrudBase, List } from '../lib/crud.class';
import LeaseEditor from './lease-editor.vue';

@Component({
    name: 'lease-manager',
    components: {
        'lease-editor': LeaseEditor,
    },
})
export default class LeaseManager extends CrudBase implements List {
    public none = 0;
    public headers = [
        {
            text: '',
            align: 'left',
            sortable: true,
            value: 'ID',
        },
    ];

    protected etcd: LeaseService;

    constructor() {
        super();
        this.etcd = new LeaseService(this.$store.state.connection.getClient());
    }

    public async created() {
        this.defaultItem = new EtcdRole();
        this.translateHeaders('leaseManager.columns.id');

        const loader = () => {
            this.load();
            this.editor = false;
        };

        this.addReloader(loader);
        this.load();
    }

    public destroyed() {
       super.destroyed();
    }

    public async editItem(item: GenericObject) {
        try {
            this.closeEditor();
            const leaseData = await this.etcd.loadLease(item.ID);
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item);
            this.currentItem = {
                ...this.currentItem,
                ...leaseData,
            };
        } catch (error) {
            // @ts-ignore
            CrudBase.options.methods.editItem.call(this, item, false);
            this.$store.commit('message', Messages.error(error));
        }
    }

    public async confirmPurge(): Promise<LeaseManager> {
        try {
            // @ts-ignore
            await CrudBase.options.methods.confirmPurge.call(this);
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return Promise.resolve(this);
    }

    public async confirmDelete(): Promise<LeaseManager> {
        try {
            // @ts-ignore
            await CrudBase.options.methods.confirmDelete.call(this, 'ID');
            await this.load();
            this.$store.commit('message', Messages.success());
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        this.cancelDelete();
        return Promise.resolve(this);
    }

    public async load(): Promise<LeaseManager> {
        this.loading = true;
        try {
            this.data = await this.etcd.getLeases();
            this.loading = false;
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }

        return Promise.resolve(this);
    }
}
</script>

<style scoped></style>
