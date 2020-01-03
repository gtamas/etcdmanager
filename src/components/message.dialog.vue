<template>
    <v-dialog v-model="isOpen" max-width="290">
        <v-card dark>
            <v-toolbar dark flat>
                <v-toolbar-title
                    data-test="message-dialog.title.toolbar"
                >{{ $t(title || 'messageDialog.title') }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text
                data-test="message-dialog.content.card-text"
            >{{ $t(text) }}</v-card-text>
            <v-card-actions>
                <v-spacer data-test="message-dialog.actions.spacer"></v-spacer>
                <v-btn
                    data-test="message-dialog.actions.button"
                    color="primary"
                    round
                    @click="close"
                >{{ $t(okText || 'messageDialog.actions.ok') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Dialog from '../lib/dialog.class';

@Component({
    name: 'message-dialog',
})
export default class MessageDialog extends Dialog {
    // @ts-ignore
    @Prop() open: boolean = false;
      // @ts-ignore
    @Prop() title: string;
      // @ts-ignore
    @Prop() text: string;
      // @ts-ignore
    @Prop() okText: string;

    get isOpen() {
        return this.open;
    }

    set isOpen(v) {
        if (!v) {
            this.close();
        }
    }

    close() {
        this.$emit('close');
    }
}
</script>

<style scoped>
</style>
