import Vue from "vue";

import { default as router } from "./router";
import request from '@/utils/http';

import App from "./App.vue";

import { timerManager } from "@alanojs/tools";

import Storage, { StorageAdapterType } from '@alanojs/storage';
Vue.use(Storage, { adapter: StorageAdapterType.Cookie })

Vue.prototype.$http = request;

// import { StorageService, StorageAdapterType } from '@alanojs/storage';

Vue.use(timerManager);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
