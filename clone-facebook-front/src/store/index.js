import { createStore } from "vuex";
import { setCookie, getCookie } from "@/utils/cookie.js";

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
      state.name = name;
    },
  },
  actions: {
    SET_USER({ commit }, name) {
      commit("SET_USER", name);
      setCookie(name);
    },
  },
  modules: {},
});
