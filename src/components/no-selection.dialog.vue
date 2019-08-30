<template>
    <v-dialog v-model="isOpen" max-width="290">
        <v-card dark>
            <v-toolbar dark flat>
                <v-toolbar-title
                    data-test="no-selection-dialog.title.toolbar"
                >{{ $t("noSelectionDialog.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text
                data-test="no-selection-dialog.content.card-text"
            >{{ $t("noSelectionDialog.content") }}</v-card-text>
            <v-card-actions>
                <v-spacer data-test="no-selection-dialog.actions.spacer"></v-spacer>
                <v-btn
                    data-test="no-selection-dialog.actions.button"
                    color="primary"
                    round
                    @click="close"
                >{{ $t("noSelectionDialog.actions.ok") }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Dialog from '../lib/dialog.class';

@Component({
    name: 'no-selection-dialog',
})
export default class NoSelectionDialog extends Dialog {
    // @ts-ignore
    @Prop() open: boolean = false;

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
