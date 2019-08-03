import Vue from 'vue';
import Router from 'vue-router';
import KeyManager from './components/key-manager.vue';
import UserManager from './components/user-manager.vue';
import RoleManager from './components/role-manager.vue';
import HealthCheck from './components/health.vue';
import Configuration from './components/config.vue';
import WatcherManager from './components/watcher_manager.vue';
import About from './components/about.vue';
import { isConfiguredGuard } from './guards/guards';


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Configuration,
        },
        {
            path: '/keys',
            name: 'keys',
            component: KeyManager,
            beforeEnter: isConfiguredGuard,
        },
        {
            path: '/users',
            name: 'users',
            component: UserManager,
            beforeEnter: isConfiguredGuard,
        },
        {
            path: '/configure',
            name: 'config',
            component: Configuration,
        },
        {
            path: '/cluster',
            name: 'cluster',
            component: HealthCheck,
            beforeEnter: isConfiguredGuard,
        },
        {
            path: '/watchers',
            name: 'watchers',
            component: WatcherManager,
            beforeEnter: isConfiguredGuard,
        },
        {
            path: '/roles',
            name: 'roles',
            component: RoleManager,
            beforeEnter: isConfiguredGuard,
        },
        {
            path: '/about',
            name: 'about',
            component: About,
        },
    ],
});
