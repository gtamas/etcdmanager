<template>
    <v-layout align-space-around justify-space-around column>
        <v-layout align-space-around justify-center row>
            <v-card light raised max-width="500">
                <v-flex pa-1>
                    <v-layout align-center justify-space-around column fill-height>
                        <h3
                            data-test="about.headline.h3"
                            class="headline text-md-center"
                        >ETCD Manager</h3>
                        <div data-test="about.version.div">{{ $t('about.version') }}: {{ version }}</div>
                        <div class="text-md-center">
                            <img
                                data-test="about.logo.img"
                                src="/assets/etcd-stacked-color.png"
                                alt="ETCD"
                            />
                        </div>
                        <h3
                            data-test="about.subheading.h3"
                            class="subheading text-md-center"
                        >{{ $t('about.tagline') }}</h3>
                        <div data-test="about.copyright.div">{{ $t('about.copyright', {year}) }}</div>
                        <v-toolbar raised dense color="grey lighten-1">
                            <v-layout align-center justify-end row fill-height>
                                <v-tooltip bottom max-width="200">
                                    <template v-slot:activator="{ on }">
                                        <v-hover>
                                            <v-btn
                                                data-test="about.bug-report.v-btn"
                                                slot-scope="{ hover }"
                                                :color="hover ? 'primary' : 'none'"
                                                icon
                                                @click="goToIssues()"
                                                v-on="on"
                                            >
                                                <v-icon>bug_report</v-icon>
                                            </v-btn>
                                        </v-hover>
                                    </template>
                                    <span>{{ $t('about.actions.bugs') }}</span>
                                </v-tooltip>
                                <v-tooltip bottom max-width="200">
                                    <template v-slot:activator="{ on }">
                                        <v-hover>
                                            <v-btn
                                                data-test="about.donate.v-btn"
                                                slot-scope="{ hover }"
                                                :color="hover ? 'primary' : 'none'"
                                                icon
                                                disabled
                                                v-on="on"
                                            >
                                                <v-icon>monetization_on</v-icon>
                                            </v-btn>
                                        </v-hover>
                                    </template>
                                    <span>{{ $t('about.actions.donate') }}</span>
                                </v-tooltip>
                                <v-tooltip bottom max-width="200">
                                    <template v-slot:activator="{ on }">
                                        <v-hover>
                                            <v-btn
                                                data-test="about.update.v-btn"
                                                slot-scope="{ hover }"
                                                :color="hover ? 'primary' : 'none'"
                                                icon
                                                disabled
                                                v-on="on"
                                            >
                                                <v-icon>update</v-icon>
                                            </v-btn>
                                        </v-hover>
                                    </template>
                                    <span>{{ $t('about.actions.updates') }}</span>
                                </v-tooltip>
                                <v-tooltip bottom max-width="200">
                                    <template v-slot:activator="{ on }">
                                        <v-hover>
                                            <v-btn
                                                data-test="about.home.v-btn"
                                                slot-scope="{ hover }"
                                                :color="hover ? 'primary' : 'none'"
                                                icon
                                                @click="goHome()"
                                                v-on="on"
                                            >
                                                <v-icon>home</v-icon>
                                            </v-btn>
                                        </v-hover>
                                    </template>
                                    <span>{{ $t('about.actions.github') }}</span>
                                </v-tooltip>
                                <v-tooltip bottom max-width="200">
                                    <template v-slot:activator="{ on }">
                                        <v-hover>
                                            <v-btn
                                                data-test="about.contributors.v-btn"
                                                slot-scope="{ hover }"
                                                :color="hover ? 'primary' : 'none'"
                                                icon
                                                @click="toggleContributors"
                                                v-on="on"
                                            >
                                                <v-icon>person</v-icon>
                                            </v-btn>
                                        </v-hover>
                                    </template>
                                    <span>{{ $t('about.actions.credits') }}</span>
                                </v-tooltip>
                            </v-layout>
                        </v-toolbar>
                    </v-layout>
                </v-flex>
            </v-card>
            <v-expand-x-transition>
                <v-card max-width="500" v-show="contributors" raised>
                    <v-layout align-center justify-space-around column fill-height>
                        <h2 data-test="about.subheading.h2" class="subheading">Contributors</h2>
                        <v-list dense>
                            <v-list-tile
                                v-for="(contributor, index) of getContributors()"
                                :key="index"
                            >
                                <v-list-tile-content data-test="about.contributor.v-list-tile-content" class="align-end">{{ contributor.name }}</v-list-tile-content>
                                <v-list-tile-action>
                                    <a
                                        :href="`mailto:${contributor.email}`"
                                        v-if="contributor.email"
                                    >
                                        <v-btn color="primary" fab small dark>
                                            <v-icon>email</v-icon>
                                        </v-btn>
                                    </a>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </v-layout>
                </v-card>
            </v-expand-x-transition>
        </v-layout>
    </v-layout>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { shell } from 'electron';
import { GenericObject } from '../../types';

@Component({
    name: 'about',
})
export default class About extends Vue {
    public version: string;
    public year: number;
    public contributors: boolean = false;

    constructor() {
        super();
        this.version = this.$store.state.version;
        this.year = new Date().getFullYear();
    }

    public toggleContributors() {
        this.contributors = !this.contributors;
    }

    public goHome() {
        shell.openExternal(this.$store.state.package.homepage);
    }

    public goToIssues() {
        shell.openExternal(this.$store.state.package.bugs.url);
    }

    public getContributors() {
        const contributors = this.$store.state.package.collaborators.map(
            (c: string) => {
                const data = c.match(/([^<]+) <([^>]+)>/i) || [];
                const obj: GenericObject = {
                    name: data[1] || c,
                };
                if (data[2]) {
                    obj.email = data[2];
                }
                return obj;
            }
        );
        return contributors;
    }
}
</script>

<style scoped>
</style>
