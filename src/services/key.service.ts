import { DataService } from './../../types/index';
import {
    MultiRangeBuilder,
    Range,
    Etcd3,
} from 'etcd3';
import EtcdService  from './etcd.service';

export default class KeyService extends EtcdService implements DataService {

    constructor(client?: Etcd3) {
      super(client);
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

    public upsert(key: string, value: string): Promise<any> {
        return this.client.put(key).value(value);
    }

    public purge(): Promise<any> {
        return this.client.delete().all();
    }

    public touch(keys: string[]): Promise<any> {
        const promises: Promise<any>[] = [];

        keys.forEach((key) => {
            promises.push(this.client
                .put(key)
                .touch(key));
        });

        return Promise.all(promises);
    }

    public remove(keys: string[], isPrefix: boolean = false): Promise<any> {
        if (isPrefix) {
            const range = Range.prefix(keys[0]);
            return this.client
                .delete()
                .range(range)
                .exec();
        }

        const promises: Promise<any>[] = [];

        keys.forEach((key) => {
            promises.push(this.client
                .delete()
                .key(key)
                .exec());
        });

        return Promise.all(promises);
    }

    public stats() {
        return this.client.cluster.memberList();
    }

}
