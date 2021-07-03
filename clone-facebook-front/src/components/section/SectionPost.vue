<template>
  <section id="section__post">
    <ul class="post__container">
      <post-one v-for="post in postList" :key="post._id" :post="post" @fetch:postList="$emit('fetch:postList')"></post-one>
    </ul>
  </section>
</template>

<script>
import PostOne from "@/components/common/PostOne.vue";

export default {
  name: "SectionPost",
  components: {
    PostOne,
  },
  props: {
    postList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
#section__post {
}

.post__container {
  display: flex;
  flex-direction: column;
}
</style>
