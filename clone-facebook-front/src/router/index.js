import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/friend",
    name: "FriendPage",
    component: () => import("@/views/FriendPage.vue"),
  },
  {
    path: "/bookmark",
    name: "BookmarkPage",
    component: () => import("@/views/BookmarkPage.vue"),
  },
  {
    path: "/information/:id",
    name: "InformationPage",
    component: () => import("@/views/InformationPage.vue"),
  },
  {
    path: "/post",
    name: "PostPage",
    component: () => import("@/views/PostPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
