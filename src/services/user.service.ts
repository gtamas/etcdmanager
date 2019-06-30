import { DataService } from './../../types/index';
import {
    Etcd3, User, Role,
} from 'etcd3';
import EtcdService from './etcd.service';

export default class UserService extends EtcdService implements DataService {

    constructor(client?: Etcd3) {
        super(client);
    }

    public getUsers(): Promise<User[]> {
        return this.client.getUsers();
    }

    private getUser(name: string): User {
        return this.client.user(name);
    }


    public getUserRoles(name: string): Promise<Role[]> {
        const user = this.getUser(name);
        return user.roles();
    }

    public remove(toBeRemoved: string[]): Promise<any> {
        const promises: Promise<User>[] = [];
        for (const userName of toBeRemoved) {
            promises.push(this.client.user(userName).delete());
        }
        return Promise.all(promises);
    }

    public addRole(userName: string, role: Role): Promise<User> {
        return this.getUser(userName).addRole(role.name);
    }

    public revokeRole(userName: string, role: Role): Promise<User> {
        return this.getUser(userName).removeRole(role.name);
    }

    public async purge(): Promise<any>  {
        try {
            const userObjs = await this.getUsers();
            const userNames = userObjs.map((user: User) => {
                return user.name;
            });
            return Promise.resolve(this.remove(userNames));
        } catch (error) {
            return Promise.reject([error]);
        }
    }

    public createUser(name: string, password: string): Promise<User> {
        const user = this.getUser(name);
        return user.create(password);
    }
}
