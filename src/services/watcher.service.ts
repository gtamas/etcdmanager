import { WatcherAction, DataService } from './../../types/index';
import {
    Etcd3, Watcher, EtcdError,
} from 'etcd3';
import * as RPC from 'etcd3/lib/src/rpc';
import EtcdService from './etcd.service';
import { WatcherEntry } from '../../types';
import store from '@/store';
import Messages from '@/lib/messages';


export default class WatcherService extends EtcdService implements DataService {

    constructor(private ls: any, client?: Etcd3) {
        super(client);
    }

    private getMessage(event: string, ...args: any): string {
        const date = new Date().toISOString();
        switch (event) {
            case 'put':
                return `${date}: The key "${args[0]}" has been changed. Previous value: "${args[2]}", New value: "${args[1]}"`;
            case 'delete':
                return `${date} The key "${args[0]}" has been deleted. Last value: "${args[1]}""`;
            case 'connected':
                return `${date} The watcher ${args[0]} has been successfully reconnected!""`;
            case 'end':
                return `${date} A watcher has been closed!""`;
            case 'disconnected':
                return `${date} A watcher has been disconnected. Error: ${args[0]}""`;
            case 'error':
                return `${date} Error: ${args[0]}""`;
        }
        return '';
    }

    private generateOutput(message: string, outputType: number) {
        if (outputType === 0) {
            store.commit('console', message);
        } if (outputType === 1) {
            store.commit('message', Messages.message(message as string));
        } if (outputType === 2) {
            new Notification('Attention!', {
                lang: 'en',
                timestamp: Date.now(),
                body: message,
                requireInteraction: true,
                icon: './assets/etcd-glyph-color.png',
            });
        }
    }

    private handleEvent(event: string, outputType: number): any {
        if (event === 'put' || event === 'delete') {
            return (kv: RPC.IKeyValue, previous?: RPC.IKeyValue) => {
                const msg = this.getMessage(
                    event,
                    kv.key.toString(),
                    kv.value.toString(),
                    previous ? previous.value.toString() : '');
                this.generateOutput(msg, outputType);
            };
        } if (event === 'connected') {
            return (res: RPC.IWatchResponse) => {
                const msg = this.getMessage(
                    event,
                    res.watch_id);
                this.generateOutput(msg, outputType);
            };
        } if (event === 'error' || event === 'disconnected') {
            return (error: EtcdError) => {
                const msg = this.getMessage(
                    event,
                    error.message);
                this.generateOutput(msg, outputType);
            };
        }
    }

    public async activateWatcher(
        watcher: WatcherEntry
    ): Promise<any> {
        let watcherStream: Watcher | null = null;
        try {
            watcherStream = await this.createWatcher(watcher);
        } catch (e) {
            Messages.error(e);
            return Promise.reject(new Error(e));
        }

        watcherStream = this.registerWatcherEvents(
            watcherStream as Watcher,
            watcher.actions
        );
        store.commit('watcher', {
            key: watcher.name,
            listener: watcherStream,
            op: 'set',
        });
        watcher.activated = true;
        return Promise.resolve(this);
    }

    public listWatchers(): WatcherEntry[] {
        const watchers = JSON.parse(this.ls.get('watchers')) || [];
        return watchers;
    }

    public saveWatcher(watcher: WatcherEntry, isCreate: boolean = false): boolean {
        const watchers = this.listWatchers();
        const watcherIndex = watchers.findIndex(w => w.name === watcher.name);

        if (isCreate && watcherIndex !== -1) {
            return false;
        }

        if (watcherIndex === -1) {
            watchers.push(watcher);
        } else {
            watchers[watcherIndex] = watcher;
        }

        this.ls.set('watchers', JSON.stringify(watchers));
        return true;

    }

    public createWatcher(watcher: WatcherEntry): Promise<Watcher> {
        let watcherBuilder = this.client.watch();

        if (watcher.prefix) {
            watcherBuilder = watcherBuilder.prefix(watcher.key).withPreviousKV();
        }
        watcherBuilder = watcherBuilder.key(watcher.key).withPreviousKV();

        return watcherBuilder.create();
    }

    public registerWatcherEvents(watcher: Watcher, actions: WatcherAction[]): Watcher {

        actions.forEach((action) => {
            watcher.on(action.event.name as 'put', this.handleEvent(action.event.name, action.action.value));
        });


        if (store.state.watchers.disconnets) {
            watcher.on('disconnected', this.handleEvent('disconnected', 0));
        }

        if (store.state.watchers.reconnects) {
            watcher.on('connected', this.handleEvent('connected', 0));
        }

        if (store.state.watchers.error) {
            watcher.on('error', this.handleEvent('error', 0));
        }


        return watcher;
    }

    public purge(): Promise<any> {
        this.ls.remove('watchers');
        return Promise.resolve(true);
    }

    public remove(toRemove: string[]): Promise<any> {
        const watchers = this.listWatchers().filter((watcher) => {
            return !toRemove.includes(watcher.name);
        });
        this.ls.set('watchers', JSON.stringify(watchers));
        return Promise.resolve(true);

    }

    public loadWatcher(name: string): WatcherEntry {
        return this.listWatchers().find((watcher) => {
            return watcher.name === name;
        }) as WatcherEntry;

    }


}
