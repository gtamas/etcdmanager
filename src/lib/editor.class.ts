import { GenericObject } from './../../types/index';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { capitalize } from 'lodash-es';
import store from '@/store';
import Mousetrap from 'mousetrap';

@Component({
})
export class BaseEditor extends Vue {
    public loading: boolean = true;
    public valid = false;
    public itemId!: string;
    public itemType!: string;
    public headers: GenericObject[] = [];
    protected keyboardEvents: any;

    @Prop() mode!: string;

    constructor() {
        super();
    }

    protected focus(refName: string) {
        // @ts-ignore
        this.$nextTick(this.$refs[refName].focus);
    }

    protected bindDefaultEvents(refName: string) {
        // @ts-ignore
        const form = this.$refs[refName].$el;
        this.keyboardEvents = new Mousetrap(form as HTMLFormElement);
        this.keyboardEvents.stopCallback = () => false;
        this.keyboardEvents.bind('meta+s', () => {
            this.submit();
        });
        this.keyboardEvents.bind('enter', (e: ExtendedKeyboardEvent) => {
            e.preventDefault();
            this.submit();
        });
        this.keyboardEvents.bind('esc', () => {
            this.cancel();
        });
    }

    protected unbindDefaultEvents() {
        this.keyboardEvents = this.keyboardEvents.reset();
    }

    public translateHeaders(...keys: string[]) {
        keys.forEach((k, i) => {
            this.headers[i].text = this.$t(k).toString();
        });
    }

    get createMode() {
        return this.mode === 'create';
    }

    get editMode() {
        return this.mode === 'edit';
    }

    get title() {
        if (this.editMode) {
            // @ts-ignore
            return `${this.$t('common.titles.edit').toString()}: ${this[this.itemId.toLowerCase()]}`;
        }
        return `${this.$t('common.titles.new').toString()} ${capitalize(this.itemType)}`;
    }

    get opTitle() {
        return this.$t(this.createMode ? 'common.actions.add' : 'common.actions.save').toString();
    }

    public cancel() {
        this.$emit('cancel');
    }

    public toggleLoading() {
        if (store.state.loading) {
            setTimeout(() => {
                store.commit('loading');
            }, 500);
        } else {
            store.commit('loading');
        }

    }

    protected submit() { }
}
