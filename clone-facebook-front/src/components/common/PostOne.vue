<template>
  <li class="post shadow">
    <post-title :username="username" :updatedAt="updatedAt"></post-title>
    <post-contents :contents="contents"></post-contents>
  </li>
</template>

<script>
import PostTitle from "@/components/post/PostTitle.vue";
import PostContents from "@/components/post/PostContents.vue";

export default {
  name: "PostOne",
  components: {
    PostTitle,
    PostContents,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    username() {
      return this.post.User.name;
    },
    updatedAt() {
      return this.post.updatedAt;
    },
    contents() {
      return this.post.contents;
    },
  },
};
</script>

<style scoped>
.post {
  min-width: 40vw;
  background: white;
  border-radius: 0.2rem;
  margin: 0.5rem 0;
}
</style>
