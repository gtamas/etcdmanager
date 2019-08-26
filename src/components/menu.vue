<template>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
        <v-list dense>
            <v-list-tile ripple to="/configure">
                <v-list-tile-action>
                    <v-icon data-test="menu.configure.v-icon">settings</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                        data-test="menu.configure.v-list-tile-title"
                    >{{ $t('menu.settings') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple to="/cluster">
                <v-list-tile-action>
                    <v-icon data-test="menu.cluster.v-icon">cloud_circle</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                        data-test="menu.cluster.v-list-tile-title"
                    >{{ $t('menu.manageCluster') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple to="/keys">
                <v-list-tile-action>
                    <v-icon data-test="menu.keys.v-icon">list</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                        data-test="menu.keys.v-list-tile-title"
                    >{{ $t('menu.manageKeys') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple to="/watchers">
                <v-list-tile-action>
                    <v-icon data-test="menu.watchers.v-icon">remove_red_eye</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                        data-test="menu.watchers.v-list-tile-title"
                    >{{ $t('menu.manageWatchers') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple to="/users">
                <v-list-tile-action>
                    <v-icon data-test="menu.users.v-icon">person</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                        data-test="menu.users.v-list-tile-title"
                    >{{ $t('menu.manageUsers') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple to="/roles">
                <v-list-tile-action>
                    <v-icon data-test="menu.roles.v-icon">supervised_user_circle</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                        data-test="menu.roles.v-list-tile-title"
                    >{{ $t('menu.manageRoles') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile ripple to="/about">
                <v-list-tile-action>
                    <v-icon data-test="menu.about.v-icon">info</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title
                        data-test="menu.about.v-list-tile-title"
                    >{{ $t('menu.about') }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'main-menu',
    props: {
        source: String,
        drawer: Boolean,
    },
})
export default class Menu extends Vue {
    public isActive(menuItem: string) {
        return this.$route.name === menuItem;
    }
}
</script>

<style scoped>
</style>
