<template>
  <ul id="comments__show">
    <li v-for="comment in comments" :key="comment._id" class="comments__list">
      <profile-image :profileImage="comment.User.Images[0].name"></profile-image>
      <pre class="comments">
        <strong>{{ comment.User.name }}</strong>
        {{ comment.contents }} 
      </pre>
    </li>
  </ul>
</template>

<script>
import ProfileImage from "@/components/common/ProfileImage.vue";

export default {
  name: "CommentsShow",
  components: {
    ProfileImage,
  },
  props: {
    comments: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
#comments__show {
  display: flex;
  flex-direction: column;
}

.comments__list {
  display: flex;
  margin-bottom: 1rem;
}

.comments {
  margin: 0;
  background: var(--light-gray-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>
