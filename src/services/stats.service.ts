import { Etcd3, AlarmAction, AlarmType } from 'etcd3';
import EtcdService from './etcd.service';

export default class StatsService extends EtcdService {

    constructor(client?: Etcd3) {
        super(client);
    }

    public listMembers() {
        return this.client.cluster.memberList();
    }

    public getAlarms(memberID: string) {
        return this.client.maintenance.alarm({
            memberID,
            action: AlarmAction.Get,
            // tslint:disable-next-line: no-bitwise
            alarm: AlarmType.Corrupt | AlarmType.Nospace,
        });
    }

    public getStats() {
        return this.client.maintenance.status();
    }

}
