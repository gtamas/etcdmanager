<template>
    <v-card>
        <v-toolbar dark flat>
            <v-toolbar-title data-test="action-editor.title.v-toolbar-title">{{ title }}</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fill-height fluid>
            <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                    <v-form ref="actionForm" v-model="valid" lazy-validation>
                        <v-select
                            data-test="action-editor.action-type.v-select"
                            ref="actionType"
                            dark
                            v-model="action.action"
                            :items="actions"
                            :label="$t('actionEditor.fields.action.label')"
                            item-text="name"
                            item-value="value"
                            return-object
                            required
                            @change="change"
                        >
                            <v-tooltip slot="prepend" bottom max-width="200">
                                <v-icon data-test="action-editor.action-info.v-icon" slot="activator" color="primary" dark>info</v-icon>
                                <span data-test="action-editor.action-tooltip.span">{{ $t('actionEditor.fields.action.tooltip') }}</span>
                            </v-tooltip>
                        </v-select>

                        <v-select
                            data-test="action-editor.event.v-select"
                            dark
                            v-model="action.event"
                            :items="events"
                            :label="$t('actionEditor.fields.event.label')"
                            item-text="name"
                            item-value="value"
                            return-object
                            required
                            @change="change"
                        >
                            <v-tooltip slot="prepend" bottom max-width="200">
                                <v-icon data-test="action-editor.event-info.v-icon" slot="activator" color="primary" dark>info</v-icon>
                                <span data-test="action-editor.event-tooltip.span">{{ $t('actionEditor.fields.event.tooltip') }}</span>
                            </v-tooltip>
                        </v-select>
                        <v-btn :disabled="!valid" round color="primary" @click="submit">
                            <v-icon data-test="action-editor.op-title.v-icon">add</v-icon>
                            <span data-test="action-editor.op-title.span">{{ opTitle }}</span>
                        </v-btn>
                        <v-btn color="warning" round @click="cancel">
                            <v-icon data-test="action-editor.close.v-icon">close</v-icon>
                            <span data-test="action-editor.close.span">{{ $t('common.actions.close.label') }}</span>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script lang='ts'>
import Component from 'vue-class-component';
import { GenericObject } from '../../types';
import { required } from 'vuelidate/lib/validators';
import { BaseEditor } from '../lib/editor.class';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'action-editor',
    validations: {
        action: {
            required,
        },
        event: {
            required,
        },
    },
})
export default class ActionEditor extends BaseEditor {
    public loading: boolean = true;
    public valid = false;
    public itemId: string = 'action';
    public itemType: string = 'action';

    // @ts-ignore
    @Prop() data: {
        id: Symbol;
        action: GenericObject;
        event: GenericObject;
    };
    // @ts-ignore
    @Prop() mode: string;

    mounted() {
        this.bindDefaultEvents('actionForm');
        // @ts-ignore
        this.$nextTick(this.$refs.actionType.focus);
    }

    public action: GenericObject = {
        id: this.data.id,
        action: this.data.action,
        event: this.data.event,
    };

    public actions: GenericObject[] = [
        { name: 'Print to console', value: 0, type: 1 },
        { name: 'Notification', value: 1, type: 1 },
        { name: 'Desktop notofication', value: 2, type: 1 },
    ];

    public events: GenericObject[] = [
        { name: 'put', value: 0, type: 2 },
        { name: 'delete', value: 1, type: 2 },
    ];

    public change(event: GenericObject) {
        if (event.type === 1) {
            this.action.action = event;
        } else {
            this.action.event = event;
        }
    }

    constructor() {
        super();
    }

    public submit(): ActionEditor {
        this.$emit('action', this.action);
        return this;
    }

    get title() {
        if (this.editMode) {
            // @ts-ignore
            return `${this.$t('common.titles.edit').toString()}`;
        }
        return `${this.$t('common.titles.new').toString()}`;
    }
}
</script>

<style scoped>
</style>
