import { default as Vue } from "vue";

import { default as VueRouter } from "vue-router";

Vue.use(VueRouter);

const { VITE_BASE_URL } = import.meta.env;

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("@/views/Index.vue"), 
  },
];

const router = new VueRouter({
  mode: "hash",
  base: VITE_BASE_URL,
  routes: routes,
});

export default router;
