<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from './menu.vue';
import { omit } from 'lodash-es';
import { ipcRenderer } from 'electron';
import WatcherService from '../services/watcher.service';
import { GenericObject } from '../../types';

@Component({
    name: 'App',
    components: {
        'main-menu': Menu,
    },
})
export default class App extends Vue {
    public drawer: boolean = true;
    public year = new Date().getFullYear();
    public version: string;

    constructor() {
        super();
        this.version = this.$store.state.version;
    }

    created() {
        // @ts-ignore
        ipcRenderer.on('navigate', (event: any, message: any) => {
            this.$router.push(message);
        });
    }

    get message() {
        return this.$store.state.message;
    }

    get loading() {
        return this.$store.state.loading;
    }

    get console() {
        return this.$store.state.console;
    }

    get animate() {
        return this.$store.state.config.animateBg;
    }

    get background() {
        return this.$store.state.config.background;
    }

    public hide() {
        this.$store.commit('message', { show: false });
    }

    public beforeCreate() {
        this.$store.commit('version');
    }

    private async loadOrDisabledWatchers(config: GenericObject) {
        const watcherService = new WatcherService(
            // @ts-ignore
            this.$ls,
            this.$store.state.connection.getClient()
        );
        const watchers = watcherService.listWatchers();
        for (const watcherEntry of watchers) {
            if (config.watchers.autoload) {
                await watcherService.activateWatcher(watcherEntry);
            } else {
                watcherEntry.activated = false;
            }
        }
        // @ts-ignore
        this.$ls.set('watchers', JSON.stringify(watchers));
    }

    public mounted() {
        // @ts-ignore
        const config = this.$ls.get('config');

        if (config) {
            const cfg = JSON.parse(config);
            this.$store.commit('config', cfg.config);
            this.$store.commit('users', cfg.users);
            this.$store.commit('etcdConfig', cfg.etcd);
            this.$store.commit('watcherConfig', cfg.watchers);
            this.$store.dispatch('locale', cfg.config.language);
            if (cfg.etcdAuth) {
                this.$store.commit('etcdAuthConfig', cfg.etcdAuth);
            }
            if (cfg.etcd.hosts) {
                const auth = cfg.etcdAuth ? { auth: cfg.etcdAuth } : {};
                this.$store.commit('etcdConnect', {
                    ...omit(cfg.etcd, 'port'),
                    ...auth,
                    ...{ hosts: `${cfg.etcd.hosts}:${cfg.etcd.port}` },
                });
            }
            this.loadOrDisabledWatchers(cfg);
        }
    }
}
</script>


<template>
  <v-app id="inspire" dark>
    <v-snackbar
      v-model="message.show"
      :right="true"
      :top="true"
      :color="message.color"
      :multi-line="true"
      :timeout="message.timeout"
    >
      {{ message.text }}
      <v-btn dark flat @click="hide()">Close</v-btn>
    </v-snackbar>

    <v-dialog v-model="loading" persistent max-width="290">
      <v-card dark>
        <v-toolbar dark flat>
          <v-toolbar-title>Loading..</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>


    <main-menu v-bind:drawer="drawer"></main-menu>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>ETCD Manager v{{ version }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <img src="/assets/etcd-glyph-color.png" alt="ETCD" class="logo" />
    </v-toolbar>
    <v-content>
      <v-container v-bind:class="{ 'bg-pan-left': animate, bg: background }" fluid fill-height>
        <v-layout align-start justify-center row fill-height>
          <v-flex xs12 v-bind:class="{ fg: background }">
            <transition name="fade" appear>
              <router-view />
            </transition>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <v-layout align-center justify-end row fill-height>
        <span>&copy; {{ year }}</span>
        <v-spacer></v-spacer>
        <v-bottom-sheet inset>
          <template v-slot:activator>
            <v-btn icon dark>
              <v-icon>desktop_mac</v-icon>
            </v-btn>
          </template>
          <v-card raised dark>
            <v-textarea
              dark
              name="console"
              label="Console"
              clearable
              solo
              color="rgba(0,255,0,0.5)"
              readonly
              no-resize
              single-line
              rows="20"
              :value="console"
            ></v-textarea>
          </v-card>
        </v-bottom-sheet>
      </v-layout>
    </v-footer>
  </v-app>
</template>


<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.fade-enter-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.logo {
    width: 40px;
    height: 40px;
}

.bg {
    background: radial-gradient(circle, transparent 40%, var(--color-v) 75%),
        linear-gradient(to right, var(--color), var(--color)), var(--image2);
    background-position: center center;
    background-size: cover;
    background-blend-mode: var(--blend-top, normal),
        var(--blend-bottom, saturation), normal;

    --image2: url('/assets/logo2.svg');

    --color-v: black;
    --color: grey;

    flex: 1;
    width: 100vw;
    opacity: 1;
}

.bg-pan-left {
    -webkit-animation: bg-pan-left 20s linear infinite alternate both;
    animation: bg-pan-left 20s linear infinite alternate both;
}

@-webkit-keyframes bg-pan-left {
    0% {
        background-position: 50% 0%;
    }
    100% {
        background-position: 50% 100%;
    }
}
@keyframes bg-pan-left {
    0% {
        background-position: 50% 0%;
    }
    100% {
        background-position: 50% 100%;
    }
}

.fg {
    opacity: 0.8;
}

.theme--dark.v-input:not(.v-input--is-disabled) textarea {
    color: rgba(0, 255, 0, 0.5) !important;
}
</style>