import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/friend",
    name: "FriendPage",
    component: () => import("@/views/FriendPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/bookmark",
    name: "BookmarkPage",
    component: () => import("@/views/BookmarkPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/information/:id",
    name: "InformationPage",
    component: () => import("@/views/InformationPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post",
    name: "PostPage",
    component: () => import("@/views/PostPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("@/views/LoginPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // 로그인해야 접근가능한페이지이면
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 로그인 안했을경우
    if (!store.getters["auth/isLogin"]) {
      return next({ path: "/login" });
    }
    next();
  } else {
    next();
  }
});

export default router;
