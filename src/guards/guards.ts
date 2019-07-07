import store from '@/store';
import { Route } from 'vue-router';

// @ts-ignore
export function isConfiguredGuard(to: Route, from: Route, next: any) {
    if (!store.getters.isConfigured) {
        store.commit('message', {
            text: 'Your ETCD config is incomplete, please update it!',
            show: true,
        });
        return next({ path: '/configure' });
    }
    next();
}
