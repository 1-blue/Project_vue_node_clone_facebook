<template>
  <div id="app" @click="clickNode">
    <!-- 스피너 off -->
    <template v-if="!spinner">
      <!-- 로그인 했을경우 -->
      <template v-if="isLogin">
        <navigation-bar></navigation-bar>
        <router-view></router-view>
      </template>

      <!-- 로그인 안했을경우 -->
      <template v-else>
        <router-view></router-view>
      </template>
    </template>

    <!-- 스피너 on -->
    <template v-else>
      <template v-if="isLogin">
        <navigation-bar></navigation-bar>
      </template>
      <my-spinner class="spinner"></my-spinner>
    </template>
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
    isLogin() {
      return this.$store.getters.isLogin;
    },
    spinner() {
      return this.$store.state.spinner;
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

.spinner {
  position: absolute;
  top: 10%;
  left: 50%;
}

@import "./css/reset.css";
@import "./css/common.css";
</style>
