import { GenericObject, DataService } from './../../types/index';
import {
    Etcd3,
    Role,
    IPermissionResult,
    IPermissionRequest,
    Range,
} from 'etcd3';
import EtcdService from './etcd.service';

export default class RoleService extends EtcdService implements DataService {
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

    public remove(roles: string[]): Promise<any> {
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
                promises.push(this.remove([role.name]));
            });
            return Promise.all(promises);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public rolePermissions(name: string): Promise<IPermissionResult[]> {
        return this.getRole(name).permissions();
    }

    public async setPermissions(
        options: GenericObject,
        isCreate: boolean = true
    ): Promise<Role | Boolean> {
        let permissionReq: IPermissionRequest = {
            permission: options.permission,
            key: options.key,
        };
        if (options.isPrefix) {
            permissionReq = {
                permission: options.permission,
                range: Range.prefix(options.key),
            };
        }

        if (options.isAll) {
            permissionReq = {
                permission: options.permission,
                range: Range.prefix(''),
            };
        }
        const role = this.getRole(options.name);

        if (options.grant) {
            if (isCreate) {
                const perms = await role.permissions();
                for (const perm of perms) {
                    const key = perm.range.start.toString();
                    if (key === options.key) {
                        return Promise.reject(false);
                    }
                }
            }

            return role.grant(permissionReq);
        }

        return role.revoke(permissionReq);
    }
}
