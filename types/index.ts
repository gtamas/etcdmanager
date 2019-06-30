import { Watcher } from 'etcd3';
import { CrudBase } from '@/lib/crud.class';

declare const __static: any;

export interface GenericObject {
    [key: string]: any;
}

export type EtcdEventType = 'put' | 'delete' | 'all';
export type EtcdPermissionType = 'Read' | 'Write' | 'Readwrite';

export type PermissionObject = {
    key: string,
    prefix: boolean,
    permission: EtcdPermissionType,
};


export interface DataService {
    purge(): Promise<CrudBase>;
    remove(items: string[]): Promise<CrudBase>;
}

export interface EtcdItem extends GenericObject {
    key: string;
    value: any;
}

export interface WatcherAction {
    id?: string;
    action: {
        name: string,
        type: number,
        value: number,
    };
    event: {
        name: string,
        type: number,
        value: number,
    };
    arg?: string;
}

export class WatcherEntry {
    constructor(
        public name: string = '',
        public key: string = '',
        public prefix: boolean = false,
        public activated: boolean = false,
        public actions: WatcherAction[] = []) {
    }
}

export interface NamedWatcher {
    name: string;
    watcher: Watcher;
}
