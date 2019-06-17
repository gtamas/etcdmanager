
export default class LocalStorageService {

    constructor(private ls: any) {
    }

    public read(key: 'string', defaultValue?: any): any {
        return JSON.parse(this.ls.get(key) || defaultValue);
    }

    public write(key: string, value: any) {
        return this.ls.set(key, JSON.stringify(value));
    }

}
