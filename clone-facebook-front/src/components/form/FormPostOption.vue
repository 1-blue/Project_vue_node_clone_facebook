<template>
  <form class="form__post__option shadow" @submit.prevent>
    <ul class="container__option__form">
      <!-- 게시글 수정 -->
      <li v-if="isWriter">
        <button type="button">
          <i class="fas fa-edit"></i>
          <span class="button__text">수정</span>
        </button>
      </li>

      <!-- 게시글 삭제 -->
      <li v-if="isWriter">
        <button type="button">
          <i class="fas fa-trash-alt"></i>
          <span class="button__text">삭제</span>
        </button>
      </li>

      <!-- 게시글 주인 아닐때 -->
      <li v-if="!isWriter">
        <span>게시글주인아닐때 나중에 추가할 생각</span>
      </li>
    </ul>
  </form>
</template>

<script>
export default {
  name: "FormPostOption",
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  computed: {
    // 옵션버튼누른사람이 작성자인지 아닌지 판단
    isWriter() {
      return this.username === this.$store.state.name;
    },
  },
};
</script>

<style scoped>
.form__post__option {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 0.8rem;
  border-radius: 0.5rem;
  width: 20vw;
}

.form__post__option button {
  padding: 0.8rem 0.5rem;
  border: none;
  background: transparent;
  width: 100%;
  border-radius: 0.4rem;
  transition: all 0.5s;
  cursor: pointer;
  text-align: start;
}

.form__post__option button:hover {
  background: var(--gray-color);
}

.button__text {
  vertical-align: baseline;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}
</style>
