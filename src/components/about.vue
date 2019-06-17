<template>
  <v-layout align-space-around justify-space-around column>
    <v-layout align-space-around justify-center row>
      <v-card light raised max-width="500">
        <v-flex pa-1>
          <v-layout align-center justify-space-around column fill-height>
            <h3 class="headline text-md-center">ETCD Manager</h3>
            <div>{{ $t('about.version') }}: {{ version }}</div>
            <div class="text-md-center">
              <img src="../assets/etcd-stacked-color.png" alt="ETCD">
            </div>
            <h3 class="subheading text-md-center">{{ $t('about.tagline') }}</h3>
            <div>{{ $t('about.copyright', {year}) }}</div>
            <v-toolbar raised dense color="grey lighten-1">
              <v-layout align-center justify-end row fill-height>
                <v-tooltip bottom max-width="200">
                  <template v-slot:activator="{ on }">
                    <v-hover>
                      <v-btn
                        slot-scope="{ hover }"
                        :color="hover ? 'primary' : 'none'"
                        icon
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
                        slot-scope="{ hover }"
                        :color="hover ? 'primary' : 'none'"
                        icon
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
                        slot-scope="{ hover }"
                        :color="hover ? 'primary' : 'none'"
                        icon
                        @click="status()"
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
          <h2 class="subheading">Contributors</h2>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content class="align-end">Geschitz Tamas</v-list-tile-content>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content class="align-end">Valami guy</v-list-tile-content>
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
import { readFileSync } from 'fs';

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
}
</script>

<style scoped>

</style>
