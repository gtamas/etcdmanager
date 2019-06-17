<template>
  <v-dialog v-model="open" persistent max-width="290">
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'no-selection-dialog',
})
export default class NoSelectionDialog extends Vue {
    // @ts-ignore
    @Prop() open: boolean;

    close() {
        this.$emit('close');
    }
}
</script>

<style scoped>
</style>
