import { Etcd3 } from 'etcd3';
import store from '@/store';

export class AuthService {
    client: Etcd3;

    constructor(client?: Etcd3) {
        this.client = client || this.updateClient();
    }

    public updateClient() {
        return store.state.connection.getClient();
    }

    public getUser() {
        return store.state.etcdAuth.username || '';
    }

    public isAuthenticated() {
        return this.getUser() !== '';
    }

    public async isRoot() {
        return (
            store.state.etcdAuth.username === 'root' ||
            (await this.hasRole('root'))
        );
    }

    public async hasRole(roleName: string) {
        if (!this.isAuthenticated()) {
            return true;
        }
        if (!this.client) {
            this.client = this.updateClient();
        }
        const user = await this.client.user(this.getUser()).roles();
        for (const role of user) {
            if (role.name === roleName) {
                return true;
            }
        }

        return false;
    }
}
