import { setCookie, getCookie, clearCookie } from "@/utils/cookie.js";

export default {
  namespaced: true,
  state: {
    // 로그인 체크를 위한 변수
    name: getCookie() || "",
  },
  getters: {
    isLogin(state) {
      return state.name ? true : false;
    },
  },
  mutations: {
    // 로그인 로그아웃 유지관련
    SET_USER(state, name) {
      setCookie(name);
      state.name = name;
    },
    LOGOUT(state) {
      clearCookie(state.name);
      state.name = "";
    },
  },
  actions: {
    // 로그인 로그아웃관련
    SET_USER({ commit }, name) {
      commit("SET_USER", name);
    },
    LOGOUT({ commit }) {
      commit("LOGOUT");
    },
  },
};
