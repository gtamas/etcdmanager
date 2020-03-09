<template>
    <v-card>
        <v-expansion-panel focusable dark class="help" v-model="help">
            <v-expansion-panel-content dark class="darker">
                <template v-slot:actions>
                    <v-tooltip
                        data-test="lease-editor.help.tooltip"
                        slot="prepend"
                        bottom
                        max-width="200"
                    >
                        <v-icon
                            data-test="lease-editor.help-tooltip.icon"
                            slot="activator"
                            color="primary"
                            light
                            medium
                            >help</v-icon
                        >
                        <span data-test="lease-editor.help-tooltip.span">{{
                            $t('common.help.tooltip')
                        }}</span>
                    </v-tooltip>
                </template>
                <template v-slot:header>
                    <v-toolbar-title
                        data-test="lease-editor.title.toolbar-title"
                        >{{  $t('leaseEditor.title')  }}: {{id}}</v-toolbar-title
                    >
                </template>
                <v-tabs
                    v-model="helpbar"
                    dark
                    color="black"
                    slider-color="primary"
                    grow
                >
                    <v-tab data-test="lease-editor.info.tab" ripple>{{
                        $t('common.help.tabs.info')
                    }}</v-tab>
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                <h2
                                    data-test="lease-editor.tab-infoTitle.h2"
                                    class="title"
                                >
                                    {{ $t('common.help.infoTitle') }}
                                </h2>
                                <p
                                    data-test="lease-editor.tab-spacer-1.p"
                                    class="spacer"
                                ></p>
                                <p
                                    data-test="lease-editor.tab-text.p"
                                    v-html="
                                        platformService.getHelp(
                                            $t('leaseEditor.help.text')
                                        )
                                    "
                                ></p>
                                <p
                                    data-test="lease-editor.tab-spacer-2.p"
                                    class="spacer"
                                ></p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab data-test="lease-editor.shortcuts.tab" ripple>{{
                        $t('common.help.tabs.shortcuts')
                    }}</v-tab>
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p
                                            data-test="lease-editor.shortcuts-save-rounded.p"
                                            class="rounded"
                                        >
                                            {{
                                                `${platformService.getMeta()} + s`
                                            }}
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="lease-editor.shortcuts-save-label.p"
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
                                            data-test="lease-editor.shortcuts-save-rounded-enter.p"
                                            class="rounded"
                                        >
                                            enter
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="lease-editor.shortcuts-save-label-enter.p"
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
                                            data-test="lease-editor.shortcuts-closeEditor-rounded.p"
                                            class="rounded"
                                        >
                                            esc
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="lease-editor.shortcuts-closeEditor-label.p"
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
                                            data-test="lease-editor.shortcuts-help-rounded.p"
                                            class="rounded"
                                        >
                                            {{
                                                `${platformService.getMeta()} + h`
                                            }}
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="lease-editor.shortcuts-help-label.p"
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
                <hr data-test="lease-editor.blackline.hr" class="blackLine" />
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <v-form ref="leaseForm" v-model="valid" lazy-validation>

                        <v-text-field
                            data-test="lease-editor.grant.text-field"
                            dark
                            v-model="lease.grantedTTL"
                            :label="$t('leaseEditor.fields.grant.label')"
                            type="number"
                            readonly
                        >
                            <v-tooltip
                                data-test="lease-editor.grant.tooltip"
                                slot="prepend"
                                bottom
                                max-width="200"
                            >
                                <v-icon
                                    data-test="lease-editor.grant.icon"
                                    slot="activator"
                                    color="primary"
                                    dark
                                    >info</v-icon
                                >
                                <span data-test="lease-editor.grant.span">{{
                                    $t('leaseEditor.fields.grant.tooltip')
                                }}</span>
                            </v-tooltip>
                        </v-text-field>

                        <v-text-field
                            data-test="lease-editor.remainingDate.text-field"
                            dark
                            v-model="remainingDate"
                            :label="
                                $t('leaseEditor.fields.remainingDate.label')
                            "
                            required
                            readonly
                        >
                            <v-tooltip
                                data-test="lease-editor.remainingDate.tooltip"
                                slot="prepend"
                                bottom
                                max-width="200"
                            >
                                <v-icon
                                    data-test="lease-editor.remainingDate.icon"
                                    slot="activator"
                                    color="primary"
                                    dark
                                    >info</v-icon
                                >
                                <span
                                    data-test="lease-editor.remainingDate.span"
                                    >{{
                                        $t(
                                            'leaseEditor.fields.remainingDate.tooltip'
                                        )
                                    }}</span
                                >
                            </v-tooltip>
                        </v-text-field>

                        <h2
                            data-test="lease-editor.subheading.h2"
                            class="subheading"
                        >
                            {{ $t('leaseEditor.subtitle') }}
                        </h2>
                        <hr data-test="lease-editor.subheading.hr" />
                        <v-card
                            data-test="lease-editor.message-noRights.card"
                            height="200"
                            class="scrollable"
                        >
                            <div
                                data-test="lease-editor.message-noRights.checkbox"
                                v-for="key in keys"
                                v-bind:key="key.name"
                            >{{ key.name }}</div>
                        </v-card>
                        <v-btn
                            data-test="lease-editor.close.button"
                            color="warning"
                            round
                            @click="cancel"
                            >{{ $t('common.actions.close.label') }}</v-btn
                        >
                        <v-spacer
                            data-test="lease-editor.leaseForm.spacer"
                        ></v-spacer>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { ILeaseTimeToLiveResponse } from 'etcd3';
import { required, numeric } from 'vuelidate/lib/validators';
import Messages from '@/lib/messages';
import { BaseEditor } from '../lib/editor.class';
import { Prop } from 'vue-property-decorator';
import LeaseService from '../services/lease.service';
import { GenericObject } from '../../types';
import moment from 'moment';

// @ts-ignore
class LeaseditorError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'LeaseEditorError';
    }
}

@Component({
    // @ts-ignore
    name: 'lease-editor',
    validations: {
        ttl: {
            required,
            numeric,
        },
    },
})
export default class LeaseEditor extends BaseEditor {
    public itemType: string = 'lease';
    public itemId: string = 'ID';

    // @ts-ignore
    @Prop() data: {
        ID: string;
    };

    public id: string = this.data.ID || '';

    public keys: GenericObject[] = [];
    private remaining: number = 0;
    // @ts-ignore
    private remainingDate: string = '';
    private leaseService: LeaseService;
    private interval: any = null;
    public lease: ILeaseTimeToLiveResponse | GenericObject = {};

    constructor() {
        super();
        this.leaseService = new LeaseService(
            this.$store.state.connection.getClient()
        );
    }

    public async mounted() {
        this.bindDefaultEvents('leaseForm');
        try {
            this.lease = await this.leaseService.loadLease(this.id);
        } catch (error) {
            this.$store.commit('message', Messages.error(error));
        }
        this.keys = this.lease.keys.map((key: Buffer) => {
            return { name: key.toString() };
        });
        this.remaining = this.lease.TTL;
        const now = moment();
        this.interval = setInterval(() => {
            this.remaining = this.remaining -= 1;
            const minutes = moment(now).diff(
                moment(now).subtract(this.remaining, 'seconds'),
                'minutes'
            );
            const hours = moment(now).diff(
                moment(now).subtract(this.remaining, 'seconds'),
                'hours'
            );
            this.remainingDate = `${hours} hours / ${minutes} minutes / ${this.remaining} seconds`
        }, 1000);
    }

    public destroyed() {
        this.interval = clearInterval(this.interval);
    }
}
</script>

<style scoped>
.scrollable {
    overflow-y: auto;
}
</style>
