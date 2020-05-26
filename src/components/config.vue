<style scoped>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>

<template>
    <v-layout column>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-expansion-panel focusable dark class="help" v-model="help">
                <v-expansion-panel-content dark class="darker">
                    <template v-slot:actions>
                        <v-tooltip slot="prepend" bottom max-width="200">
                            <v-icon
                                data-test="config.help.icon"
                                slot="activator"
                                color="primary"
                                light
                                medium
                                >help</v-icon
                            >
                            <span data-test="config.help.span">
                                {{ $t('common.help.tooltip') }}
                            </span>
                        </v-tooltip>
                    </template>
                    <template v-slot:header>
                        <v-toolbar-title
                            data-test="config.settings-title.toolbar-title"
                            >{{ $t('settings.title') }}</v-toolbar-title
                        >
                    </template>
                    <v-tabs
                        v-model="helpbar"
                        dark
                        color="black"
                        slider-color="primary"
                        grow
                    >
                        <v-tab data-test="config.help-title.tab" ripple>
                            {{ $t('common.help.tabs.info') }}
                        </v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <h2
                                        data-test="config.help-info-title.h2"
                                        class="title"
                                    >
                                        {{ $t('common.help.infoTitle') }}
                                    </h2>
                                    <p class="spacer"></p>
                                    <p v-html="getHelp()"></p>
                                    <p class="spacer"></p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab data-test="config.help-shortcuts.tab" ripple>
                            {{ $t('common.help.tabs.shortcuts') }}
                        </v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="config.shortcut-left-arrow-label.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + ${$t(
                                                        'settings.help.shortcuts.leftArrowLabel'
                                                    )}`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="config.shortcut-left-arrow.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'settings.help.shortcuts.leftArrow'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="config.shortcut-right-arrow-label.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + ${$t(
                                                        'settings.help.shortcuts.rightArrowLabel'
                                                    )}`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="config.shortcut-right-arrow.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'settings.help.shortcuts.rightArrow'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="config.shortcut-save-rounded.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + s`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="config.shortcut-save-label.p"
                                                class="label"
                                            >
                                                {{
                                                    $t(
                                                        'common.help.shortcuts.save'
                                                    )
                                                }}
                                            </p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                data-test="config.shortcut-help-rounded.p"
                                                class="rounded"
                                            >
                                                {{
                                                    `${platformService.getMeta()} + h`
                                                }}
                                            </p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                data-test="config.shortcut-help-label.p"
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
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-tabs
                v-model="active"
                dark
                color="black"
                slider-color="warning"
                grow
            >
                <v-tab data-test="config.profile-title.tab" ripple>
                    {{ $t('settings.profile.title') }}
                </v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-select
                                        data-test="config.profile-fields-profile.select-field"
                                        :items="profiles"
                                        v-model="profile"
                                        :disabled="!configExists"
                                        :label="
                                            $t(
                                                'settings.profile.fields.profiles.label'
                                            )
                                        "
                                        dark
                                        tab="0"
                                        box
                                    >
                                        <template v-slot:append-outer>
                                            <v-btn
                                                data-test="config.loadProfile.button"
                                                round
                                                color="success"
                                                :disabled="!configExists"
                                                @click="loadProfile"
                                            >
                                                <v-icon
                                                    data-test="config.loadProfile.icon"
                                                    >input</v-icon
                                                >
                                                <span
                                                    data-test="config.loadProfile.label.span"
                                                >
                                                    {{
                                                        $t(
                                                            'settings.actions.load'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                            <v-btn
                                                data-test="config.removeProfile.button"
                                                round
                                                color="error"
                                                :disabled="!configExists"
                                                @click="removeProfile"
                                            >
                                                <v-icon
                                                    data-test="config.removeProfile.icon"
                                                    >remove_circle</v-icon
                                                >
                                                <span
                                                    data-test="config.removeProfile.label.span"
                                                >
                                                    {{
                                                        $t(
                                                            'common.actions.removeAll.label'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                        </template>
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.profile-fields-name.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.profile-fields-profiles.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.profile.fields.profiles.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab data-test="config.etcd-title.tab" ripple>
                    {{ $t('settings.etcd.title') }}
                </v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-layout align-end row>
                                        <v-text-field
                                            data-test="config.etcd-fields-endpoint.text-field"
                                            dark
                                            ref="endpoint"
                                            tab="1"
                                            v-model="endpoint"
                                            :error-messages="endpointErrors"
                                            :label="
                                                $t(
                                                    'settings.etcd.fields.endpoint.label'
                                                )
                                            "
                                            :placeholder="
                                                $t(
                                                    'settings.etcd.fields.endpoint.placeholder'
                                                )
                                            "
                                            required
                                        >
                                            <v-tooltip
                                                slot="prepend"
                                                bottom
                                                max-width="200"
                                            >
                                                <v-icon
                                                    data-test="config.etcd-fields-endpoint.icon"
                                                    slot="activator"
                                                    color="primary"
                                                    dark
                                                    >info</v-icon
                                                >
                                                <span
                                                    data-test="config.etcd-fields-endpoint.span"
                                                >
                                                    {{
                                                        $t(
                                                            'settings.etcd.fields.endpoint.tooltip'
                                                        )
                                                    }}
                                                </span>
                                            </v-tooltip>
                                        </v-text-field>
                                        <v-btn
                                            data-test="config.test-connection.button"
                                            round
                                            :loading="testing"
                                            :disabled="
                                                testing ||
                                                    this.endpoint.length ===
                                                        0 ||
                                                    !this.port.toString().length
                                            "
                                            :color="testColor"
                                            @click="testConnection"
                                        >
                                            <v-icon
                                                data-test="config.test-connection.icon"
                                                >cast_connected</v-icon
                                            >
                                            <span
                                                data-test="config.test-connection.label.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.actions.testConnection'
                                                    )
                                                }}
                                            </span>
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon
                                                        data-test="config.test-connection.icon"
                                                        light
                                                        >cached</v-icon
                                                    >
                                                </span>
                                            </template>
                                        </v-btn>
                                    </v-layout>

                                    <v-text-field
                                        data-test="config.etcd-fields-port.text-field"
                                        dark
                                        ref="port"
                                        tab="1"
                                        type="number"
                                        v-model="port"
                                        :error-messages="portErrors"
                                        :placeholder="
                                            $t(
                                                'settings.etcd.fields.port.placeholder'
                                            )
                                        "
                                        :label="
                                            $t(
                                                'settings.etcd.fields.port.label'
                                            )
                                        "
                                        required
                                        @input="$v.timeout.$touch()"
                                        @blur="$v.timeout.$touch()"
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.etcd-fields-port.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.etcd-fields-port.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.etcd.fields.port.tooltip'
                                                    )
                                                }}.
                                            </span>
                                        </v-tooltip>
                                    </v-text-field>

                                    <v-switch
                                        data-test="config.etcd-fields-retries.switch"
                                        dark
                                        v-model="retry"
                                        :label="
                                            $t(
                                                'settings.etcd.fields.retries.label'
                                            )
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.etcd-fields-retries.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.etcd-fields-retries.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.etcd.fields.retries.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>

                                    <v-text-field
                                        data-test="config.etcd-fields-timeout.text-field"
                                        dark
                                        type="number"
                                        ref="timeout"
                                        tab="1"
                                        v-model="timeout"
                                        :error-messages="timeoutErrors"
                                        :placeholder="
                                            $t(
                                                'settings.etcd.fields.timeout.placeholder'
                                            )
                                        "
                                        :label="
                                            $t(
                                                'settings.etcd.fields.timeout.label'
                                            )
                                        "
                                        required
                                        @input="$v.timeout.$touch()"
                                        @blur="$v.timeout.$touch()"
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.etcd-fields-timeout.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.etcd-fields-timeout.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.etcd.fields.timeout.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-text-field>

                                    <v-switch
                                        data-test="config.etcd-fields-ssl.switch"
                                        dark
                                        v-model="ssl_enabled"
                                        :label="
                                            $t('settings.etcd.fields.ssl.label')
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.etcd-fields-ssl.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.etcd-fields-ssl.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.etcd.fields.ssl.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-container v-if="ssl_enabled">
                                        <v-layout align-end row>
                                            <v-text-field
                                                readonly
                                                data-test="config.etcd-fields-certificate.text-field"
                                                dark
                                                ref="certificate"
                                                tab="1"
                                                v-model="certificate"
                                                :label="
                                                    $t(
                                                        'settings.etcd.fields.certificate.label'
                                                    )
                                                "
                                                required
                                                @input="$v.timeout.$touch()"
                                                @blur="$v.timeout.$touch()"
                                            >
                                                <v-tooltip
                                                    slot="prepend"
                                                    bottom
                                                    max-width="200"
                                                >
                                                    <v-icon
                                                        data-test="config.etcd-fields-certificate.icon"
                                                        slot="activator"
                                                        color="primary"
                                                        dark
                                                        >info</v-icon
                                                    >
                                                    <span
                                                        data-test="config.etcd-fields-certificate.span"
                                                    >
                                                        {{
                                                            $t(
                                                                'settings.etcd.fields.certificate.tooltip'
                                                            )
                                                        }}
                                                    </span>
                                                </v-tooltip>
                                            </v-text-field>
                                            <v-btn
                                                data-test="config.clear.cert.button"
                                                round
                                                color="primary"
                                                @click="clearCert()"
                                            >
                                                <span
                                                    data-test="config.clear.label.span"
                                                >
                                                    {{
                                                        $t(
                                                        'settings.actions.clear'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                            <v-btn
                                                data-test="config.browse.cert.button"
                                                round
                                                color="primary"
                                                @click="browse('cert')"
                                            >
                                                <v-icon
                                                    data-test="config.browse.icon"
                                                    >open_in_browser</v-icon
                                                >
                                                <span
                                                    data-test="config.browse.label.span"
                                                >
                                                    {{
                                                        $t(
                                                            'settings.actions.browse'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                        </v-layout>
                                        <v-layout align-end row>
                                            <v-text-field
                                                readonly
                                                data-test="config.etcd-fields-certKey.text-field"
                                                dark
                                                ref="certKey"
                                                tab="1"
                                                v-model="certKey"
                                                :label="
                                                    $t(
                                                        'settings.etcd.fields.certKey.label'
                                                    )
                                                "
                                                @input="$v.timeout.$touch()"
                                                @blur="$v.timeout.$touch()"
                                            >
                                                <v-tooltip
                                                    slot="prepend"
                                                    bottom
                                                    max-width="200"
                                                >
                                                    <v-icon
                                                        data-test="config.etcd-fields-certKey.icon"
                                                        slot="activator"
                                                        color="primary"
                                                        dark
                                                        >info</v-icon
                                                    >
                                                    <span
                                                        data-test="config.etcd-fields-certKey.span"
                                                    >
                                                        {{
                                                            $t(
                                                                'settings.etcd.fields.certKey.tooltip'
                                                            )
                                                        }}
                                                    </span>
                                                </v-tooltip>
                                            </v-text-field>
                                            <v-btn
                                                data-test="config.clear.certKey.button"
                                                round
                                                color="primary"
                                                @click="clearCertKey()"
                                            >
                                                <span
                                                    data-test="config.clear.label.span"
                                                >
                                                    {{
                                                        $t(
                                                        'settings.actions.clear'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                            <v-btn
                                                data-test="config.browse.certKey.button"
                                                :disabled="!certificate"
                                                round
                                                color="primary"
                                                @click="browse('privateKey')"
                                            >
                                                <v-icon
                                                    data-test="config.browse.icon"
                                                    >open_in_browser</v-icon
                                                >
                                                <span
                                                    data-test="config.browse.label.span"
                                                >
                                                    {{
                                                        $t(
                                                            'settings.actions.browse'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                        </v-layout>
                                        <v-layout align-end row>
                                            <v-text-field
                                                readonly
                                                data-test="config.etcd-fields-certChain.text-field"
                                                dark
                                                ref="certChain"
                                                tab="1"
                                                v-model="certChain"
                                                :label="
                                                    $t(
                                                        'settings.etcd.fields.certChain.label'
                                                    )
                                                "
                                                @input="$v.timeout.$touch()"
                                                @blur="$v.timeout.$touch()"
                                            >
                                                <v-tooltip
                                                    slot="prepend"
                                                    bottom
                                                    max-width="200"
                                                >
                                                    <v-icon
                                                        data-test="config.etcd-fields-certChain.icon"
                                                        slot="activator"
                                                        color="primary"
                                                        dark
                                                        >info</v-icon
                                                    >
                                                    <span
                                                        data-test="config.etcd-fields-certChain.span"
                                                    >
                                                        {{
                                                            $t(
                                                                'settings.etcd.fields.certChain.tooltip'
                                                            )
                                                        }}
                                                    </span>
                                                </v-tooltip>
                                            </v-text-field>
                                            <v-btn
                                                data-test="config.clear.certChain.button"
                                                round
                                                color="primary"
                                                @click="clearCertChain()"
                                            >
                                                <span
                                                    data-test="config.clear.label.span"
                                                >
                                                    {{
                                                        $t(
                                                        'settings.actions.clear'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                            <v-btn
                                                data-test="config.browse.certChain.button"
                                                :disabled="!certificate"
                                                round
                                                color="primary"
                                                @click="browse('certChain')"
                                            >
                                                <v-icon
                                                    data-test="config.browse.icon"
                                                    >open_in_browser</v-icon
                                                >
                                                <span
                                                    data-test="config.browse.label.span"
                                                >
                                                    {{
                                                        $t(
                                                            'settings.actions.browse'
                                                        )
                                                    }}
                                                </span>
                                            </v-btn>
                                        </v-layout>
                                    </v-container>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab data-test="config.auth-title.tab" ripple>
                    {{ $t('settings.auth.title') }}
                </v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-text-field
                                        data-test="config.fields-username.text-field"
                                        dark
                                        type="text"
                                        ref="username"
                                        tab="2"
                                        v-model="username"
                                        :error-messages="usernameErrors"
                                        :placeholder="
                                            $t(
                                                'settings.auth.fields.username.placeholder'
                                            )
                                        "
                                        :label="
                                            $t(
                                                'settings.auth.fields.username.label'
                                            )
                                        "
                                        @input="$v.username.$touch()"
                                        @blur="$v.username.$touch()"
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.fields-username.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.fields-username.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.auth.fields.username.tooltip'
                                                    )
                                                }}.
                                            </span>
                                        </v-tooltip>
                                    </v-text-field>

                                    <v-text-field
                                        data-test="config.fields-password.text-field"
                                        id="auth"
                                        dark
                                        ref="password"
                                        tab="2"
                                        v-model="password"
                                        :append-icon="
                                            showPassword
                                                ? 'visibility'
                                                : 'visibility_off'
                                        "
                                        :placeholder="
                                            $t(
                                                'settings.auth.fields.password.placeholder'
                                            )
                                        "
                                        :error-messages="passwordErrors"
                                        :label="
                                            $t(
                                                'settings.auth.fields.password.label'
                                            )
                                        "
                                        :type="
                                            inputActionService.getType(
                                                this.showPassword
                                            )
                                        "
                                        @click:append="
                                            showPassword = !showPassword
                                        "
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()"
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.fields-password.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.fields-password.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.auth.fields.password.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab data-test="config.watchers-title.tab" ripple>
                    {{ $t('settings.watchers.title') }}
                </v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-switch
                                        data-test="config.watcher-fields-load.switch"
                                        dark
                                        v-model="loadWatchers"
                                        :label="
                                            $t(
                                                'settings.watchers.fields.loadWatchers.label'
                                            )
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.watcher-fields-load.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.watcher-fields-load.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.watchers.fields.loadWatchers.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        data-test="config.watcher-fields-error-listener.switch"
                                        dark
                                        v-model="errorListener"
                                        :label="
                                            $t(
                                                'settings.watchers.fields.errorListener.label'
                                            )
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.watcher-fields-error-listener.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.watcher-fields-error-listener.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.watchers.fields.errorListener.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        data-test="config.watcher-fields-disconnect-listener.switch"
                                        dark
                                        v-model="disconnectListener"
                                        :label="
                                            $t(
                                                'settings.watchers.fields.disconnectListener.label'
                                            )
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.watcher-fields-disconnect-listener.v-icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.watcher-fields-disconnect-listener.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.watchers.fields.disconnectListener.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        data-test="config.watcher-fields-reconnect-listener.switch"
                                        dark
                                        v-model="reconnectListener"
                                        :label="
                                            $t(
                                                'settings.watchers.fields.reconnectListener.label'
                                            )
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.watcher-fields-reconnect-listener.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.watcher-fields-reconnect-listener.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.watchers.fields.reconnectListener.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab data-test="config.users-title.tab" ripple>
                    {{ $t('settings.users.title') }}
                </v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-text-field
                                        data-test="config.users-fields-pwpattern.text-field"
                                        dark
                                        type="text"
                                        ref="pwpattern"
                                        tab="3"
                                        v-model="pwpattern"
                                        :error-messages="pwpatternErrors"
                                        :placeholder="
                                            $t(
                                                'settings.users.fields.pwpattern.placeholder'
                                            )
                                        "
                                        :label="
                                            $t(
                                                'settings.users.fields.pwpattern.label'
                                            )
                                        "
                                        @input="$v.pwpattern.$touch()"
                                        @blur="$v.pwpattern.$touch()"
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.users-fields-pwpattern.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.users-fields-pwpattern.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.users.fields.pwpattern.tooltip'
                                                    )
                                                }}.
                                            </span>
                                        </v-tooltip>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab data-test="config.misc-title.tab" ripple>
                    {{ $t('settings.misc.title') }}
                </v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-select
                                        data-test="config.misc-fields-language.select"
                                        dark
                                        v-model="language"
                                        :items="languages"
                                        :label="
                                            $t(
                                                'settings.misc.fields.language.label'
                                            )
                                        "
                                        item-text="name"
                                        item-value="value"
                                        required
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.misc-fields-language.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.misc-fields-language.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.misc.fields.language.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-select>
                                    <v-switch
                                        dark
                                        v-model="animateBg"
                                        :label="
                                            $t(
                                                'settings.misc.fields.animateBg.label'
                                            )
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.misc-fields-animatebg.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.misc-fields-animatebg.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.misc.fields.animateBg.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        dark
                                        v-model="bg"
                                        :label="
                                            $t('settings.misc.fields.bg.label')
                                        "
                                    >
                                        <v-tooltip
                                            slot="prepend"
                                            bottom
                                            max-width="200"
                                        >
                                            <v-icon
                                                data-test="config.misc-fields-bg.icon"
                                                slot="activator"
                                                color="primary"
                                                dark
                                                >info</v-icon
                                            >
                                            <span
                                                data-test="config.misc-fields-bg.span"
                                            >
                                                {{
                                                    $t(
                                                        'settings.misc.fields.bg.tooltip'
                                                    )
                                                }}
                                            </span>
                                        </v-tooltip>
                                    </v-switch>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
            </v-tabs>
            <v-card raised>
                <v-layout align-start justify-center row>
                    <v-btn
                        data-test="config.submit.button"
                        :disabled="!valid"
                        round
                        color="primary"
                        @click="persist"
                    >
                        <v-icon data-test="config.submit.icon">save</v-icon>
                        <span data-test="config.submit.label.span">
                            {{ $t('settings.actions.submit') }}
                        </span>
                    </v-btn>
                    <v-btn
                        data-test="config.save-as.button"
                        :disabled="!valid"
                        round
                        color="primary"
                        @click="saveAsProfile"
                    >
                        <v-icon data-test="config.save-as.icon">save</v-icon>
                        <span data-test="config.save-as.label.span">
                            {{ $t('settings.actions.saveAs') }}
                        </span>
                    </v-btn>
                    <v-btn
                        data-test="config.next.button"
                        round
                        color="warning"
                        @click="next"
                    >
                        <v-icon data-test="config.next.icon"
                            >navigate_next</v-icon
                        >
                        <span data-test="config.next.label.span">
                            {{ $t('settings.actions.next') }}
                        </span>
                    </v-btn>
                </v-layout>
            </v-card>
        </v-form>
        <delete-dialog
            :open="deleteDialog"
            :itemName="'profile'"
            v-on:confirm="confirmDeleteProfile"
            v-on:cancel="cancelDeleteProfile"
        ></delete-dialog>
        <save-as-dialog
            :open="saveAsDialog"
            :itemName="'profile'"
            v-on:saveAs="setNewProfile"
            v-on:cancel="cancelSaveAsDialog"
        ></save-as-dialog>
        <no-selection-dialog
            :open="noSelection"
            v-on:close="closeNoSelection"
        ></no-selection-dialog>
        <message-dialog
            :open="alert"
            text="settings.messages.noDefaultRemove"
            v-on:close="closeAlert"
        ></message-dialog>
    </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
    required,
    requiredIf,
    alphaNum,
    integer,
    ipAddress,
    or,
    url,
} from 'vuelidate/lib/validators';
import { omit } from 'lodash-es';
import { InputActionService } from '../services/input-action.service';
import { LocalStorageService } from '../services/local-storage.service';
import { PlatformService } from '../services/platform.service';
import Messages from '../lib/messages';
import KeyService from '../services/key.service';
import { GenericObject } from '../../types';
import { ConfigService } from '../services/config.service';
import { Etcd3, IOptions } from 'etcd3';
import { AuthService } from '../services/auth.service';
import StatsService from '../services/stats.service';
import { writeFileSync } from 'fs';

const { ipcRenderer } = require('electron');

// @ts-ignore
@Component({
    // @ts-ignore
    name: 'config',
    validations: {
        name: {
            required,
        },
        endpoint: {
            required,
            // @ts-ignore
            or: or(ipAddress, url),
        },
        port: {
            required,
            integer,
        },
        retry: {},
        profile: {},
        timeout: {
            required,
            integer,
        },
        certKey: {
            required: requiredIf('cerChain'),
        },
        certChain: {
            required: requiredIf('certKey'),
        },
        username: {
            alphaNum,
            required: requiredIf('password'),
        },
        password: {
            required: requiredIf('username'),
        },
        pwpattern: {
            invalid: (value: string) => {
                try {
                    return new RegExp(value);
                } catch (e) {
                    return false;
                }
            },
        },
        loadWatchers: {},
    },
})
export default class Configuration extends Vue {
    public valid = false;
    public deleteDialog = false;
    public saveAsDialog = false;
    public noSelection = false;
    public alert = false;
    public success = false;
    public auth = false;
    public testing = false;
    public etcd: KeyService | null = null;
    public testColor: string = 'primary';
    public languages = [
        { name: 'English', value: 'en' },
        { name: 'Hungarian', value: 'hu' },
    ];
    public profiles: GenericObject[] = [];
    public showPassword: boolean = false;
    public inputActionService: InputActionService;
    public profile: string = '';

    private localStorageService: LocalStorageService;
    private configService: ConfigService;
    // @ts-ignore
    private authService: AuthService;
    private tabsLength: number = 5;
    private active = 0;
    private help: number | null = null;
    private certification: Buffer;
    private privateKey: Buffer;
    private certificationChain: Buffer;

    public configExists: boolean = false;

    public platformService: PlatformService;
    public helpbar: any = 0;

    constructor() {
        super();
        this.certification = new Buffer('');
        this.privateKey = new Buffer('');
        this.certificationChain = new Buffer('');
        this.platformService = new PlatformService();
        this.inputActionService = new InputActionService();
        // @ts-ignore
        this.localStorageService = new LocalStorageService(this.$ls);
        this.configService = new ConfigService(this.localStorageService);
    }

    created() {
        const keyboardEvents = new Mousetrap();
        keyboardEvents.bind(['ctrl+s', 'meta+s'], () => {
            this.persist();
        });
        keyboardEvents.bind('right', () => {
            this.next();
        });
        keyboardEvents.bind('left', () => {
            this.prev();
        });
        keyboardEvents.bind(
            ['ctrl+h', 'meta+h'],
            (e: ExtendedKeyboardEvent) => {
                e.preventDefault();
                this.help = this.help === null ? 0 : null;
            }
        );
        ipcRenderer.on('ssl_data', (_event: any, arg: any) => {
            if (arg.id === 'cert') {
                this.certification = arg.data;
                this.certificate = arg.fileName;
            }
            if (arg.id === 'privateKey') {
                this.privateKey = arg.data;
                this.certKey = arg.fileName;
            }
            if (arg.id === 'certChain') {
                this.certificationChain = arg.data;
                this.certChain = arg.fileName;
            }
        });

        ipcRenderer.on('app-config-data', (_event: any, saveTo: string) => {
            try {
                writeFileSync(
                    saveTo,
                    JSON.stringify(this.configService.getConfig()),
                    { encoding: 'utf8' }
                );
            } catch (e) {
                throw e;
            }
        });

        ipcRenderer.on('config-data', () => {
            this.profiles = this.configService.getProfileNames();
            this.profile = this.$store.getters.currentProfileName;
        });

        this.profiles = this.configService.getProfileNames();
        this.authService = new AuthService();
    }

    updated() {
        if (!this.profile) {
            this.profile = this.name;
        }
        this.configExists = this.configService.hasConfig();
    }

    get name() {
        return this.$store.state.config.name;
    }

    set name(value: string) {
        this.$store.commit('config', { name: value });
    }

    get endpoint() {
        return this.$store.state.etcd.hosts;
    }

    set endpoint(value: string) {
        this.$store.commit('etcdConfig', { hosts: value });
    }
    get ssl_enabled() {
        return this.$store.state.etcd.ssl.enabled;
    }

    set ssl_enabled(value: boolean) {
        this.$store.commit('ssl', { enabled: value });
    }

    get certificate() {
        return this.$store.state.etcd.ssl.certificate;
    }

    set certificate(value: string) {
        this.$store.commit('ssl', { certificate: value });
    }

    get certKey() {
        return this.$store.state.etcd.ssl.certKey;
    }

    set certKey(value: string) {
        this.$store.commit('ssl', { certKey: value });
    }

    get certChain() {
        return this.$store.state.etcd.ssl.certChain;
    }

    set certChain(value: string) {
        this.$store.commit('ssl', { certChain: value });
    }

    get timeout() {
        return this.$store.state.etcd.dialTimeout;
    }

    set timeout(value: number) {
        this.$store.commit('etcdConfig', { dialTimeout: value });
    }

    get port() {
        return this.$store.state.etcd.port;
    }

    set port(value: number) {
        this.$store.commit('etcdConfig', { port: value });
    }

    get retry() {
        return this.$store.state.etcd.retry;
    }

    set retry(value: boolean) {
        this.$store.commit('etcdConfig', { retry: value });
    }

    get username() {
        return this.$store.state.etcdAuth.username;
    }

    set username(value: string) {
        this.$store.commit('etcdAuthConfig', { username: value });
    }

    get password() {
        return this.$store.state.etcdAuth.password;
    }

    set password(value: string) {
        this.$store.commit('etcdAuthConfig', { password: value });
    }

    get loadWatchers() {
        return this.$store.state.watchers.autoload;
    }

    set loadWatchers(value: boolean) {
        this.$store.commit('watcherConfig', { autoload: value });
    }

    get errorListener() {
        return this.$store.state.watchers.error;
    }

    set errorListener(value: boolean) {
        this.$store.commit('watcherConfig', { error: value });
    }

    get reconnectListener() {
        return this.$store.state.watchers.reconnects;
    }

    set reconnectListener(value: boolean) {
        this.$store.commit('watcherConfig', { reconnects: value });
    }

    get disconnectListener() {
        return this.$store.state.watchers.disconnects;
    }

    set disconnectListener(value: boolean) {
        this.$store.commit('watcherConfig', { disconnects: value });
    }

    get animateBg() {
        return this.$store.state.config.animateBg;
    }

    set animateBg(value: boolean) {
        this.$store.commit('config', { animateBg: value });
    }

    get bg() {
        return this.$store.state.config.background;
    }

    set bg(value: boolean) {
        this.$store.commit('config', { background: value });
    }

    get language() {
        return this.$store.state.config.language;
    }

    set language(value: string) {
        this.$store.commit('config', { language: value });
    }

    get pwpattern() {
        return this.$store.state.users.pattern;
    }

    set pwpattern(value: string) {
        this.$store.commit('users', { pattern: value });
    }
    get certKeyErrors() {
        const errors: any = [];

        // @ts-ignore
        this.$v.certKey.required &&
            errors.push(this.$t('common.validation.required'));

        return errors;
    }

    get certChainErrors() {
        const errors: any = [];

        if (this.$v.certChain && this.$v.certChain.required) {
            errors.push(this.$t('common.validation.required'));
        }

        return errors;
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

        return errors;
    }
    get endpointErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.endpoint.$dirty) {
            return errors;
        }

        // @ts-ignore
        if (!this.$v.endpoint.or) {
            errors.push(this.$t('settings.messages.ipOrUrl'));
        }

        // @ts-ignore
        if (!this.$v.endpoint.required) {
            errors.push(this.$t('common.validation.required'));
        }

        return errors;
    }

    get portErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.port.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.port.required) {
            errors.push(this.$t('common.validation.required'));
        }
        // @ts-ignore
        if (!this.$v.port.integer) {
            errors.push(this.$t('common.validation.int'));
        }

        return errors;
    }

    get timeoutErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.timeout.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.timeout.required) {
            errors.push(this.$t('common.validation.required'));
        }
        // @ts-ignore
        if (!this.$v.timeout.integer) {
            errors.push(this.$t('common.validation.int'));
        }

        return errors;
    }

    get usernameErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.username.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.username.required) {
            errors.push(this.$t('common.validation.required'));
        }
        // @ts-ignore
        if (!this.$v.username.alphaNum) {
            errors.push(this.$t('common.validation.alphanumeric'));
        }

        return errors;
    }

    get passwordErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.password.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.password.required) {
            errors.push(this.$t('common.validation.required'));
        }

        return errors;
    }

    get pwpatternErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.pwpattern.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.pwpattern.invalid) {
            errors.push(this.$t('common.validation.pattern'));
        }

        return errors;
    }

    private findError() {
        for (const i of Object.keys(this.$v)) {
            if (this.$v[i] && this.$v[i].$error) {
                // @ts-ignore
                this.active = parseInt(this.$refs[i].$attrs.tab, 10);
                this.$store.commit(
                    'message',
                    Messages.error('settings.messages.error', true)
                );
                break;
            }
        }
    }

    public getHelp() {
        let key = '';
        switch (this.active) {
            default:
            case 0:
                key = 'settings.help.profile';
                break;
            case 1:
                key = 'settings.help.etcd';
                break;
            case 2:
                key = 'settings.help.auth';
                break;
            case 3:
                key = 'settings.help.watchers';
                break;

            case 4:
                key = 'settings.help.users';
                break;
            case 5:
                key = 'settings.help.misc';
                break;
        }

        return this.platformService.getHelp(this.$t(key));
    }

    public next() {
        this.active = this.active < this.tabsLength ? this.active + 1 : 0;
    }

    public prev() {
        this.active = this.active > 0 ? this.active - 1 : 0;
    }

    public async testConnection() {
        const config: IOptions = { hosts: `${this.endpoint}:${this.port}` };

        if (this.username && this.password) {
            config.auth = {
                username: this.username,
                password: this.password,
            };
        }

        if (this.certificate && this.ssl_enabled) {
            config.credentials = {
                rootCertificate: this.certification,
            };
            if (this.certKey && this.certChain) {
                config.credentials.privateKey = this.privateKey;
                config.credentials.certChain = this.certificationChain;
            }
        }

        const client = new Etcd3(config);
        this.etcd = new KeyService(client);
        this.testing = true;
        try {
            await this.etcd.isConnectionAvailable();
            this.testColor = 'info';
            this.testing = false;
            this.$store.commit(
                'message',
                Messages.success('settings.messages.connectSuccess')
            );
        } catch (e) {
            this.testColor = 'error';
            this.testing = false;
            this.$store.commit('message', Messages.error(e));
        }
    }

    public async loadProfile() {
        if (!this.profile || !this.profiles.length) {
            this.noSelection = true;
            return;
        }
        this.configService.loadProfile(this.profile);
        this.$store.commit(
            'updateCurrentProfile',
            this.configService.getProfile(this.profile)
        );

        await this.updateCurrentEtcdVersion();

        this.$store.commit('message', {
            text: this.$t('settings.messages.profileLoaded'),
            color: 'success',
            show: true,
        });
    }

    public saveAsProfile() {
        this.saveAsDialog = true;
    }

    public setNewProfile(newProfile: string) {
        this.name = newProfile;
        this.persist();
        this.saveAsDialog = false;
    }

    public removeProfile() {
        if (!this.profiles.length) {
            this.noSelection = true;
        } else if (this.profiles.length === 1 || this.profile === this.name) {
            this.alert = true;
        } else {
            this.deleteDialog = true;
        }
    }

    public confirmDeleteProfile() {
        this.configService.removeProfile(this.profile);
        this.persist(false);
        this.profile = 'default';
        this.profiles = this.configService.getProfileNames();
        this.deleteDialog = false;
    }

    public cancelDeleteProfile() {
        this.deleteDialog = false;
    }

    public cancelSaveAsDialog() {
        this.saveAsDialog = false;
    }

    public closeNoSelection() {
        this.noSelection = false;
    }

    public closeAlert() {
        this.alert = false;
    }

    public browse(id: string) {
        ipcRenderer.send('ssl_dialog_open', id);
    }

    public clearCert() {
        this.certificate = '';
    }

    public clearCertKey() {
        this.certKey = '';
    }

    public clearCertChain() {
        this.certChain = '';
    }

    private async updateCurrentEtcdVersion() {
        const statsService = new StatsService(
            this.$store.state.connection.getClient()
        );
        const stats = await statsService.getStats();
        const currentVersion = parseFloat(stats.version);

        this.$store.commit('etcdConfig', { version: currentVersion });

        ipcRenderer.send('update-menu', undefined, {
            lease: currentVersion > 3.2,
            manage: this.authService.isAuthenticated()
                ? this.authService.isRoot()
                : true,
        });
    }

    public async persist(notify: boolean = true) {
        this.$v.$touch();
        if (this.$v.$invalid) {
            this.findError();
            return false;
        }
        let credentials = this.configService.getConfig().credentials;
        if (credentials && credentials.rootCertificate) {
            if (new Buffer(credentials.rootCertificate).length > 0) {
                this.certification = new Buffer(credentials.rootCertificate);
                if (
                    new Buffer(credentials.privateKey).length > 0 &&
                    new Buffer(credentials.certChain).length > 0
                ) {
                    this.privateKey = new Buffer(credentials.privateKey);
                    this.certificationChain = new Buffer(credentials.certChain);
                }
            }
        }
        const newConfig: { [key: string]: any } = {
            etcd: {
                hosts: this.endpoint,
                dialTimeout: this.timeout,
                retry: this.retry,
                port: this.port,
                ssl: {
                    enabled: this.ssl_enabled,
                    certificate: '',
                    certKey: '',
                    certChain: '',
                },
            },
            config: {
                language: this.language,
                animateBg: this.animateBg,
                background: this.bg,
                name: this.name,
            },
            watchers: {
                autoload: this.loadWatchers,
                reconnects: this.reconnectListener,
                disconnects: this.disconnectListener,
                error: this.errorListener,
            },
        };

        if (this.username && this.password) {
            newConfig.etcdAuth = {
                username: this.username,
                password: this.password,
            };
        }
        if (this.certificate && this.ssl_enabled) {
            newConfig.etcd.ssl.certificate = this.certificate;
            newConfig.etcd.ssl.enabled = this.ssl_enabled;
            newConfig.credentials = {
                rootCertificate: this.certification,
            };
            if (this.certKey && this.certChain) {
                newConfig.etcd.ssl.certKey = this.certKey;
                newConfig.etcd.ssl.certChain = this.certChain;

                newConfig.credentials.privateKey = this.privateKey;
                newConfig.credentials.certChain = this.certificationChain;
            }
        }
        if (this.pwpattern) {
            newConfig.users = {
                pattern: this.pwpattern,
            };
        }

        const oldConfig = this.configService.getConfig() || {};
        oldConfig.profiles = oldConfig.profiles || [];
        const profileIndex = oldConfig.profiles.findIndex(
            (p: any) => p.config.name === newConfig.config.name
        );
        if (profileIndex === -1) {
            oldConfig.profiles.push(newConfig);
            this.$store.commit('profileInsert', newConfig);
        } else {
            oldConfig.profiles[profileIndex] = newConfig;
            this.$store.commit('profileUpdate', {
                index: profileIndex,
                data: newConfig,
            });
        }

        try {
            const isRoot = await this.authService.isRoot();

            // @ts-ignore
            this.configService.setConfig({
                profiles: [...oldConfig.profiles],
                ...newConfig,
            });
            this.profiles = this.configService.getProfileNames();
            this.profile = newConfig.config.name;
            const auth = newConfig.etcdAuth ? { auth: newConfig.etcdAuth } : {};
            this.$store.commit('etcdConnect', {
                ...omit(newConfig.etcd, 'port'),
                ...auth,
                ...{ hosts: `${newConfig.etcd.hosts}:${newConfig.etcd.port}` },
                ...{ credentials: newConfig.credentials },
            });

            await this.updateCurrentEtcdVersion();

            this.$store.commit(
                'limited',
                this.authService.isAuthenticated() ? isRoot : true
            );

            if (!this.authService.isAuthenticated()) {
                this.$store.commit('limited', true);
            }

            if (notify) {
                this.$store.dispatch('locale', this.language).then(() => {
                    this.$store.commit('message', {
                        text: this.$t('settings.messages.success'),
                        color: 'success',
                        show: true,
                    });
                });
            }
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
        }

        return true;
    }
}
</script>
