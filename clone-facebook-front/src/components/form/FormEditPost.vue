<template>
  <form class="form__edit__post shadow" @submit.prevent>
    <h1 class="title">게시글 수정</h1>
    <button type="button" class="exit__button" @click="$emit('close:postEditForm')">
      <i class="far fa-times-circle"></i>
    </button>

    <input type="text" class="input__title" placeholder="제목을 입력해주세요" v-model.trim="title" />
    <textarea class="input__contents" :placeholder="defaultText" v-model.trim="contents" />
    <button type="submit" class="btn" :class="{ btn__active: isSubmit }" @click="updatePost">
      <span class="btn__text">수 정</span>
    </button>
  </form>
</template>

<script>
import { editPost } from "@/api/index.js";

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
    async updatePost() {
      if (!this.isSubmit) {
        alert("제목과 내용을 모두 입력하고 제출버튼을 눌러주세요");
        return;
      }
      try {
        // 수정
        await editPost({
          _id: this.post._id,
          title: this.title,
          contents: this.contents,
        });

        // 포스트정보 다시 패치
        this.$filter.emitter.emit("fetch:postList");

        // 업데이트폼 닫기
        this.$emit("close:postEditForm");
        alert("수정이 완료되었습니다.");
      } catch (error) {
        if (error.response) {
          switch (error.response.status) {
            case 500:
              alert(error.response.message);
              break;
          }
        } else {
          alert("FormEditPost.vue >> ", error);
        }
      }
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
