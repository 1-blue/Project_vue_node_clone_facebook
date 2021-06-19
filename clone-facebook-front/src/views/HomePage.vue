<template>
  <section id="home__page">
    <hello-world></hello-world>
  </section>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomePage",
  components: {
    HelloWorld,
  },
};
</script>

<style scoped>
#home__page {
}
</style>
