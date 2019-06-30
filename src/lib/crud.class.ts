import Vue from 'vue';
import { GenericObject } from './../../types/index';
import EtcdService from '@/services/etcd.service';
import Component from 'vue-class-component';
import store from '@/store';


export interface List {
    load(): Promise<CrudBase>;
    load(prefix?: string): Promise<CrudBase>;
}

@Component({
})
export class CrudBase extends Vue implements List {
    public loading: boolean = true;
    public deleteDialog: boolean = false;
    public purgeDialog: boolean = false;
    public data: GenericObject[] = [];
    public currentItem: GenericObject = {};
    public headers: GenericObject[] = [];
    public editor: boolean = false;
    public error: boolean = false;
    public selected: GenericObject[] = [];
    public filter: string | null = null;
    public noSelection = false;

    protected itemToDelete: GenericObject | null = null;
    protected operation: 'create' | 'edit' = 'create';
    protected defaultItem: GenericObject = { key: '', value: '' };
    protected etcd!: EtcdService;

    constructor() {
        super();
    }

    public translateHeaders(...keys: string[]) {
        keys.forEach((k, i) => {
            this.headers[i].text = this.$t(k).toString();
        });
    }

    public closeNoSelection() {
        this.noSelection = false;
    }

    public addItem() {
        this.editor = true;
        this.operation = 'create';
        this.currentItem = { ...this.currentItem, ...this.defaultItem };
    }

    public editItem(item: GenericObject) {
        this.editor = true;
        this.operation = 'edit';
    }

    public closeEditor() {
        this.editor = false;
    }

    public cancelEdit() {
        this.editor = false;
        this.currentItem = { ...this.currentItem, ...this.defaultItem };
    }

    public hasSelection() {
        return this.selected.length > 0;
    }

    public deleteSingle(item: GenericObject) {
        this.deleteDialog = true;
        this.itemToDelete = item;
    }

    public deleteMany() {
        if (this.hasSelection()) {
            this.noSelection = false;
            this.deleteDialog = true;
        } else {
            this.noSelection = true;
        }
    }

    public purge() {
        this.purgeDialog = true;
    }

    public async confirmPurge(): Promise<CrudBase>  {
        try {
            this.toggleLoading();
            // @ts-ignore
            await this.etcd.purge();
            await this.load();
            this.toggleLoading();
            this.purgeDialog = false;
            return Promise.resolve(this);
        } catch (error) {
            this.toggleLoading();
            this.purgeDialog = false;
            return Promise.reject(error);
        }
    }

    public async confirmDelete(keyName: string): Promise<CrudBase> {
        const item = this.itemToDelete as GenericObject;
        const toBeRemoved = this.hasSelection() ? this.getSelectedKeys(keyName) : [item[keyName]];

        try {
            this.toggleLoading();
            // @ts-ignore
            await this.etcd.remove(toBeRemoved);
            await this.load();
            this.toggleLoading();
            this.itemToDelete = null;
            if (this.hasSelection()) {
                this.selected = [];
            }
            this.cancelDelete();
            return Promise.resolve(this);
        } catch (error) {
            this.toggleLoading();
            this.cancelDelete();
            return Promise.reject(error);
        }
    }

    public cancelPurge() {
        this.purgeDialog = false;
    }

    public cancelDelete() {
        this.deleteDialog = false;
    }

    protected getSelectedKeys(uniqueKey: string = 'key'): string[] {
        return this.selected.map(item => item[uniqueKey]);
    }

    public async load(...args:any): Promise<CrudBase> {
        return Promise.resolve(this);
    }

    public toggleLoading() {
        if (store.state.loading) {
            setTimeout(() => {
                store.commit('loading');
            },         500);
        } else {
            store.commit('loading');
        }

    }
}
