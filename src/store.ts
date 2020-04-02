import { readFileSync } from 'fs';
import { IOptions } from 'etcd3';
import Vue from 'vue';
import Vuex from 'vuex';
import EtcdService from './services/etcd.service';
import { i18n, loadedLang } from './main';
import { join } from 'path';
import VueI18n from 'vue-i18n';
import { CurrentProfileType } from '../types';
const {
    ipcRenderer,
    remote: { app },
} = require('electron');

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLimited: false,
        profile: {} as CurrentProfileType,
        profiles: [],
        separator: '.',
        config: {
            language: 'en',
            animateBg: false,
            background: true,
            name: 'default',
        },
        users: {
            pattern: null,
        },
        etcd: {
            hosts: '',
            dialTimeout: 30000,
            retry: false,
            port: 2379,
            ssl: {
                enabled: false,
                certificate: '',
                certKey: '',
                certChain: '',
            },
        },
        etcdAuth: {
            username: '',
            password: '',
        },
        watchers: {
            autoload: false,
            error: true,
            disconnects: true,
            reconnects: true,
        },
        connection: new EtcdService(),
        message: {
            text: '',
            color: 'error',
            timeout: 2000,
            show: false,
        },
        listeners: new Map(),
        loading: false,
        console: '',
        version: '',
        package: {},
    },
    getters: {
        isConfigured(state) {
            return (
                state.etcd.hosts && state.etcd.dialTimeout && state.etcd.port
            );
        },
        language(state) {
            return state.config.language;
        },
        currentProfile(state) {
            const at = state.etcdAuth.username ? '@' : '';
            if (state.profile.name) {
                return `${state.profile.name} - ${state.etcdAuth.username || ''}${at}${state.profile.host}:${state.profile.port}`;
            }

            return '';
        },
    },
    mutations: {
        limited(state, payload) {
            state.isLimited = payload;
        },
        separator(state, payload) {
            state.separator = payload;
        },
        loading(state) {
            state.loading = !state.loading;
        },
        config(state, payload) {
            state.config = { ...state.config, ...payload };
        },
        users(state, payload) {
            state.users = { ...state.users, ...payload };
        },
        etcdConfig(state, payload) {
            state.etcd = { ...state.etcd, ...payload };
        },
        ssl(state, payload) {
            state.etcd.ssl = { ...state.etcd.ssl, ...payload };
        },
        etcdAuthConfig(state, payload) {
            state.etcdAuth = { ...state.etcdAuth, ...payload };
        },
        updateCurrentProfile(state, payload) {
            state.profile = {
                name: payload.config.name,
                host: payload.etcd.hosts,
                port: payload.etcd.port,
            };
        },
        profileUpdate(state, payload) {
            (state.profiles[payload.index] as any) = payload.data;
            // @ts-ignore
            this.commit('updateCurrentProfile', payload.data);
        },
        profileInsert(state, payload) {
            state.profiles.push(payload as never);
            // @ts-ignore
            this.commit('updateCurrentProfile', payload);
        },
        watcherConfig(state, payload) {
            state.watchers = { ...state.watchers, ...payload };
        },
        etcdConnect(state, payload: IOptions) {
            state.connection.init(payload);
        },
        message(state, payload) {
            state.message = { ...state.message, ...payload };
        },
        console(state, payload) {
            state.console += `${payload}\n`;
        },
        version(state, payload) {
            state.version = payload;
        },
        package(state) {
            state.package = JSON.parse(
                readFileSync(
                    join(
                        process.platform !== 'win32' ? '/' : '',
                        app.getAppPath(),
                        'package.json'
                    )
                ).toString()
            );
        },
        watcher(state, payload) {
            if (payload.op === 'set') {
                state.listeners = state.listeners.set(
                    payload.key,
                    payload.listener
                );
            } else if (payload.op === 'del') {
                state.listeners.delete(payload.key);
                state.listeners = new Map(state.listeners);
            } else {
                state.listeners.clear();
                state.listeners = new Map(state.listeners);
            }
        },
    },
    actions: {
        async locale(context, payload) {
            function setLanguage(
                language: string,
                translations: VueI18n.LocaleMessageObject
            ) {
                i18n.locale = language;
                document.querySelector('html')!.setAttribute('lang', language);
                ipcRenderer.send('update-menu', translations);
                return language;
            }

            const lang = payload;
            if (i18n.locale !== lang) {
                if (!loadedLang.includes(lang)) {
                    const translations = await import(`@/i18n/${lang}`);
                    i18n.setLocaleMessage(lang, translations.default[lang]);
                    loadedLang.push(lang);
                    context.commit('config', { language: lang });
                }
                return Promise.resolve(
                    setLanguage(lang, i18n.getLocaleMessage(lang))
                );
            }
            return Promise.resolve(lang);
        },
    },
});
