<template>
  <form class="post__form" @submit.prevent>
    <input type="text" class="post__title" placeholder="제목을 입력해주세요" v-model.trim="title" />
    <textarea class="post__contents" @keydown="resize" :placeholder="defaultText" v-model.trim="contents" />
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
      alert("게시글생성이 완료되었습니다. 메인페이지로 이동합니다.");
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
.post__title {
  width: 50%;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border: 3px solid black;
  padding: 0.5rem;
}
.post__contents {
  width: 50%;
  resize: none;
  overflow: hidden;
  min-height: 8rem;
  border: 3px solid black;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
}
.post__title:focus,
.post__contents:focus {
  border: 3px solid blue;
}

.btn {
  min-width: 100px;
  width: 10%;
  height: 8vh;
}
.btn__text {
  font-size: 1.5rem;
}

@media screen and (max-width: 768px) {
  .post__title {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    border: 2px solid black;
    padding: 0.25rem;
  }
  .post__contents {
    border: 2px solid black;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-size: 0.5rem;
    font-weight: 500;
  }
  .post__title:focus,
  .post__contents:focus {
    border: 2px solid blue;
  }

  .btn {
    height: 6vh;
  }
  .btn__text {
    font-size: 1.2rem;
  }
}
</style>
