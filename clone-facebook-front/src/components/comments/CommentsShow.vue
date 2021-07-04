<template>
  <li class="comments__list">
    <!-- 댓글쓴 유저의 프로필 이미지 -->
    <profile-image :profileImage="profileImage"></profile-image>

    <!-- 댓글 -->
    <div class="comments">
      <!-- 댓글내용 -->
      <pre class="comments__contents">
        <strong>{{ username }}</strong>
        {{ contents }}
      </pre>
      <!-- 댓글밑에 추가정보 및 기능 -->
      <comments-footer :createdAt="createdAt"></comments-footer>
    </div>
  </li>
</template>

<script>
import ProfileImage from "@/components/common/ProfileImage.vue";
import CommentsFooter from "@/components/comments/CommentsFooter.vue";

export default {
  name: "CommentsShow",
  components: {
    ProfileImage,
    CommentsFooter,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    profileImage() {
      return this.comment.User.Images[0].name;
    },
    username() {
      return this.comment.User.name;
    },
    contents() {
      return this.comment.contents;
    },
    createdAt() {
      return this.comment.createdAt;
    },
  },
};
</script>

<style scoped>
.comments__list {
  display: flex;
  margin-bottom: 1rem;
}

.comments__contents {
  display: inline-block;
  margin: 0;
  background: var(--light-gray-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
}
</style>
