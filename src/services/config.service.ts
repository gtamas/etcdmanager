import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import store from '@/store';
import { GenericObject } from './../../types/index';
import { omit } from 'lodash-es';
import { ipcRenderer } from 'electron';

export class ConfigService {

    constructor(private localStorageService: LocalStorageService) {
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
            return cfg.profiles.map(
                (cfg: any) => cfg.config.name
            );
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
                (cfg: any) => cfg.config.name !== profile
            );
        }

        this.setConfig(cfg);
        this.replaceConfigState(this.getProfile('default'));

        return this;
    }

    public async replaceConfigState(config: GenericObject) {
        store.commit('config', config.config);
        store.commit('users', config.users);
        store.commit('etcdConfig', config.etcd);
        store.commit('watcherConfig', config.watchers);
        store.commit('separator', config.separator || '.');
        store.dispatch('locale', config.config.language);
        if (config.etcdAuth) {
            store.commit('etcdAuthConfig', config.etcdAuth);
        }
        if (config.etcd.hosts) {
            const auth = config.etcdAuth ? { auth: config.etcdAuth } : {};
            store.commit('etcdConnect', {
                ...omit(config.etcd, 'port'),
                ...auth,
                ...{ hosts: `${config.etcd.hosts}:${config.etcd.port}` },
            });
        }
        const isRoot = await new AuthService().isRoot();
        store.commit('limited', isRoot);
        ipcRenderer.send('update-menu', undefined, { manage: isRoot });

    }

}
