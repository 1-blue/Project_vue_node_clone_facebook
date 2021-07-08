<template>
  <div class="comments">
    <!-- 댓글내용 -->
    <pre class="comments__contents">
      <strong>{{ username }}</strong>
      {{ contents }}
    </pre>
    <!-- 댓글 옵션 버튼 ( 수정 및 삭제 ) -->
    <i
      class="fas fa-ellipsis-h comment__option__button"
      @click="$emit('toggle:showCommentsOptionForm', !isShowCommentsOptionForm)"
      ref="commentsOptionButton"
      v-show="isShowCommentsOptionButton"
    ></i>
  </div>
</template>

<script>
export default {
  name: "CommentsContents",
  props: {
    username: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    isShowCommentsOptionButton: {
      type: Boolean,
      required: true,
    },
    isShowCommentsOptionForm: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    currentClickNode() {
      return this.$store.state.link.currentClickNode;
    },
  },
  watch: {
    // 옵션창외에 다른 곳을 누르면 옵션창 닫힘
    currentClickNode(clickNode) {
      if (clickNode !== this.$refs.commentsOptionButton) {
        this.$emit("toggle:showCommentsOptionForm", false);
        return;
      }
      this.$emit("toggle:showCommentsOptionForm", true);
      return;
    },
  },
};
</script>

<style scoped>
.comments {
  display: flex;
  align-items: center;
}

.comments__contents {
  display: inline-block;
  margin: 0;
  background: var(--light-gray-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.comment__option__button {
  display: inline-block;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  color: gray;
  margin-left: 1rem;
  padding: 0.5rem;
}
.comment__option__button:hover {
  background: var(--light-gray-color);
  border-radius: 50%;
  cursor: pointer;
}
</style>
