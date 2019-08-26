<template>
    <v-dialog v-model="open" persistent max-width="290">
        <v-card dark>
            <v-toolbar dark flat>
                <v-toolbar-title
                    data-test="delete-dialog.title.v-toolbar-title"
                >{{ $t("deleteDialog.title") }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text
                data-test="delete-dialog.content.v-card-test"
            >{{ $t("deleteDialog.content", {type: itemName}) }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    data-test="delete-dialog.actions-remove.v-btn"
                    color="primary"
                    round
                    @click="confirm()"
                >{{ $t("deleteDialog.actions.remove") }}</v-btn>
                <v-btn
                    data-test="delete-dialog.actions-cancel.v-btn"
                    color="warning"
                    round
                    @click="cancel"
                >{{ $t("deleteDialog.actions.cancel") }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Dialog from '../lib/dialog.class';

@Component({
    name: 'delete-dialog',
})
export default class DeleteDialog extends Dialog {
    // @ts-ignore
    @Prop() open: boolean;
    // @ts-ignore
    @Prop() itemName: string;
}
</script>

<style scoped>
</style>
