<template>
  <v-layout fluid grid-list-md>
    <v-flex xs12>
      <v-data-iterator
        :items="nodes"
        :rows-per-page-items="rowsPerPageItems"
        :pagination.sync="pagination"
        content-tag="v-layout"
        row
        wrap
      >
        <template v-slot:header>
          <v-toolbar dark flat>
            <v-toolbar-title>{{ $t("cluster.title") }}</v-toolbar-title>
            <v-divider class="mx-2" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item="props">
          <v-flex xs12 sm6 md4 lg3>
            <v-card>
              <v-card-title class="subheading font-weight-bold">{{ props.item.name }}</v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-tile>
                  <v-list-tile-content>{{ $t("cluster.columns.id") }}:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.ID }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>{{ $t("cluster.columns.clientUrls") }}:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.clientURLs.join(',') }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>{{ $t("cluster.columns.peerUrls") }}:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ props.item.peerURLs.join(',') }}</v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-card-actions>
                <v-toolbar dense flat color="grey darken-2">
                  <v-tooltip bottom max-width="200">
                    <template v-slot:activator="{ on }">
                      <v-hover>
                        <v-btn
                          slot-scope="{ hover }"
                          :color="hover ? 'warning' : 'none'"
                          icon
                          @click="healthCheck(props.item.ID)"
                          v-on="on"
                        >
                          <v-icon>favorite</v-icon>
                        </v-btn>
                      </v-hover>
                    </template>
                    <span>{{ $t("cluster.actions.check") }}</span>
                  </v-tooltip>
                  <v-tooltip bottom max-width="200">
                    <template v-slot:activator="{ on }">
                      <v-hover>
                        <v-btn
                          slot-scope="{ hover }"
                          :color="hover ? 'warning' : 'none'"
                          icon
                          @click="status()"
                          v-on="on"
                        >
                          <v-icon>info</v-icon>
                        </v-btn>
                      </v-hover>
                    </template>
                    <span>{{ $t("cluster.actions.status") }}</span>
                  </v-tooltip>
                  <v-spacer></v-spacer>
                  <v-icon dark v-bind:color="getColor(props.item.ID)">{{ getIcon(props.item.ID) }}</v-icon>
                </v-toolbar>
              </v-card-actions>
            </v-card>
          </v-flex>
        </template>
      </v-data-iterator>

      <v-dialog v-model="statusDialog" v-if="currentStats" persistent max-width="290">
        <v-card dark>
          <v-toolbar dark flat>
            <v-toolbar-title>{{ $t("cluster.dialogs.info.title") }}</v-toolbar-title>
          </v-toolbar>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>{{ $t("cluster.dialogs.info.labels.db") }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ currentStats.dbSize }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>{{ $t("cluster.dialogs.info.labels.leader") }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ currentStats.leader }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>{{ $t("cluster.dialogs.info.labels.raftIndex") }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ currentStats.raftIndex }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>{{ $t("cluster.dialogs.info.labels.raftTerm") }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ currentStats.raftTerm }}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>{{ $t("cluster.dialogs.info.labels.version") }}:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{ currentStats.version }}</v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="warning"
              round
              @click="cancelStatusDialog"
            >{{ $t("cluster.dialogs.info.actions.close") }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import StatsService from '../services/stats.service';
import { IMember, IAlarmResponse, IStatusResponse } from 'etcd3';
import Messages from '../lib/messages';

@Component({
    name: 'health-check',
})
export default class HealthCheck extends Vue {
    private etcd: StatsService;
    public nodes: IMember[] = [];
    public health: {
        [key: string]: IAlarmResponse;
    } = {};

    public rowsPerPageItems = [4, 8, 12];
    public pagination = {
        rowsPerPage: 4,
    };
    public currentStats: IStatusResponse | null = null;
    public statusDialog: boolean = false;

    constructor() {
        super();
        this.etcd = new StatsService(this.$store.state.connection.getClient());
    }

    created() {
        this.fetchMembers();
    }

    public getIcon(id: string) {
        if (!this.health[id]) {
            return 'remove';
        }
        return this.health[id].alarms.length ? 'cancel' : 'check_circle';
    }

    public getColor(id: string) {
        if (!this.health[id]) {
            return 'none';
        }
        return this.health[id].alarms.length ? 'error' : 'success';
    }

    async healthCheck(id: string) {
        this.health[id] = await this.etcd.getAlarms(id);
        this.fetchMembers();
    }

    async status() {
        this.currentStats = await this.etcd.getStats();
        this.statusDialog = true;
    }

    public cancelStatusDialog() {
        this.statusDialog = false;
    }

    private async fetchMembers() {
        try {
            const res = await this.etcd.listMembers();
            this.nodes = res.members;
        } catch (e) {
            this.$store.commit('message', Messages.error(e));
        }
    }
}
</script>

<style scoped>
</style>
