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
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    clickNode(e) {
      this.$store.state.currentClickNode = e.target;
    },
  },
};
</script>

<style>
#app {
  background: #f0f2f5;
  min-height: 100vh;
}

@import "./css/reset.css";
@import "./css/common.css";
</style>
