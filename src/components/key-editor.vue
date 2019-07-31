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
import Component from 'vue-class-component';

import { required, alphaNum } from 'vuelidate/lib/validators';
import Messages from '@/lib/messages';
import KeyService from '../services/key.service';
import { BaseEditor } from '../lib/editor.class';
import { ValidationError } from '../lib/validation-error.class';
import { Prop } from 'vue-property-decorator';

// @ts-ignore
class KeyError extends Error {
    constructor(message: any) {
        super(message);
        this.name = 'KeyError';
    }
}

@Component({
    // @ts-ignore
    name: 'key-editor',
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
export default class KeyEditor extends BaseEditor {
    public loading: boolean = true;
    public valid = false;

    public itemType: string = 'key';
    public itemId: string = 'key';

    // @ts-ignore
    @Prop() data: {
        key: string;
        value: string;
    };
    // @ts-ignore
    @Prop() mode: string;

    public key: string = this.data.key || '';
    public value: string = this.data.value || '';

    constructor() {
        super();
    }

    get keyErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.key.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.key.required) {
            errors.push(this.$t('common.validation.required'));
        }
        // @ts-ignore
        if (!this.$v.key.alphaNum) {
            errors.push(this.$t('common.validation.alphanumeric'));
        }
        return errors;
    }

    get valueErrors() {
        const errors: any = [];
        // @ts-ignore
        if (!this.$v.value.$dirty) {
            return errors;
        }
        // @ts-ignore
        if (!this.$v.value.required) {
            errors.push(this.$t('common.validation.required').toString());
        }
        // @ts-ignore
        if (!this.$v.value.alphaNum) {
            errors.push(this.$t('common.validation.alphanumeric').toString());
        }
        return errors;
    }

    public async submit(): Promise<KeyEditor | ValidationError> {
        this.$v.$touch();
        if (this.$v.$invalid) {
            return Promise.reject(new ValidationError('Form is invalid..'));
        }

        const etcd = new KeyService(this.$store.state.connection.getClient());

        try {
            this.toggleLoading();
            const res = await etcd.insert(
                this.key,
                this.value,
                this.createMode
            );
            this.toggleLoading();
            if (res.succeeded === true || res.succeeded === undefined) {
                this.$store.commit('message', Messages.success());
                this.$emit('reload');
                this.$v.$reset();
                if (this.createMode) {
                    this.key = '';
                    this.value = '';
                }
            } else {
                this.$store.commit(
                    'message',
                    Messages.error(
                        this.$t('keyEditor.messages.duplicateKey').toString()
                    )
                );
            }
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
            this.toggleLoading();
        }

        return Promise.resolve(this);
    }
}
</script>

<style scoped>
</style>
