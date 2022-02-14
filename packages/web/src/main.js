import Vue from "vue";

import { default as router } from "./router";

import App from "./App.vue";

import { timerManager } from "@alanojs/tools";

import Storage, { StorageAdapterType } from '@alanojs/storage';
Vue.use(Storage, { adapter: StorageAdapterType.Cookie })

// import { StorageService, StorageAdapterType } from '@alanojs/storage';

Vue.use(timerManager);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
