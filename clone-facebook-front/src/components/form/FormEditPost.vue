<template>
  <form class="form__edit__post shadow" @submit.prevent>
    <!-- 폼의 이름 -->
    <h1 class="title">게시글 수정</h1>

    <!-- 폼 닫기 버튼 -->
    <button type="button" class="exit__button" @click="$emit('close:EditForm')">
      <i class="far fa-times-circle"></i>
    </button>

    <!-- 제목입력 -->
    <input type="text" class="input__title" placeholder="제목을 입력해주세요" v-model.trim="title" />

    <!-- 내용입력 -->
    <textarea class="input__contents" :placeholder="defaultText" v-model.trim="contents" />

    <!-- 제출버튼 -->
    <button type="submit" class="btn" :class="{ btn__active: isSubmit }" @click="onEditPost">
      <span class="btn__text">수 정</span>
    </button>
  </form>
</template>

<script>
export default {
  name: "FormEditPost",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      contents: "",
    };
  },
  computed: {
    username() {
      return this.$store.state.name;
    },
    defaultText() {
      return `${this.username}님, 무슨 생각을 하고 계신가요?`;
    },
    isSubmit() {
      if (this.title.length === 0) return false;
      if (this.contents.length === 0) return false;

      return true;
    },
  },
  mounted() {
    this.title = this.post.title;
    this.contents = this.post.contents;
  },
  methods: {
    onEditPost() {
      if (!this.isSubmit) {
        alert("제목과 내용을 모두 입력하고 제출버튼을 눌러주세요");
        return;
      }
      this.$emit("edit:post", this.title, this.contents);
    },
  },
};
</script>

<style scoped>
.form__edit__post {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: 55vh;
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  background: white;
  z-index: 9999;
}

.title {
  margin: 1rem 0 2rem 0;
}

.exit__button {
  position: absolute;
  top: 4%;
  right: 4%;
  font-size: 3rem;
  background: transparent;
  border: none;
  cursor: pointer;
}

.input__title {
  width: 80%;
}
.input__contents {
  width: 80%;
  overflow: auto;
}

@import "../../css/formPost.css";
</style>
