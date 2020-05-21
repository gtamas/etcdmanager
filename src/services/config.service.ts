import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import store from '@/store';
import { GenericObject } from './../../types/index';
import { omit } from 'lodash-es';
import { ipcRenderer } from 'electron';

export class ConfigService {
    constructor(private localStorageService: LocalStorageService) {}

    public hasConfig() {
        return this.getConfig() !== null;
    }

    public getConfig() {
        return this.localStorageService.get('config');
    }

    public setConfig(data: GenericObject): ConfigService {
        this.localStorageService.set('config', data as JSON);
        return this;
    }

    public getProfile(name: string): string[] {
        const cnf = this.getConfig();
        return cnf.profiles.find((c: any) => c.config.name === name);
    }

    public getProfiles() {
        const cfg = this.getConfig();

        if (cfg && cfg.profiles) {
            return cfg.profiles.map((conf: any) => conf.config.name);
        }

        return [];
    }

    public loadProfile(profile: string): ConfigService {
        const oldCfg = this.getProfile(profile);
        this.replaceConfigState(oldCfg);

        return this;
    }

    public removeProfile(profile: string): ConfigService {
        const cfg = this.getConfig();

        if (cfg && cfg.profiles) {
            cfg.profiles = cfg.profiles.filter(
                (conf: any) => conf.config.name !== profile
            );
        }

        this.setConfig(cfg);
        this.replaceConfigState(this.getProfile('default'));

        return this;
    }

    public async replaceConfigState(config: GenericObject) {
        if (!config) {
            return true;
        }

        store.commit('config', config.config);
        store.commit('users', config.users);
        store.commit('etcdConfig', config.etcd);
        store.commit('watcherConfig', config.watchers);
        store.commit('separator', config.separator || '.');
        store.dispatch('locale', config.config.language);
        if (config.etcdAuth) {
            store.commit('etcdAuthConfig', config.etcdAuth);
        }
        if (config.credentials.rootCertificate) {
            config.credentials.rootCertificate = new Buffer(
                config.credentials.rootCertificate
            );
            if (config.credentials.privateKey && config.credentials.certChain) {
                config.credentials.privateKey = new Buffer(
                    config.credentials.privateKey
                );
                config.credentials.certChain = new Buffer(
                    config.credentials.certChain
                );
            }
        }
        if (config.etcd.hosts) {
            const auth = config.etcdAuth ? { auth: config.etcdAuth } : {};
            store.commit('etcdConnect', {
                ...omit(config.etcd, 'port'),
                ...auth,
                ...{ hosts: `${config.etcd.hosts}:${config.etcd.port}` },
                ...{ credentials: config.credentials },
            });
        }
        const authService = new AuthService();
        let isRoot = true;
        if (authService.isAuthenticated()) {
            isRoot = await authService.isRoot();
        }
        store.commit('limited', isRoot);
        store.commit('updateCurrentProfile', config);
        ipcRenderer.send('update-menu', undefined, { manage: isRoot });

        return true;
    }
}
