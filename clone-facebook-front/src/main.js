import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { validateEmail } from "@/utils/validate.js";

const app = createApp(App);

// 이메일 유효인증
app.config.globalProperties.$filter = {
  validateEmail,
};

app.use(store).use(router).mount("#app");
