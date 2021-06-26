import { createStore } from "vuex";
import { setCookie, getCookie, clearCookie } from "@/utils/cookie.js";

export default createStore({
  state: {
    name: getCookie() || "",
    currentLink: "",
    homeLink: "",
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

    // ** 링크의 데코레이션 관련 **
    // homeLink로 이동
    CHANGE_HOME_LINK(state) {
      // 현재 링크 데코레이션 삭제
      state.currentLink.classList.remove("router__link__active__underline");
      state.currentLink.classList.remove("router__link__active");

      // 이전링크 홈링크로 변경
      state.currentLink = state.homeLink;

      // 홈링크에 데코레이션 넣기
      state.currentLink.classList.add("router__link__active__underline");
    },
    // 클릭한 링크 데코레이션 삭제
    LINK_REMOVE(state) {
      if (!state.currentLink) return;

      state.currentLink.classList.remove("router__link__active__underline");
      state.currentLink.classList.remove("router__link__active");
    },
    // 현재 클릭한 링크 기록
    LINK_RECODE(state, target) {
      state.currentLink = target;
    },
    // 현재 클릭한 링크에 데코레이션 넣기
    LINK_APPEND(state, target) {
      target.classList.add("router__link__active__underline");
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

    // ** 링크의 데코레이션 관련 **
    // homeLink로 이동
    CHANGE_HOME_LINK({ commit }) {
      commit("CHANGE_HOME_LINK");
    },
    // 클릭한 링크 데코레이션 삭제
    LINK_REMOVE({ commit }) {
      commit("LINK_REMOVE");
    },
    // 현재 클릭한 링크 기록
    LINK_RECODE({ commit }, target) {
      commit("LINK_RECODE", target);
    },
    // 현재 클릭한 링크에 데코레이션 넣기
    LINK_APPEND({ commit }, target) {
      commit("LINK_APPEND", target);
    },
  },
  modules: {},
});
