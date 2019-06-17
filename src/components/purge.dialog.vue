<template>
 <v-dialog v-model="open" persistent max-width="290">
      <v-card dark>
        <v-toolbar dark flat>
          <v-toolbar-title>{{ $t("purgeDialog.title") }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>{{ $t("purgeDialog.content", {type: itemName}) }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" round @click="confirm">{{ $t("purgeDialog.actions.remove") }}</v-btn>
          <v-btn color="warning" round @click="cancel">{{ $t("purgeDialog.actions.cancel") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
    name: 'purge-dialog',
})
export default class PurgeDialog extends Vue {
    // @ts-ignore
    @Prop() open: boolean;
    // @ts-ignore
    @Prop() itemName: string;

    confirm() {
        this.$emit('confirm');
    }

    cancel() {
        this.$emit('cancel');
    }
}
</script>

<style scoped>
</style>
