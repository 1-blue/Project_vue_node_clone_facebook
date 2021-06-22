import { createStore } from "vuex";
import { setCookie, getCookie, clearCookie } from "@/utils/cookie.js";

export default createStore({
  state: {
    name: getCookie() || "",
  },
  getters: {
    isLogin(state) {
      return state.name ? true : false;
    },
  },
  mutations: {
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
    SET_USER({ commit }, name) {
      commit("SET_USER", name);
    },
    LOGOUT({ commit }) {
      commit("LOGOUT");
    },
  },
  modules: {},
});
