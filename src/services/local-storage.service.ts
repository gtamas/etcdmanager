import { GenericObject } from './../../types/index';
export class LocalStorageService {
    private ls: any;

    constructor(ls: any) {
        this.ls = ls;
    }

    public get(key: string): GenericObject {
        return JSON.parse(this.ls.get(key));
    }

    public getRaw(key: string): any {
        return this.ls.get(key);
    }

    public set(key: string, data: any): LocalStorageService {
        this.ls.set(key, JSON.stringify(data));
        return this;
    }

}
