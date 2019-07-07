import { IOptions } from 'etcd3';
import Vue from 'vue';
import Vuex from 'vuex';
import EtcdService from './services/etcd.service';
import { readFileSync } from 'fs';
import { i18n, loadedLang } from './main';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {
            language: 'en',
            animateBg: false,
            background: false,
        },
        users: {
            pattern: null,
        },
        etcd: {
            hosts: '',
            dialTimeout: 30000,
            retry: false,
            port: 2379,
        },
        etcdAuth: {
            username: '',
            password: '',
        },
        watchers: {
            autoload: false,
            autoshutdown: false,
            error: true,
            disconnets: true,
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
    },
    mutations: {
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
        etcdAuthConfig(state, payload) {
            state.etcdAuth = { ...state.etcdAuth, ...payload };
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
        version(state) {
            state.version = JSON.parse(readFileSync('./package.json').toString()).version;
        },
        watcher(state, payload) {
            if (payload.op === 'set') {
                state.listeners = state.listeners.set(payload.key, payload.listener);
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
            function setLanguage(lang: string) {
                i18n.locale = lang;
                document.querySelector('html')!.setAttribute('lang', lang);
                return lang;
            }

            const lang = payload;
            if (i18n.locale !== lang) {
                if (!loadedLang.includes(lang)) {
                    const translations = await import(`@/i18n/${lang}`);
                    i18n.setLocaleMessage(lang, translations.default[lang]);
                    loadedLang.push(lang);
                    context.commit('config', { language: lang });
                    return setLanguage(lang);
                }
                return Promise.resolve(setLanguage(lang));
            }
            return Promise.resolve(lang);
        },
    },
});
