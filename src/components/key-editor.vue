<template>
  <v-card>
    <v-toolbar dark flat>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fill-height fluid>
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              dark
              v-model="key"
              :error-messages="keyErrors"
              :label="$t('keyEditor.fields.key.label')"
              :disabled="editMode"
              :placeholder="$t('keyEditor.fields.key.placeholder')"
              required
              @input="$v.key.$touch()"
              @blur="$v.key.$touch()"
            >
              <v-tooltip slot="prepend" bottom max-width="200">
                <v-icon slot="activator" color="primary" dark>info</v-icon>
                <span>{{ $t('keyEditor.fields.key.tooltip') }}</span>
              </v-tooltip>
            </v-text-field>

            <v-text-field
              dark
              type="text"
              v-model="value"
              :error-messages="valueErrors"
              :label="$t('keyEditor.fields.value.label')"
              :placeholder="$t('keyEditor.fields.value.placeholder')"
              required
              @input="$v.value.$touch()"
              @blur="$v.value.$touch()"
            >
              <v-tooltip slot="prepend" bottom max-width="200">
                <v-icon slot="activator" color="primary" dark>info</v-icon>
                <span>{{ $t('keyEditor.fields.value.tooltip') }}.</span>
              </v-tooltip>
            </v-text-field>

            <v-btn :disabled="!valid" round color="primary" @click="submit">{{ opTitle }}</v-btn>
            <v-btn color="warning" round @click="cancel">{{ $t('common.actions.close.label') }}</v-btn>
            <v-spacer></v-spacer>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Etcd3, MultiRangeBuilder } from 'etcd3';
import { GenericObject } from '../../types';

import { required, alphaNum } from 'vuelidate/lib/validators';
import Messages from '../messages';
import KeyService from '../services/key.service';

@Component({
    // @ts-ignore
    name: 'key-editor',
    props: {
        data: {
            key: String,
            value: String,
        },
        mode: String,
    },
    validations: {
        key: {
            required,
            alphaNum,
        },
        value: {
            required,
            alphaNum,
        },
    },
})
export default class KeyEditor extends Vue {
    public loading: boolean = true;
    public valid = false;

    public key: string = this.data.key || '';
    public value: string = this.data.value || '';

    constructor() {
        super();
    }

    get createMode() {
        return this.mode === 'create';
    }

    get editMode() {
        return this.mode === 'edit';
    }

    get title() {
        if (this.editMode) {
            return `Edit: ${this.key}`;
        }
        return 'New Key';
    }

    get keyErrors() {
        const errors: any = [];
        if (!this.$v.key.$dirty) {
            return errors;
        }
        !this.$v.key.required && errors.push('Item is required');
        !this.$v.key.alphaNum && errors.push('Alphanumeric value expected');
        return errors;
    }

    get valueErrors() {
        const errors: any = [];
        if (!this.$v.value.$dirty) {
            return errors;
        }
        !this.$v.value.required && errors.push('Item is required');
        !this.$v.value.alphaNum && errors.push('Alphanumeric value expected');
        return errors;
    }

    get opTitle() {
        return this.createMode ? 'Add' : 'Edit';
    }

    public cancel() {
        this.$emit('cancel');
    }

    public updated() {}

    public submit(reset = false) {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return false;
        }

        const etcd = new KeyService(this.$store.state.connection.getClient());

        this.loading = true;
        etcd.upsert(this.key, this.value)
            .then((data: any) => {
                this.loading = false;
                this.$store.commit('message', Messages.success());
                this.$emit('reload');
                this.$v.$reset();
                if (this.createMode) {
                    this.key = '';
                    this.value = '';
                }
            })
            .catch((error: any) => {
                this.$store.commit('message', Messages.error(error));
            });
    }
}
</script>

<style scoped>
</style>
