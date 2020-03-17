<template>
    <v-dialog v-model="open" persistent max-width="290">
        <v-card dark>
            <v-toolbar dark flat>
                <v-toolbar-title
                    data-test="save-as-dialog.title.toolbar-title"
                    >{{ $t('saveAsDialog.title') }}</v-toolbar-title
                >
            </v-toolbar>
            <!-- <v-card-text
                data-test="delete-dialog.content.card-text"
            >{{ $t("deleteDialog.content", {type: itemName}) }}</v-card-text> -->
            <v-text-field
                data-test="save-as-dialog.profile.text-field"
                dark
                type="text"
                ref="profile"
                tab=""
                v-model="itemName"
                :placeholder="$t('saveAsDialog.profile.placeholder')"
                :label="$t('saveAsDialog.profile.label')"
            >
                <v-tooltip slot="prepend" bottom max-width="200">
                    <!-- <v-icon
                        data-test="save-as-dialog.fields-username.icon"
                        slot="activator"
                        color="primary"
                        dark
                        >info</v-icon
                    > -->
                    <span data-test="save-as-dialog.profile.span">
                        {{ $t('save-as-dialog.profile.tooltip') }}.
                    </span>
                </v-tooltip>
            </v-text-field>
            <v-card-actions>
                <!-- <v-spacer></v-spacer> -->
                <v-btn
                    data-test="save-as-dialog.actions-remove.button"
                    color="primary"
                    round
                    @click="this.$emit('action', this.action)"
                    >{{ $t('saveAsDialog.actions.saveAs') }}</v-btn
                >
                <v-btn
                    data-test="save-as-dialog.actions-cancel.button"
                    color="warning"
                    round
                    @click="cancel"
                    >{{ $t('saveAsDialog.actions.cancel') }}</v-btn
                >
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
export default class SaveAsDialog extends Dialog {
    // @ts-ignore
    @Prop() open: boolean;
    // @ts-ignore
    @Prop() itemName: string;

    public submit(): SaveAsDialog {
        this.$emit('saveAs', this.itemName);
        return this;
    }
}
</script>

<style scoped></style>
