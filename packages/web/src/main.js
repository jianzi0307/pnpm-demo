import Vue from "vue";
import App from "./App.vue";

import router from "@/router";
import request from "@/utils/http";

import TimerManager from "@alanojs/timer";
import Storage, { StorageAdapterType } from "@alanojs/storage";

Vue.use(TimerManager);
Vue.use(Storage, { adapter: StorageAdapterType.Cookie });

Vue.prototype.$http = request;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
