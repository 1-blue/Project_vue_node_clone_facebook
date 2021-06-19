import axios from "axios";
import store from "@/store/index.js";

// axios인스턴스생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

// request인터셉터 설정 ( 토큰값 넘겨주기위함 )
instance.interceptors.request.use(
  config => {
    // 토큰값넣기
    config.headers.Authorization = store.state.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export {};
