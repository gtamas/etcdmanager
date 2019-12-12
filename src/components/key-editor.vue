<template>
    <v-card>
        <v-expansion-panel focusable dark class="help" v-model="help">
            <v-expansion-panel-content dark class="darker">
                <template v-slot:actions>
                    <v-tooltip
                        data-test="key-editor.help.tooltip"
                        slot="prepend"
                        bottom
                        max-width="200"
                    >
                        <v-icon
                            data-test="key-editor.help.icon"
                            slot="activator"
                            color="primary"
                            light
                            medium
                            >help</v-icon
                        >
                        <span data-test="key-editor.help.span">{{
                            $t('common.help.tooltip')
                        }}</span>
                    </v-tooltip>
                </template>
                <template v-slot:header>
                    <v-toolbar-title
                        data-test="key-editor.title.toolbar-title"
                        >{{ title }}</v-toolbar-title
                    >
                </template>
                <v-tabs
                    v-model="helpbar"
                    dark
                    color="black"
                    slider-color="primary"
                    grow
                >
                    <v-tab
                        data-test="key-editor.common-helps-tab-info.tab"
                        ripple
                        >{{ $t('common.help.tabs.info') }}</v-tab
                    >
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                <h2
                                    data-test="key-editor.common-help-infoTitle.h2"
                                    class="title"
                                >
                                    {{ $t('common.help.infoTitle') }}
                                </h2>
                                <p
                                    data-test="key-editor.common-help-infoTitle-spacer-1.p"
                                    class="spacer"
                                ></p>
                                <p
                                    data-test="key-editor.help-text.p"
                                    v-html="
                                        platformService.getHelp(
                                            $t('keyEditor.help.text')
                                        )
                                    "
                                ></p>
                                <p
                                    data-test="key-editor.common-help-infoTitle-spacer-2.p"
                                    class="spacer"
                                ></p>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab
                        data-test="key-editor.common-helps-tab-shortcuts.tab"
                        ripple
                        >{{ $t('common.help.tabs.shortcuts') }}</v-tab
                    >
                    <v-tab-item>
                        <v-card dark>
                            <v-card-text>
                                <v-layout align-center justify-start row>
                                    <v-flex xs4>
                                        <p
                                            data-test="key-editor.common-help-shortcuts-platformService-1.p"
                                            class="rounded"
                                        >
                                            {{
                                                `${platformService.getMeta()} + s`
                                            }}
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="key-editor.common-help-shortcuts-save-1.p"
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
                                            data-test="key-editor.common-help-shortcuts-enter.p"
                                            class="rounded"
                                        >
                                            enter
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="key-editor.common-help-shortcuts-save-2.p"
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
                                            data-test="key-editor.common-help-shortcuts-esc.p"
                                            class="rounded"
                                        >
                                            esc
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="key-editor.common-help-shortcuts-close-editor.p"
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
                                            data-test="key-editor.common-help-shortcuts-platformService-2.p"
                                            class="rounded"
                                        >
                                            {{
                                                `${platformService.getMeta()} + h`
                                            }}
                                        </p>
                                    </v-flex>
                                    <v-flex xs8>
                                        <p
                                            data-test="key-editor.common-help-shortcuts-help.p"
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
                <hr data-test="key-editor.blackline.hr" class="blackLine" />
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <v-form ref="keyForm" v-model="valid" lazy-validation>
                        <v-text-field
                            data-test="key-editor.key.text-field"
                            dark
                            ref="key"
                            v-model="key"
                            :error-messages="keyErrors"
                            :label="$t('keyEditor.fields.key.label')"
                            :readonly="editMode"
                            :placeholder="
                                $t('keyEditor.fields.key.placeholder')
                            "
                            required
                            @input="$v.key.$touch()"
                            @blur="$v.key.$touch()"
                        >
                            <v-tooltip
                                data-test="key-editor.key.tooltip"
                                slot="prepend"
                                bottom
                                max-width="200"
                            >
                                <v-icon
                                    data-test="key-editor.key.icon"
                                    slot="activator"
                                    color="primary"
                                    dark
                                    >info</v-icon
                                >
                                <span data-test="key-editor.key.span">{{
                                    $t('keyEditor.fields.key.tooltip')
                                }}</span>
                            </v-tooltip>
                        </v-text-field>

                        <v-text-field
                            data-test="key-editor.value.text-field"
                            dark
                            type="text"
                            v-model="value"
                            :error-messages="valueErrors"
                            :label="$t('keyEditor.fields.value.label')"
                            :placeholder="
                                $t('keyEditor.fields.value.placeholder')
                            "
                            required
                            @input="$v.value.$touch()"
                            @blur="$v.value.$touch()"
                        >
                            <v-tooltip
                                data-test="key-editor.value.tooltip"
                                slot="prepend"
                                bottom
                                max-width="200"
                            >
                                <v-icon
                                    data-test="key-editor.value.icon"
                                    slot="activator"
                                    color="primary"
                                    dark
                                    >info</v-icon
                                >
                                <span data-test="key-editor.value.span"
                                    >{{
                                        $t('keyEditor.fields.value.tooltip')
                                    }}.</span
                                >
                            </v-tooltip>
                        </v-text-field>

                        <v-btn
                            data-test="key-editor.submit.button"
                            :disabled="!valid"
                            round
                            color="primary"
                            @click="submit"
                            >{{ opTitle }}</v-btn
                        >
                        <v-btn
                            data-test="key-editor.revisions.button"
                            color="primary"
                            round
                            @click="toggleRevs"
                            v-if="keyRevisions.revisions.length"
                            >{{
                                showRevs !== null
                                    ? $t('keyEditor.buttons.revisionsHide')
                                    : $t('keyEditor.buttons.revisions')
                            }}</v-btn
                        >
                        <v-btn
                            data-test="key-editor.close.button"
                            color="warning"
                            round
                            @click="cancel"
                            >{{ $t('common.actions.close.label') }}</v-btn
                        >
                        <v-spacer
                            data-test="key-editor.close.spacer"
                        ></v-spacer>
                    </v-form>
                    <v-expansion-panel
                        focusable
                        dark
                        class="help"
                        v-model="showRevs"
                        expand
                    >
                        <v-expansion-panel-content dark popout>
                            <h2
                                data-test="key-editor.subheading.h2"
                                class="subheading paddedTop25"
                            >
                                {{ $t('keyEditor.subtitle') }}
                            </h2>
                            <hr data-test="key-editor.subheading.hr" />
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="filter"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                            <v-data-table
                                transition="fade-transition"
                                :search="filter"
                                v-if="keyRevisions.revisions.length"
                                :headers="headers"
                                v-bind:items="keyRevisions.revisions"
                                item-key="id"
                                height="inherit"
                                :disable-initial-sort="true"
                            >
                                <template v-slot:items="props">
                                    <tr @click="revertValue(props.item)">
                                        <td
                                            data-test="key-editor.props-item-value.td"
                                        >
                                            {{ props.item.key }}
                                        </td>
                                        <td
                                            data-test="key-editor.props-item-version.td"
                                        >
                                            {{ props.item.version }}
                                        </td>
                                        <td
                                            data-test="key-editor.props-item-type.td"
                                        >
                                            {{ props.item.type }}
                                        </td>
                                        <td
                                            data-test="key-editor.props-item-modrev.td"
                                        >
                                            {{ props.item.modRevision }}
                                        </td>
                                        <td
                                            data-test="key-editor.props-item-crev.td"
                                        >
                                            {{ props.item.createRevision }}
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script lang="ts">
import Component from 'vue-class-component';

