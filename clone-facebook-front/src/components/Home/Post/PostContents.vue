<template>
  <section id="post__contents">
    <pre>{{ contents }}</pre>
  </section>
</template>

<script>
export default {
  name: "PostContents",
  props: {
    contents: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
#post__contents {
  padding: 0 1rem;
}
</style>
