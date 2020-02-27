import { AuthService } from './auth.service';
import store from '@/store';
import {
    DataService,
    RevisionListType,
    GenericObject,
} from './../../types/index';
import { MultiRangeBuilder, Etcd3, DeleteBuilder } from 'etcd3';
import EtcdService from './etcd.service';

export default class KeyService extends EtcdService implements DataService {

    private authService: AuthService;

    constructor(client?: Etcd3) {
        super(client);
        this.authService = new AuthService();

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

    private async mkAuthQueries(isPut: boolean = true): Promise<Promise<{ [key: string]: string; }>[]> {
        const auth = store.state.etcdAuth.username;
        const user = await this.client.user(auth).roles();
        const queries: Promise<{ [key: string]: string; }>[] = [];
        for (const role of user) {
            const permissions = await role.permissions();
            for (const permission of permissions) {
                let query: MultiRangeBuilder | DeleteBuilder;
                if (isPut) {
                    query = this.client.getAll();
                    if (permission.permission.includes('Read')) {
                        query.inRange(permission.range);
                        queries.push((query as MultiRangeBuilder).strings());
                    }
                } else {
                    query = this.client.delete();
                    if (permission.permission.includes('write')) {
                        query.inRange(permission.range);
                        // @ts-ignore
                        queries.push(query);
                    }
                }
            }
        }


        return Promise.resolve(queries);
    }

    public async loadAllKeys(prefix?: string): Promise<any> {

        let queries: Promise<{ [key: string]: string; }>[] = [];
        let query: MultiRangeBuilder = this.client.getAll();

        if (!this.authService.isAuthenticated() || await this.authService.isRoot()) {

            if (prefix) {
                query = query.prefix(prefix);
            }

            queries.push(query.strings());

        } else {
            queries = await this.mkAuthQueries();
        }

        let res: GenericObject = {};

        const results = await Promise.all(queries);

        results.forEach((result: any) => {
            res = { ...res, ...result };
        });

        return Promise.resolve(res);
    }

    public async insert(
        key: string,
        value: string,
        ttl: number,
        isCreate: boolean = true
    ): Promise<any> {
        if (isCreate) {
            const builder = ttl ?  this.client.lease(ttl) : this.client;
            return this.client
            .if(key, 'Create', '==', 0)
            .then(builder.put(key).value(value))
            .else(this.client.get(key))
            .commit();
        }
        return this.client.put(key).value(value);
    }

    public async purge(): Promise<any> {

        const builder = this.client.delete();
        let queries: Promise<{ [key: string]: string; }>[] = [];

        if (!this.authService.isAuthenticated() || this.authService.isRoot()) {
            queries.push(builder.all());
        } else {
            queries = await this.mkAuthQueries(false);
        }

        return Promise.all(queries);

    }

    private mkKeySet(keys: GenericObject[] | string[]): Set<string> {
        let keySet = new Set<string>();
        if (typeof keys[0] !== 'string') {
            (keys as GenericObject[]).forEach((key: GenericObject) => {
                keySet.add(key.original.key);
            });
        } else {
            keySet = new Set(keys as string[]);
        }
        return keySet;
    }

    public touch(keys: GenericObject[] | string[]): Promise<any> {
        const promises: Promise<any>[] = [];

        this.mkKeySet(keys).forEach((key) => {
            promises.push(this.client.put(key).touch(key));
        });

        return Promise.all(promises);
    }

    public remove(keys: GenericObject[] | string[]): Promise<any> {
        const promises: Promise<any>[] = [];

        this.mkKeySet(keys).forEach((key: string) => {
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
