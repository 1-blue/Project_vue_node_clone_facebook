import { createStore } from "vuex";
import auth from "./auth/auth.js";
import spinner from "./spinner/spinner.js";
import link from "./link/link.js";

export default createStore({
  modules: {
    auth,
    spinner,
    link,
  },
});
