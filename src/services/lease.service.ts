import { GenericObject } from './../../types/index';
import {
    Etcd3, ILeaseTimeToLiveResponse, ILeaseRevokeResponse,
} from 'etcd3';
import EtcdService from './etcd.service';

export default class LeaseService extends EtcdService {

    constructor(client?: Etcd3) {
        super(client);
    }

    public async getLeases(): Promise<GenericObject[]> {
        const res = await this.client.leaseClient.leaseLeases();
        return Promise.resolve(res.leases.map((lease: any) => {
            return { ID: lease.ID }
        }));

    }

    public async loadLease(leaseId: string): Promise<ILeaseTimeToLiveResponse> {
        try {
            const res = await this.client.leaseClient.leaseTimeToLive({
                ID: leaseId,
                keys: true,
            });
            return Promise.resolve(res);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public async purge(): Promise<ILeaseRevokeResponse[]> {
        try {
            const roles = await this.getLeases();
            const promises: Promise<ILeaseRevokeResponse>[] = [];
            roles.forEach((lease) => {
                promises.push(this.client.leaseClient.leaseRevoke({
                    ID: lease.ID,
                }));
            });
            return Promise.all(promises);
        } catch (e) {
            return Promise.reject(e);
        }
    }


    public remove(leaseIds: number[]): Promise<ILeaseRevokeResponse[]> {
        const promises: Promise<ILeaseRevokeResponse>[] = [];
        leaseIds.forEach((leaseId) => {
            promises.push(this.client.leaseClient.leaseRevoke({
                ID: leaseId,
            }));
        });
        return Promise.all(promises);
    }

}
