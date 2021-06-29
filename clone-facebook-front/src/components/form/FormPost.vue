<template>
  <form class="post__form" @submit.prevent>
    <input type="text" class="input__title" placeholder="제목을 입력해주세요" v-model.trim="title" />
    <textarea class="input__contents" @keydown="resize" :placeholder="defaultText" v-model.trim="contents" />
    <button type="submit" class="btn" :class="{ btn__active: isSubmit }" @click="submitPost">
      <span class="btn__text">게 시</span>
    </button>
  </form>
</template>

<script>
export default {
  name: "FormPost",
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
    // 제출가능여부
    isSubmit() {
      if (this.title.length === 0) return false;
      if (this.contents.length === 0) return false;

      return true;
    },
  },
  methods: {
    resize(e) {
      e.target.style.height = "1px";
      e.target.style.height = 12 + e.target.scrollHeight + "px";
    },
    submitPost() {
      if (!this.isSubmit) {
        alert("제목과 내용을 모두 입력하고 제출버튼을 눌러주세요");
        return;
      }

      this.$emit("submit:post", this.title, this.contents);
      this.$store.dispatch("CHANGE_HOME_LINK");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.post__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
@import "../../css/formPost.css";
</style>