import { required } from 'vuelidate/lib/validators';
import Messages from '@/lib/messages';
import { RevisionListType } from '../../types';
import KeyService from '../services/key.service';
import { BaseEditor } from '../lib/editor.class';
import { ValidationError } from '../lib/validation-error.class';
import { Prop } from 'vue-property-decorator';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

// @ts-ignore
class KeyError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'KeyError';
    }
}

@Component({
    // @ts-ignore
    name: 'key-editor',
    validations: {
        key: {
            required,
        },
        value: {
            required,
        },
    },
})
export default class KeyEditor extends BaseEditor {
    public loading: boolean = true;
    public valid = false;
    public itemType: string = 'key';
    public itemId: string = 'key';
    public keyRevisions: RevisionListType;
    public filter: string = '';

    private etcd: KeyService;

    // @ts-ignore
    @Prop() data: {
        key: string;
        value: string;
    };
    // @ts-ignore
    @Prop() mode: string;

    public key: string = this.data.key || '';
    public value: string = this.data.value || '';
    public showRevs: number | null = null;

    public headers = [
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'key',
        },
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'version',
        },
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'createRevision',
        },
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'modRevision',
        },
        {
            text: '',
            align: 'left',
            sortable: false,
            value: 'type',
        },
    ];

    constructor() {
        super();
        this.etcd = new KeyService(this.$store.state.connection.getClient());
        this.keyRevisions = {
            revisions: [],
            watcher: null as any,
        };
    }

    async mounted() {
        this.bindDefaultEvents('keyForm');
        this.focus('key');
        if (this.data.key) {
            this.keyRevisions = await this.etcd.getRevisions(this.data.key);
        }
    }

    created() {
        this.translateHeaders(
            'keyEditor.columns.key',
            'keyEditor.columns.version',
            'keyEditor.columns.type',
            'keyEditor.columns.createRev',
            'keyEditor.columns.modRev'
        );
    }

    destroyed() {
        if (this.keyRevisions.watcher) {
            this.keyRevisions.watcher.cancel();
        }
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
        return errors;
    }

    get valueErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.value.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.value.required) {
            errors.push(this.$t('common.validation.required').toString());
        }

        return errors;
    }

    public toggleRevs() {
        this.showRevs = this.showRevs === 0 ? null : 0;
    }

    public revertValue(item: any) {
        this.value = item.key;
    }

    public async submit(): Promise<KeyEditor | ValidationError> {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return Promise.resolve(new ValidationError('Form is invalid..'));
        }

        const etcd = new KeyService(this.$store.state.connection.getClient());

        try {
            this.toggleLoading();
            const res = await etcd.insert(
                this.key,
                this.value,
                this.createMode
            );
            this.toggleLoading();
            if (res.succeeded === true || res.succeeded === undefined) {
                this.$store.commit('message', Messages.success());
                this.$emit('reload');
                this.$v.$reset();
                if (this.createMode) {
                    this.key = '';
                    this.value = '';
                }
            } else {
                this.$store.commit(
                    'message',
                    Messages.error(
                        this.$t('keyEditor.messages.duplicateKey').toString()
                    )
                );
            }
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
            this.toggleLoading();
        }

        this.focus('key');
        return Promise.resolve(this);
    }
}
</script>

<style scoped></style>
