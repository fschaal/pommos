import {
  createMemoryHistory,
  createRouter,
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
  history: createMemoryHistory(),
  routes,
});

export default router;
