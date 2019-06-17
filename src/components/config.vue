
<style scoped>
</style>

<template>
  <v-layout column>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-toolbar dark flat>
        <v-toolbar-title>{{ $t("settings.title") }}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
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

                  <v-switch dark v-model="retry" :label="$t('settings.etcd.fields.retries.label')">
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>
                       {{ $t('settings.etcd.fields.retries.tooltip') }}
                      </span>
                    </v-tooltip>
                  </v-switch>

                  <v-text-field
                    dark
                    type="number"
                    v-model="timeout"
                    :error-messages="timeoutErrors"
                    placeholder="$t('settings.etcd.fields.timeout.placeholder')"
                    label="$t('settings.etcd.fields.timeout.label')"
                    required
                    @input="$v.timeout.$touch()"
                    @blur="$v.timeout.$touch()"
                  >
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>{{ $t('settings.etcd.fields.timeout.tooltip') }}</span>
                    </v-tooltip>
                  </v-text-field>

                  <v-select
                    dark
                    v-model="apiVersion"
                    :items="versions"
                    :label="$t('settings.etcd.fields.apiVersion.label')"
                    required
                  >
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>{{ $t('settings.etcd.fields.apiVersion.tooltip') }}</span>
                    </v-tooltip>
                  </v-select>

                  <v-select dark v-model="format" :items="formats" label="Response format" required>
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>The desired response format</span>
                    </v-tooltip>
                  </v-select>
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
                  <v-switch dark v-model="loadWatchers" :label="$t('settings.watchers.fields.loadWatchers.label')">
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>{{ $t('settings.watchers.fields.loadWatchers.tooltip') }}</span>
                    </v-tooltip>
                  </v-switch>
                  <v-switch dark v-model="errorListener" :label="$t('settings.watchers.fields.errorListener.label')">
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>{{ $t('settings.watchers.fields.errorListener.tooltip') }}</span>
                    </v-tooltip>
                  </v-switch>
                  <v-switch dark v-model="disconnectListener" :label="$t('settings.watchers.fields.disconnectListener.label')">
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>{{ $t('settings.watchers.fields.disconnectListener.tooltip') }}</span>
                    </v-tooltip>
                  </v-switch>
                  <v-switch dark v-model="reconnectListener" :label="$t('settings.watchers.fields.reconnectListener.label')">
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
                  <v-switch dark v-model="animateBg" :label="$t('settings.misc.fields.animateBg.label')">
                    <v-tooltip slot="prepend" bottom max-width="200">
                      <v-icon slot="activator" color="primary" dark>info</v-icon>
                      <span>{{ $t('settings.misc.fields.animateBg.tooltip') }}</span>
                    </v-tooltip>
                  </v-switch>
                  <v-switch dark v-model="bg" :label="$t('settings.misc.fields.bg.label')">
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
          <v-btn :disabled="!valid" round color="primary" @click="persist">{{ $t('settings.actions.submit') }}</v-btn>
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
    url,
    integer,
    ipAddress,
    or,
    and,
} from 'vuelidate/lib/validators';
import { omit } from 'lodash-es';
import { setTimeout, clearTimeout } from 'timers';

@Component({
    name: 'config',
    validations: {
        endpoint: {
            ipAddress,
            // url,
        },
        port: {
            required,
            integer,
        },
        apiVersion: {
            required,
        },
        format: {
            required,
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
        loadWatchers: {},
    },
})
export default class Configuration extends Vue {
    public formats = ['text', 'JSON'];
    public versions = ['v2', 'v3'];
    public valid = false;
    public success = false;
    public auth = false;
    public active = 0;
    public languages = [
        { name: 'English', value: 'en' },
        { name: 'Hungarian', value: 'hu' },
    ];

    get apiVersion() {
        return this.$store.state.config.apiVersion;
    }

    set apiVersion(value: string) {
        this.$store.commit('config', { apiVersion: value });
    }

    get format() {
        return this.$store.state.config.format;
    }

    set format(value: string) {
        this.$store.commit('config', { format: value });
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

    get endpointErrors() {
        const errors: any = [];
        if (!this.$v.endpoint.$dirty) {
            return errors;
        }
        // !this.$v.endpoint.required && errors.push('Item is required');
        !this.$v.endpoint.ipAddress &&
            errors.push('IP address appears to be invalid');
        // !this.$v.endpoint.url && errors.push('URL appears to be invalid');
        return errors;
    }

    get portErrors() {
        const errors: any = [];
        if (!this.$v.port.$dirty) {
            return errors;
        }
        !this.$v.port.required && errors.push('Item is required');
        !this.$v.port.integer && errors.push('Value must be an integer');
        return errors;
    }

    get timeoutErrors() {
        const errors: any = [];
        if (!this.$v.timeout.$dirty) {
            return errors;
        }
        !this.$v.timeout.required && errors.push('Item is required');
        !this.$v.timeout.integer && errors.push('Value must be an integer');
        return errors;
    }

    get usernameErrors() {
        const errors: any = [];
        if (!this.$v.username.$dirty) {
            return errors;
        }
        !this.$v.username.required && errors.push('Item is required');
        !this.$v.username.alphaNum &&
            errors.push('Alphanumeric value is expected');
        return errors;
    }

    get passwordErrors() {
        const errors: any = [];
        if (!this.$v.password.$dirty) {
            return errors;
        }
        !this.$v.password.required && errors.push('Item is required');
        return errors;
    }

    public next() {
        this.active = this.active < 2 ? this.active + 1 : 0;
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
                apiVersion: this.apiVersion,
                format: this.format,
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

        this.$ls.set('config', JSON.stringify(newConfig));
        const auth = newConfig.etcdAuth ? { auth: newConfig.etcdAuth } : {};
        this.$store.commit('etcdConnect', {
            ...omit(newConfig.etcd, 'port'),
            ...auth,
            ...{ hosts: `${newConfig.etcd.hosts}:${newConfig.etcd.port}` },
        });
        this.$store.dispatch('locale', this.language).then(() => {
            this.$store.commit('message', {
                text: 'Configuration has been saved successfully',
                color: 'success',
                show: true,
            });
        });
    }
}
</script>
