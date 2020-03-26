import { ClipboardService } from './../services/clipboard.service';
import { PlatformService } from './../services/platform.service';
import Vue from 'vue';
import { GenericObject } from './../../types/index';
import EtcdService from '@/services/etcd.service';
import Component from 'vue-class-component';
import store from '@/store';
import Mousetrap from 'mousetrap';

export interface List {
    load(prefix?: string): Promise<CrudBase>;
}

@Component({})
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
    protected keyboardEvents: any;
    public help: number | null = null;
    public clipboardService: ClipboardService;
    public platformService: PlatformService;
    public helpbar: any = 0;

    constructor() {
        super();
        this.clipboardService = new ClipboardService();
        this.platformService = new PlatformService();
        this.bindDefaultEvents();
    }

    protected bindDefaultEvents() {
        this.keyboardEvents = new Mousetrap();
        this.unbindDefaultEvents();
        this.keyboardEvents.stopCallback = () => false;
        this.keyboardEvents.bind('meta+a', (e: ExtendedKeyboardEvent) => {
            e.preventDefault();
            this.addItem();
        });
        this.keyboardEvents.bind('meta+f', (e: ExtendedKeyboardEvent) => {
            e.preventDefault();
            // @ts-ignore
            this.$nextTick(this.$refs.search.focus);
        });
        this.keyboardEvents.bind('meta+p', (e: ExtendedKeyboardEvent) => {
            e.preventDefault();
            this.purge();
        });
        this.keyboardEvents.bind('meta+r', (e: ExtendedKeyboardEvent) => {
            e.preventDefault();
            this.deleteMany();
        });
        this.keyboardEvents.bind('meta+h', (e: ExtendedKeyboardEvent) => {
            e.preventDefault();
            this.toggleHelp();
        });
        this.keyboardEvents.bind('esc', (e: ExtendedKeyboardEvent) => {
            e.stopPropagation();
            this.closeEditor();
        });
    }

    protected unbindDefaultEvents() {
        this.keyboardEvents = this.keyboardEvents.reset();
    }

    public toggleHelp() {
        this.help = this.help === 0 ? null : 0;
    }

    public translateHeaders(...keys: string[]) {
        keys.forEach((k, i) => {
            this.headers[i].text = this.$t(k).toString();
        });
    }

    public closeNoSelection() {
        this.noSelection = false;
    }

    public async addItem() {
        await this.closeEditor();
        this.editor = true;
        this.operation = 'create';
        this.currentItem = { ...{}, ...this.defaultItem };
    }

    // @ts-ignore
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

    public async confirmPurge(): Promise<CrudBase | Error> {
        try {
            this.toggleLoading();
            // @ts-ignore
            await this.etcd.purge();
            await this.load();
            await this.closeEditor();
            this.toggleLoading();
            this.purgeDialog = false;
            return Promise.resolve(this);
        } catch (error) {
            this.toggleLoading();
            this.purgeDialog = false;
            return Promise.reject(error);
        }
    }

    public async confirmDelete(keyName: string): Promise<CrudBase | Error> {
        const item = this.itemToDelete as GenericObject;
        const toBeRemoved = this.hasSelection()
            ? this.getSelectedKeys(keyName)
            : [item[keyName]];

        try {
            this.toggleLoading();
            // @ts-ignore
            await this.etcd.remove(toBeRemoved);
            await this.load();
            await this.closeEditor();
            this.toggleLoading();
            this.itemToDelete = null;
            await this.closeEditor();
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

    protected getSelectedKeys(
        uniqueKey: string = 'key'
    ): GenericObject[] | string[] {
        if (this.selected[0].original) {
            return this.selected;
        }
        return this.selected.map(item => item[uniqueKey]);
    }

    // @ts-ignore
    public async load(...args: any): Promise<CrudBase> {
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
