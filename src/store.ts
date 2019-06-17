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
            apiVersion: 'v3',
            format: 'JSON',
            language: 'en',
            animateBg: false,
            background: false,
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
        console: '',
        version: ''
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
        config(state, payload) {
            state.config = { ...state.config, ...payload };
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
