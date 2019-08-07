<template>
  <v-dialog v-model="isOpen" max-width="290">
    <v-card dark>
      <v-toolbar dark flat>
        <v-toolbar-title>{{ $t("noSelectionDialog.title") }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>{{ $t("noSelectionDialog.content") }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" round @click="close">{{ $t("noSelectionDialog.actions.ok") }}</v-btn>
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
