import Vue from 'vue';
import { GenericObject } from './../../types/index';
import EtcdService from '@/services/etcd.service';
import Component from 'vue-class-component';

@Component({
})
export class CrudBase extends Vue {
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
        })
    }

    public closeNoSelection() {
        this.noSelection = false;
    }

    public addItem() {
        this.editor = true;
        this.operation = 'create';
        this.currentItem = { ...this.currentItem, ...this.defaultItem };
    }

    public async editItem(item: GenericObject, success: boolean = true) {
        if (success) {
            this.editor = true;
            this.operation = 'edit';
        } else {
            this.editor = false;
        }
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

    public async confirmPurge() {
        this.purgeDialog = false;
    }

    public async confirmDelete(selection: boolean = false, success: boolean = true) {

        if (success) {
            this.itemToDelete = null;
            if (selection) {
                this.selected = [];
            }
        }

        this.cancelDelete();
    }

    public cancelPurge() {
        this.purgeDialog = false;
    }

    public cancelDelete() {
        this.deleteDialog = false;
    }

    protected getSelectedKeys(uniqueKey: string = 'key'): string[] {
        return this.selected.map((item) => item[uniqueKey]);
    }
}
