import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import Home from "/src/views/Home.vue";
import Settings from "./views/Settings.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
