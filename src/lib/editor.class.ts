import { GenericObject } from './../../types/index';

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { capitalize } from 'lodash-es';

@Component({
})
export class BaseEditor extends Vue {
    public loading: boolean = true;
    public valid = false;
    public itemId!: string;
    public itemType!: string;
    public headers: GenericObject[] = [];

    @Prop() mode!: string;

    constructor() {
        super();
    }

    public translateHeaders(...keys: string[]) {
        keys.forEach((k, i) => {
            this.headers[i].text = this.$t(k).toString();
        })
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
}
