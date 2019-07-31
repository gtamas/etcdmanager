import store from '@/store';
import { Route } from 'vue-router';
import Vue from 'vue';

// @ts-ignore
export function isConfiguredGuard(to: Route, from: Route, next: any) {
    // @ts-ignore
    const cfg = JSON.parse(Vue.ls.get('config'));
    if (!cfg || !cfg.etcd || !cfg.etcd.hosts || !cfg.etcd.port) {
        store.commit('message', {
            text: 'Your ETCD config is incomplete, please update it!',
            show: true,
        });
        return next({ path: '/configure' });
    }
    next();
}
