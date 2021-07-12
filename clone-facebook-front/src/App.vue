<template>
  <div id="app" @click="clickNode">
    <!-- 로그인 했을경우 -->
    <template v-if="isLogin">
      <navigation-bar></navigation-bar>
      <router-view></router-view>
    </template>

    <!-- 로그인 안했을경우 -->
    <template v-else>
      <router-view></router-view>
    </template>

    <!-- 데이터 패치할 때 보여줄 스피너 - 현재 사용하지않음 -->
    <my-spinner class="spinner" v-if="spinner"></my-spinner>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";
import MySpinner from "@/components/common/MySpinner.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    MySpinner,
  },
  computed: {
    // 유저 로그인 여부 판단... 현재 클라이언트측에서는 쿠키존재여부로 판단하고 서버측에서는 passport를 이용해서 세션쿠키로 판단함
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    // 스피너 on/off
    spinner() {
      return this.$store.state.spinner.spinner;
    },
  },
  methods: {
    // 클릭했을 때 보여주는 옵션창들을 다른 곳 클릭했을 때 자동으로 닫히게 하기위해서 현재 클릭한 노드를 기록함
    clickNode(e) {
      this.$store.state.link.currentClickNode = e.target;
    },
  },
};
</script>

<style>
#app {
  background: #f0f2f5;
  min-height: 100vh;
}

.spinner {
  position: absolute;
  top: 10%;
  left: 50%;
}

@import "./css/reset.css";
@import "./css/common.css";
</style>
