import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import DrinkCart from "../views/DrinkCart.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: DrinkCart,
  },
  {
    path: "/data",
    name: "data",
    component: () => import("../views/DataManager.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
