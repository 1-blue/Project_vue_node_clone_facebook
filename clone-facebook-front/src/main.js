import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { validateEmail } from "@/utils/validate.js";
import { dateFormat, timeFormat } from "@/utils/filter.js";
import mitt from "mitt";

const app = createApp(App);

// 전역변수
app.config.globalProperties.$filter = {
  validateEmail,
  dateFormat,
  timeFormat,
  emitter: mitt(),
};

app.use(store).use(router).mount("#app");
