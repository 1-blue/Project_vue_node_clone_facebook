<template>
  <section id="post__comments">
    <comments-input :postId="postId" :profileImage="profileImage"></comments-input>
    <comments-show :comments="comments"></comments-show>
  </section>
</template>

<script>
import CommentsInput from "@/components/comments/CommentsInput.vue";
import CommentsShow from "@/components/comments/CommentsShow.vue";

export default {
  name: "PostComments",
  components: {
    CommentsInput,
    CommentsShow,
  },
  props: {
    postId: {
      type: Number,
      required: true,
    },
    comments: {
      type: Object,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
#post__comments {
}
</style>
