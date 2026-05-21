import { createRouter, createWebHashHistory } from "vue-router";
import { ref } from "vue";
import { posthog } from "@/composables/usePosthog";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../components/DashboardHome.vue"),
    meta: {
      title: "CMIP7 Dashboard",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const isNavigating = ref(false);

router.beforeEach((to, _from, next) => {
  isNavigating.value = true;
  if (to.meta?.title) {
    document.title = to.meta.title as string;
  }
  next();
});

router.afterEach((to) => {
  posthog.capture("$pageview", { path: to.fullPath, name: to.name });
  setTimeout(() => {
    isNavigating.value = false;
  }, 100);
});

export default router;
