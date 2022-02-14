import Vue from "vue";

import { default as router } from "./router";

import App from "./App.vue";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
