import { Etcd3 } from 'etcd3';
import store from '@/store';

export class AuthService {

    constructor(private client: Etcd3) {
    }

    public getUser() {
        return store.state.etcdAuth.username || '';
    }

    public isAuthenticated() {
        return this.getUser() !== '';
    }

    public async isRoot() {
        return store.state.etcdAuth.username === 'root' || await this.hasRole('root');
    }

    public async hasRole(roleName: string) {
        const user = await this.client.user(this.getUser()).roles();
        for (const role of user) {
            if (role.name === roleName) {
                return true;
            }
        }

        return false;
    }

}
