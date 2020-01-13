import { Etcd3, Role } from 'etcd3';
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

        let roles: Role[] = [];

        try {
            roles = await this.client.user(this.getUser()).roles();
        } catch (e) {
            return false;
            // TODO: throw here, fix error handling.
        }

        for (const role of roles) {
            if (role.name === roleName) {
                return true;
            }
        }

        return false;
    }
}
