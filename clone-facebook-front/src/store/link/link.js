export default {
  namespaced: true,
  state: {
    // 현재 클릭한 링크를 저장할 변수 ( 링크 데코레이션에 사용 )
    currentLink: "",

    // 클릭을 제외한 방법으로 링크 이동시 홈링크에 데코레이션 줄 때 사용
    homeLink: "",

    // 옵션버튼외 다른곳 클릭시 옵션창 닫히게 하기위해 사용할 변수
    currentClickNode: "",
  },
  getters: {
    isLogin(state) {
      return state.name ? true : false;
    },
  },
  mutations: {
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
};
