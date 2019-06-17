import { GenericObject } from './../../types/index';
import {
    Etcd3, Role, IPermissionResult, IPermissionRequest, Range,
} from 'etcd3';
import EtcdService from './etcd.service';

export default class RoleService extends EtcdService {

    constructor(client?: Etcd3) {
        super(client);
    }

    public getRole(name: string): Role {
        return this.client.role(name);
    }

    public async loadRole(name: string) {
        return this.client.role(name);
    }

    public getRoles(): Promise<Role[]> {
        return this.client.getRoles();
    }

    public createRole(name: string): Promise<Role> {
        const role = this.getRole(name);
        return role.create();
    }

    public deleteRole(roles: string[]): Promise<any> {
        const promises: Promise<Role>[] = [];
        roles.forEach((roleName) => {
            const role = this.getRole(roleName);
            promises.push(role.delete());
        });
        return Promise.all(promises);
    }

    public async purge(): Promise<any> {
        try {
            const roles = await this.getRoles();
            const promises: Promise<Role>[] = [];
            roles.forEach((role) => {
                promises.push(this.deleteRole([role.name]));
            });
            return Promise.all(promises);
        }
        catch (e) { return Promise.reject(e); }
    }

    public rolePermissions(name: string): Promise<IPermissionResult[]> {
        return this.getRole(name).permissions();
    }

    public setPermissions(options: GenericObject): Promise<Role> {
        let permissionReq: IPermissionRequest = {
            permission: options.permission,
            key: options.key,
        };
        if (options.isRange) {
            permissionReq = {
                permission: options.permission,
                range: Range.prefix(options.key),
            };
        }

        console.log(options);

        const role = this.getRole(options.name);

        if (options.grant) {
            return role.grant(permissionReq);
        }
        return role.revoke(permissionReq);
    }

}
