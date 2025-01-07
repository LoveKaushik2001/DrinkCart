import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import DrinkCart from "../views/DrinkCart.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: DrinkCart,
  },
  {
    path: "/packageByRoute",
    name: "packageByRoute",
    component: () => import("../views/PackagePage.vue"),
  },
  {
    path: "/packageByItem",
    name: "packageByItem",
    component: () => import("../views/PackagePageItem.vue"),
  },
  {
    path: "/data",
    name: "data",
    component: () => import("../views/DataManager.vue"),
  },
  {
    path: "/sales",
    name: "sales",
    component: () => import("../views/SaleView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
