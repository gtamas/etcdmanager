import {
    DataService,
    RevisionListType,
    GenericObject,
} from './../../types/index';
import { MultiRangeBuilder, Etcd3 } from 'etcd3';
import EtcdService from './etcd.service';

export default class KeyService extends EtcdService implements DataService {
    constructor(client?: Etcd3) {
        super(client);
    }

    public async getRevisions(key: string): Promise<RevisionListType> {
        const result: RevisionListType = {
            revisions: [],
            watcher: null as any,
        };

        const current = await this.client.watch().key(key);

        current.request.start_revision = 1;

        result.watcher = await current.create();
        result.watcher.on('data', (res) => {
            res.events.forEach((event) => {
                result.revisions.unshift({
                    key: event.kv.value.toString(),
                    version: event.kv.version,
                    createRevision: event.kv.create_revision,
                    modRevision: event.kv.mod_revision,
                    type: event.type,
                });
            });
        });

        return result;
    }

    public loadKey(key: string): Promise<any> {
        return this.client.get(key).string();
    }

    public loadAllKeys(prefix?: string): Promise<any> {
        let query: MultiRangeBuilder = this.client.getAll();

        if (prefix) {
            query = query.prefix(prefix);
        }

        return query.strings();
    }

    public insert(
        key: string,
        value: string,
        isCreate: boolean = true
    ): Promise<any> {
        if (isCreate) {
            return this.client
                .if(key, 'Create', '==', 0)
                .then(this.client.put(key).value(value))
                .else(this.client.get(key))
                .commit();
        }
        return this.client.put(key).value(value);
    }

    public purge(): Promise<any> {
        return this.client.delete().all();
    }

    public touch(keys: GenericObject[] | string[]): Promise<any> {
        const promises: Promise<any>[] = [];
        let keySet = new Set<string>();
        if (typeof keys[0] !== 'string') {
            (keys as GenericObject[]).forEach((key: GenericObject) => {
                keySet.add(key.original.key);
            });
        } else {
            keySet = new Set(keys as string[]);
        }
        keySet.forEach((key) => {
            promises.push(this.client.put(key).touch(key));
        });

        return Promise.all(promises);
    }

    public remove(keys: GenericObject[] | string[]): Promise<any> {
        const promises: Promise<any>[] = [];
        let keySet = new Set<string>();
        if (typeof keys[0] !== 'string') {
            (keys as GenericObject[]).forEach((key: GenericObject) => {
                keySet.add(key.original.key);
            });
        } else {
            keySet = new Set(keys as string[]);
        }
        keySet.forEach((key: string) => {
            promises.push(
                this.client
                    .delete()
                    .key(key)
                    .exec()
            );
        });

        return Promise.all(promises);
    }

    public stats() {
        return this.client.cluster.memberList();
    }
}
