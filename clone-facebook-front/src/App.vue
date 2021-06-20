<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
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
