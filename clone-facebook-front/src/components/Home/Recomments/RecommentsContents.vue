<template>
  <div class="recomments">
    <!-- 대댓글내용 -->
    <pre class="recomments__contents">
      <strong>{{ username }}</strong>
      {{ contents }}
    </pre>
    <!-- 대댓글 옵션 버튼 ( 수정 및 삭제 ) -->
    <i
      class="fas fa-ellipsis-h recomment__option__button"
      ref="recommentsOptionButton"
      v-show="isShowRecommentsOptionButton"
      @click="$emit('show:recommentsOptionForm')"
    ></i>
  </div>
</template>

<script>
export default {
  name: "RecommentsContents",
  props: {
    username: {
      type: String,
      required: true,
    },
    contents: {
      type: String,
      required: true,
    },
    isShowRecommentsOptionButton: {
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
      if (clickNode !== this.$refs.recommentsOptionButton) {
        this.$emit("close:recommentsOptionForm");
        return;
      }
    },
  },
};
</script>

<style scoped>
.recomments {
  display: flex;
  align-items: center;
}

.recomments__contents {
  display: inline-block;
  margin: 0;
  background: var(--light-gray-color);
  padding: 0.5rem;
  border-radius: 0.5rem;
}

.recomment__option__button {
  display: inline-block;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  color: gray;
  margin-left: 1rem;
  padding: 0.5rem;
}
.recomment__option__button:hover {
  background: var(--light-gray-color);
  border-radius: 50%;
  cursor: pointer;
}
</style>
