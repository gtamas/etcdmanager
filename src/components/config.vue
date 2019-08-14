
<style scoped>
</style>

<template>
    <v-layout column>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-expansion-panel focusable dark class="help" v-model="help">
                <v-expansion-panel-content dark class="darker">
                    <template v-slot:actions>
                        <v-tooltip slot="prepend" bottom max-width="200">
                            <v-icon slot="activator" color="primary" light medium>help</v-icon>
                            <span>{{ $t('common.help.tooltip') }}</span>
                        </v-tooltip>
                    </template>
                    <template v-slot:header>
                        <v-toolbar-title>{{ $t("settings.title") }}</v-toolbar-title>
                    </template>
                    <v-tabs v-model="helpbar" dark color="black" slider-color="primary" grow>
                        <v-tab ripple>{{ $t('common.help.tabs.info') }}</v-tab>
                        <v-tab-item>
                            <v-card dark>
                                <v-card-text>
                                    <h2 class="title">{{ $t("common.help.infoTitle") }}</h2>
                                    <p class="spacer"></p>
                                    <p v-html="getHelp()"></p>
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
                                            >{{ `${platformService.getMeta()} + ${$t('settings.help.shortcuts.leftArrowLabel')}` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                class="label"
                                            >{{ $t("settings.help.shortcuts.leftArrow") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + ${$t('settings.help.shortcuts.rightArrowLabel')}` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p
                                                class="label"
                                            >{{ $t("settings.help.shortcuts.rightArrow") }}</p>
                                        </v-flex>
                                    </v-layout>
                                    <v-layout align-center justify-start row>
                                        <v-flex xs2>
                                            <p
                                                class="rounded"
                                            >{{ `${platformService.getMeta()} + s` }}</p>
                                        </v-flex>
                                        <v-flex xs10>
                                            <p class="label">{{ $t("common.help.shortcuts.save") }}</p>
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
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-tabs v-model="active" dark color="black" slider-color="warning" grow>
                <v-tab ripple>{{ $t('settings.etcd.title') }}</v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-text-field
                                        dark
                                        v-model="endpoint"
                                        :error-messages="endpointErrors"
                                        :label="$t('settings.etcd.fields.endpoint.label')"
                                        :placeholder="$t('settings.etcd.fields.endpoint.placeholder')"
                                        required
                                        @input="$v.endpoint.$touch()"
                                        @blur="$v.endpoint.$touch()"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.etcd.fields.endpoint.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-text-field>

                                    <v-text-field
                                        dark
                                        type="number"
                                        v-model="port"
                                        :error-messages="portErrors"
                                        :placeholder="$t('settings.etcd.fields.port.placeholder')"
                                        :label="$t('settings.etcd.fields.port.label')"
                                        required
                                        @input="$v.timeout.$touch()"
                                        @blur="$v.timeout.$touch()"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.etcd.fields.port.tooltip') }}.</span>
                                        </v-tooltip>
                                    </v-text-field>

                                    <v-switch
                                        dark
                                        v-model="retry"
                                        :label="$t('settings.etcd.fields.retries.label')"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.etcd.fields.retries.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-switch>

                                    <v-text-field
                                        dark
                                        type="number"
                                        v-model="timeout"
                                        :error-messages="timeoutErrors"
                                        :placeholder="$t('settings.etcd.fields.timeout.placeholder')"
                                        :label="$t('settings.etcd.fields.timeout.label')"
                                        required
                                        @input="$v.timeout.$touch()"
                                        @blur="$v.timeout.$touch()"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.etcd.fields.timeout.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab ripple>{{ $t('settings.auth.title') }}</v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-text-field
                                        dark
                                        type="text"
                                        v-model="username"
                                        :error-messages="usernameErrors"
                                        :placeholder="$t('settings.auth.fields.username.placeholder')"
                                        :label="$t('settings.auth.fields.username.label')"
                                        @input="$v.username.$touch()"
                                        @blur="$v.username.$touch()"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.auth.fields.username.tooltip') }}.</span>
                                        </v-tooltip>
                                    </v-text-field>

                                    <v-text-field
                                        id="auth"
                                        dark
                                        type="password"
                                        v-model="password"
                                        :placeholder="$t('settings.auth.fields.password.placeholder')"
                                        :error-messages="passwordErrors"
                                        :label="$t('settings.auth.fields.password.label')"
                                        @input="$v.password.$touch()"
                                        @blur="$v.password.$touch()"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.auth.fields.password.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab ripple>{{ $t('settings.watchers.title') }}</v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-switch
                                        dark
                                        v-model="loadWatchers"
                                        :label="$t('settings.watchers.fields.loadWatchers.label')"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.watchers.fields.loadWatchers.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        dark
                                        v-model="errorListener"
                                        :label="$t('settings.watchers.fields.errorListener.label')"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.watchers.fields.errorListener.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        dark
                                        v-model="disconnectListener"
                                        :label="$t('settings.watchers.fields.disconnectListener.label')"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.watchers.fields.disconnectListener.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        dark
                                        v-model="reconnectListener"
                                        :label="$t('settings.watchers.fields.reconnectListener.label')"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.watchers.fields.reconnectListener.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-switch>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab ripple>{{ $t('settings.users.title') }}</v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-text-field
                                        dark
                                        type="text"
                                        v-model="pwpattern"
                                        :error-messages="pwpatternErrors"
                                        :placeholder="$t('settings.users.fields.pwpattern.placeholder')"
                                        :label="$t('settings.users.fields.pwpattern.label')"
                                        @input="$v.pwpattern.$touch()"
                                        @blur="$v.pwpattern.$touch()"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.users.fields.pwpattern.tooltip') }}.</span>
                                        </v-tooltip>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-tab-item>
                <v-tab ripple>{{ $t('settings.misc.title') }}</v-tab>
                <v-tab-item>
                    <v-card raised>
                        <v-container fluid>
                            <v-layout>
                                <v-flex xs12 align-end flexbox>
                                    <v-select
                                        dark
                                        v-model="language"
                                        :items="languages"
                                        :label="$t('settings.misc.fields.language.label')"
                                        item-text="name"
                                        item-value="value"
                                        required
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.misc.fields.language.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-select>
                                    <v-switch
                                        dark
                                        v-model="animateBg"
                                        :label="$t('settings.misc.fields.animateBg.label')"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.misc.fields.animateBg.tooltip') }}</span>
                                        </v-tooltip>
                                    </v-switch>
                                    <v-switch
                                        dark
                                        v-model="bg"
                                        :label="$t('settings.misc.fields.bg.label')"
                                    >
                                        <v-tooltip slot="prepend" bottom max-width="200">
                                            <v-icon slot="activator" color="primary" dark>info</v-icon>
                                            <span>{{ $t('settings.misc.fields.bg.tooltip') }}</span>
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
                        :disabled="!valid"
                        round
                        color="primary"
                        @click="persist"
                    >{{ $t('settings.actions.submit') }}</v-btn>
                    <v-btn round color="warning" @click="next">{{ $t('settings.actions.next') }}</v-btn>
                </v-layout>
            </v-card>
        </v-form>
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
import { PlatformService } from '../services/platform.service';

@Component({
    // @ts-ignore
    name: 'config',
    validations: {
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
        timeout: {
            required,
            integer,
        },
        username: {
            alphaNum,
            required: requiredIf('password'),
        },
        password: {
            alphaNum,
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
    public success = false;
    public auth = false;
    public languages = [
        { name: 'English', value: 'en' },
        { name: 'Hungarian', value: 'hu' },
    ];

    private tabsLength: number = 4;
    private active = 0;
    private help: number | null = null;

    public platformService: PlatformService;
    public helpbar: any = 0;

    constructor() {
        super();
        this.platformService = new PlatformService();
    }

    created() {
        const keyboardEvents = new Mousetrap();
        keyboardEvents.bind('meta+s', () => {
            this.persist();
        });
        keyboardEvents.bind('right', () => {
            this.next();
        });
        keyboardEvents.bind('left', () => {
            this.prev();
        });
        keyboardEvents.bind('meta+h', (e: ExtendedKeyboardEvent) => {
            e.preventDefault();
            this.help = this.help === null ? 0 : null;
        });
    }

    get endpoint() {
        return this.$store.state.etcd.hosts;
    }

    set endpoint(value: string) {
        this.$store.commit('etcdConfig', { hosts: value });
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
        !this.$v.endpoint.required &&
            errors.push(this.$t('common.validation.required'));
        // !this.$v.endpoint.url && errors.push('URL appears to be invalid');
        return errors;
    }

    get portErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.port.$dirty) {
            return errors;
        }
        // @ts-ignore
        !this.$v.port.required &&
            errors.push(this.$t('common.validation.required'));
        // @ts-ignore
        !this.$v.port.integer && errors.push(this.$t('common.validation.int'));
        return errors;
    }

    get timeoutErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.timeout.$dirty) {
            return errors;
        }
        // @ts-ignore
        !this.$v.timeout.required &&
            errors.push(this.$t('common.validation.required'));
        // @ts-ignore
        !this.$v.timeout.integer &&
            errors.push(this.$t('common.validation.int'));
        return errors;
    }

    get usernameErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.username.$dirty) {
            return errors;
        }
        // @ts-ignore
        !this.$v.username.required &&
            errors.push(this.$t('common.validation.required'));
        // @ts-ignore
        !this.$v.username.alphaNum &&
            errors.push(this.$t('common.validation.alphanumeric'));
        return errors;
    }

    get passwordErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.password.$dirty) {
            return errors;
        }
        // @ts-ignore
        !this.$v.password.required &&
            errors.push(this.$t('common.validation.required'));
        return errors;
    }

    get pwpatternErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.pwpattern.$dirty) {
            return errors;
        }
        // @ts-ignore
        !this.$v.pwpattern.invalid &&
            errors.push(this.$t('common.validation.pattern'));
        return errors;
    }

    public getHelp() {
        let key = '';
        switch (this.active) {
            default:
            case 0:
                key = 'settings.help.etcd';
                break;
            case 1:
                key = 'settings.help.auth';
                break;
            case 2:
                key = 'settings.help.watchers';
                break;

            case 3:
                key = 'settings.help.users';
                break;
            case 4:
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

    public persist() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return false;
        }
        const newConfig: { [key: string]: any } = {
            etcd: {
                hosts: this.endpoint,
                dialTimeout: this.timeout,
                retry: this.retry,
                port: this.port,
            },
            config: {
                language: this.language,
                animateBg: this.animateBg,
                background: this.bg,
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

        if (this.pwpattern) {
            newConfig.users = {
                pattern: this.pwpattern,
            };
        }

        // @ts-ignore
        this.$ls.set('config', JSON.stringify(newConfig));
        const auth = newConfig.etcdAuth ? { auth: newConfig.etcdAuth } : {};
        this.$store.commit('etcdConnect', {
            ...omit(newConfig.etcd, 'port'),
            ...auth,
            ...{ hosts: `${newConfig.etcd.hosts}:${newConfig.etcd.port}` },
        });
        this.$store.dispatch('locale', this.language).then(() => {
            this.$store.commit('message', {
                text: this.$t('settings.messages.success'),
                color: 'success',
                show: true,
            });
        });

        return true;
    }
}
</script>
