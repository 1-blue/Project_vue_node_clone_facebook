export default {
  namespaced: true,
  state: {
    // 스피너 on/off변수
    spinner: false,
  },
  mutations: {
    SPINNER_ON(state) {
      state.spinner = true;
      console.log("spinner_on", state.spinner);
    },
    SPINNER_OFF(state) {
      state.spinner = false;
      console.log("spinner_off", state.spinner);
    },
  },
  actions: {
    SPINNER_ON({ commit }) {
      commit("SPINNER_ON");
    },
    SPINNER_OFF({ commit }) {
      commit("SPINNER_OFF");
    },
  },
};
