import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "main-page",
    component: () => import("../pages/MainPage.vue"),
  },
  {
    path: "/saved-quotes",
    name: "saved-quotes",
    component: () => import("../pages/SavedQuotes.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
