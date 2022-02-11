import Vue from "vue";

import { default as router } from "./router";

import App from "./App.vue";

import { timerManager } from "@jz/tools";

Vue.use(timerManager);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
